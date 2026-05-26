import type { SiteConfig } from './types'

export const siteConfig: SiteConfig = {
  /** Identidade no topo: foto, nome, @handle e bio. */
  profile: {
    /** Nome principal exibido abaixo do avatar. */
    name: 'Alex Silva',
    /** Identificador curto, ex.: @usuario. */
    handle: '@alexsilva',
    /** Texto de apresentação (quebras de linha permitidas). */
    bio: 'Desenvolvedor e criador de conteúdo. Todos os meus links em um só lugar.',
    /** URL da foto (arquivo em public/, ex.: /avatar.jpg). */
    avatarUrl: '/avatar.jpg',
  },
  /** Botões principais; ordem do array = ordem na página. */
  links: [
    {
      id: 'portfolio',
      title: 'Portfólio',
      url: 'https://example.com',
      icon: 'Globe',
      highlighted: true,
    },
    {
      id: 'github',
      title: 'GitHub',
      url: 'https://github.com/example',
      icon: 'Github',
    },
    {
      id: 'contact',
      title: 'Contato',
      url: 'https://example.com/contact',
      icon: 'Mail',
    },
  ],
  /** Ícones sociais opcionais (fileira abaixo dos botões). Omita ou use [] para ocultar. */
  socialLinks: [
    {
      id: 'github-social',
      title: 'GitHub',
      url: 'https://github.com/example',
      icon: 'Github',
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      url: 'https://linkedin.com/in/example',
      icon: 'Linkedin',
    },
    {
      id: 'instagram',
      title: 'Instagram',
      url: 'https://instagram.com/example',
      icon: 'Instagram',
    },
  ],
  /** Cores da página; valide contraste no quickstart antes de publicar. */
  theme: {
    /** Cor de destaque (bordas, ícones sociais, foco). */
    primary: '#6366f1',
    /** Fundo da página. */
    background: '#0f172a',
    /** Fundo dos botões de link. */
    buttonBackground: '#1e293b',
    /** Texto dentro dos botões. */
    buttonText: '#f8fafc',
  },
  /** SEO e preview ao compartilhar (injetado no HTML no build). */
  meta: {
    /** <title> e og:title. */
    title: 'Alex Silva — Links',
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
