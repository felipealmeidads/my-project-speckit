import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { siteConfig } from './src/config'
import { prepareLinks } from './src/lib/prepareLinks'

function bioLinksHtmlPlugin(): Plugin {
  return {
    name: 'bio-links-html',
    transformIndexHtml(html) {
      const { profile, meta } = siteConfig
      const lang = meta.lang ?? 'pt-BR'
      const allLinks = [
        ...prepareLinks(siteConfig.links),
        ...prepareLinks(siteConfig.socialLinks ?? []),
      ]
      const sameAs = allLinks.map((l) => l.url)

      const avatarAbsolute = profile.avatarUrl.startsWith('http')
        ? profile.avatarUrl
        : profile.avatarUrl

      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        mainEntity: {
          '@type': 'Person',
          name: profile.name,
          description: profile.bio,
          image: avatarAbsolute,
          sameAs,
        },
      }

      const tags: string[] = [
        `<html lang="${lang}">`,
        `<title>${escapeHtml(meta.title)}</title>`,
        `<meta name="description" content="${escapeAttr(meta.description)}" />`,
        `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
        `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
        `<meta property="og:type" content="profile" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
      ]

      if (meta.canonicalUrl) {
        tags.push(
          `<link rel="canonical" href="${escapeAttr(meta.canonicalUrl)}" />`,
        )
      }
      if (meta.ogImage) {
        tags.push(
          `<meta property="og:image" content="${escapeAttr(meta.ogImage)}" />`,
        )
      }

      const jsonLdScript = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`

      let result = html.replace(/<html[^>]*>/, tags[0])
      result = result.replace(/<title>[^<]*<\/title>/, tags[1])

      const headInject = [
        tags.slice(2).join('\n    '),
        jsonLdScript,
      ].join('\n    ')

      result = result.replace('</head>', `    ${headInject}\n  </head>`)

      return result
    },
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replace(/"/g, '&quot;')
}

export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss(), bioLinksHtmlPlugin()],
})
