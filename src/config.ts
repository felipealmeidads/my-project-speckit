import type { SiteConfig } from './types'
import avatarUrl from './assets/avatar.jpg'

export const siteConfig: SiteConfig = {
  /** Identidade no topo: foto, nome, @handle e bio. */
  profile: {
    /** Nome principal exibido abaixo do avatar. */
    name: 'Felipe Almeida',
    /** Identificador curto, ex.: @usuario. */
    handle: '@fe.lipeeeeee',
    /** Texto de apresentação (quebras de linha permitidas). */
    bio: '🥷qʋɑlitʮ ɑssʋɾeƞce🥷. Todos os meus links em um só lugar.',
    /** URL da foto (import de src/assets ou arquivo em public/). */
    avatarUrl,
  },
  /** Botões principais; ordem do array = ordem na página. */
  links: [
    {
      id: 'linkedin',
      title: 'Linkedin',
      url: 'https://www.linkedin.com/in/felipe-almeida-da-silva-983719142/',
      icon: 'Linkedin',
      highlighted: true,
    },
    {
      id: 'github',
      title: 'GitHub',
      url: 'https://github.com/felipealmeidads',
      icon: 'Github',
    },
  ],
  /** Ícones sociais opcionais (fileira abaixo dos botões). Omita ou use [] para ocultar. */
  socialLinks: [
    {
      id: 'github-social',
      title: 'GitHub',
      url: 'https://github.com/felipealmeidads',
      icon: 'Github',
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      url: 'https://www.linkedin.com/in/felipe-almeida-da-silva-983719142/',
      icon: 'Linkedin',
    },
    {
      id: 'instagram',
      title: 'Instagram',
      url: 'https://instagram.com/fe.lipeeeeee',
      icon: 'Instagram',
    },
  ],
  /** Cores da página; paleta Dracula (https://draculatheme.com/contribute). */
  theme: {
    /** Cor de destaque (bordas, ícones sociais, foco) — Purple. */
    primary: '#bd93f9',
    /** Fundo da página — Background. */
    background: '#282a36',
    /** Fundo dos botões de link — Current Line. */
    buttonBackground: '#44475a',
    /** Texto dentro dos botões — Foreground. */
    buttonText: '#f8f8f2',
  },
  /** SEO e preview ao compartilhar (injetado no HTML no build). */
  meta: {
    /** <title> e og:title. */
    title: 'Felipe Almeida — Links',
    /** meta description e og:description. */
    description: 'Todos os meus links em um só lugar.',
    /** Imagem de preview (URL absoluta); opcional. */
    ogImage: 'https://example.com/og.png',
    /** Idioma do documento (BCP 47), ex.: pt-BR. */
    lang: 'pt-BR',
    /** URL canônica da página publicada; opcional. */
    // canonicalUrl: 'https://example.com/',
  },
}
