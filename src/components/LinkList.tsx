import { LinkButton } from './LinkButton'
import type { LinkListProps } from '../types'

export function LinkList({ links }: LinkListProps) {
  if (links.length === 0) {
    return null
  }

  return (
    <ul className="link-list">
      {links.map((link) => (
        <li key={link.id}>
          <LinkButton link={link} />
        </li>
      ))}
    </ul>
  )
}
