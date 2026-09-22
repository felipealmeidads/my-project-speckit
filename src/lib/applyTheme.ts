import type { Theme } from '../types'

export function applyTheme(theme: Theme): void {
  const root = document.documentElement
  root.style.setProperty('--color-primary', theme.primary)
  root.style.setProperty('--color-bg', theme.background)
  root.style.setProperty('--color-button-bg', theme.buttonBackground)
  root.style.setProperty('--color-button-text', theme.buttonText)
  root.style.setProperty(
    '--color-text',
    `color-mix(in srgb, ${theme.buttonText} 92%, ${theme.background})`,
  )
  root.style.setProperty(
    '--color-muted',
    `color-mix(in srgb, ${theme.buttonText} 55%, ${theme.background})`,
  )
  root.style.setProperty(
    '--color-focus-ring',
    `color-mix(in srgb, ${theme.primary} 60%, white)`,
  )
}
