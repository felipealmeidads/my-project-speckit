import type { LinkItem } from '../types'

const URL_PATTERN = /^https?:\/\/.+/i

export function prepareLinks(links: LinkItem[]): LinkItem[] {
  return links.filter((link) => URL_PATTERN.test(link.url.trim()))
}
