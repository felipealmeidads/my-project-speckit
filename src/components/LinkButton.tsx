import { getIcon } from '../lib/iconMap'
import type { LinkButtonProps } from '../types'

export function LinkButton({ link }: LinkButtonProps) {
  const Icon = getIcon(link.icon)
  const className = link.highlighted
    ? 'link-button link-button--highlighted'
    : 'link-button'

  return (
    <a
      className={className}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.title}
    >
      <Icon className="link-button__icon" aria-hidden />
      <span className="link-button__title">{link.title}</span>
    </a>
  )
}
