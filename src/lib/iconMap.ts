import type { LucideIconName } from '../types'
import {
  BookOpen,
  Calendar,
  FileText,
  Github,
  Gitlab,
  Globe,
  Instagram,
  Link,
  Linkedin,
  Mail,
  MessageCircle,
  ShoppingBag,
  Twitch,
  Twitter,
  Youtube,
  type LucideIcon,
} from 'lucide-react'

export const iconMap: Record<LucideIconName, LucideIcon> = {
  Link,
  Globe,
  Github,
  Gitlab,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Twitch,
  Mail,
  MessageCircle,
  BookOpen,
  ShoppingBag,
  Calendar,
  FileText,
}

export function getIcon(name: LucideIconName): LucideIcon {
  return iconMap[name]
}
