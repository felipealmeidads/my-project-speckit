export type LucideIconName =
  | 'Link'
  | 'Globe'
  | 'Github'
  | 'Gitlab'
  | 'Linkedin'
  | 'Twitter'
  | 'Instagram'
  | 'Youtube'
  | 'Twitch'
  | 'Mail'
  | 'MessageCircle'
  | 'BookOpen'
  | 'ShoppingBag'
  | 'Calendar'
  | 'FileText'

export interface Profile {
  name: string
  handle: string
  bio: string
  avatarUrl: string
}

export interface LinkItem {
  id: string
  title: string
  url: string
  icon: LucideIconName
  highlighted?: boolean
}

export interface Theme {
  primary: string
  background: string
  buttonBackground: string
  buttonText: string
}

export interface Meta {
  title: string
  description: string
  ogImage?: string
  lang?: string
  canonicalUrl?: string
}

export interface SiteConfig {
  profile: Profile
  links: LinkItem[]
  socialLinks?: LinkItem[]
  theme: Theme
  meta: Meta
}

export interface ProfileCardProps {
  profile: Profile
}

export interface LinkButtonProps {
  link: LinkItem
}

export interface LinkListProps {
  links: LinkItem[]
}

export interface SocialIconsProps {
  links: LinkItem[]
}
