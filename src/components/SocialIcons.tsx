import { getIcon } from '../lib/iconMap'
import type { SocialIconsProps } from '../types'

export function SocialIcons({ links }: SocialIconsProps) {
  if (links.length === 0) {
    return null
  }

  return (
    <nav aria-label="Redes sociais">
      <ul className="social-icons">
        {links.map((link) => {
          const Icon = getIcon(link.icon)
          return (
            <li key={link.id}>
              <a
                className="social-icons__link"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.title}
              >
                <Icon className="social-icons__icon" aria-hidden />
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
