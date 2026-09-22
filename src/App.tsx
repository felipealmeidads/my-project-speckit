import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { siteConfig } from './config'
import { ProfileCard } from './components/ProfileCard'
import { LinkList } from './components/LinkList'
import { SocialIcons } from './components/SocialIcons'
import { applyTheme } from './lib/applyTheme'
import { prepareLinks } from './lib/prepareLinks'

const mainLinks = prepareLinks(siteConfig.links)
const socialLinks = prepareLinks(siteConfig.socialLinks ?? [])

const stagger = 0.05

export default function App() {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    applyTheme(siteConfig.theme)
  }, [])

  const fadeIn = prefersReducedMotion
    ? { initial: false as const }
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
      }

  const transition = (delay: number) =>
    prefersReducedMotion
      ? undefined
      : { duration: 0.35, ease: 'easeOut' as const, delay }

  return (
    <main className="page">
      <div className="page__content">
        <motion.div {...fadeIn} transition={transition(0)}>
          <ProfileCard profile={siteConfig.profile} />
        </motion.div>

        {mainLinks.length === 0 ? (
          <p className="empty-message" role="status">
            Nenhum link disponível no momento.
          </p>
        ) : (
          <motion.div {...fadeIn} transition={transition(stagger)}>
            <LinkList links={mainLinks} />
          </motion.div>
        )}

        {socialLinks.length > 0 && (
          <motion.div {...fadeIn} transition={transition(stagger * 2)}>
            <SocialIcons links={socialLinks} />
          </motion.div>
        )}
      </div>
    </main>
  )
}
