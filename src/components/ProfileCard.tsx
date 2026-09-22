import { useState } from 'react'
import type { ProfileCardProps } from '../types'

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const showFallback = imageFailed || !profile.avatarUrl

  return (
    <header className="profile-card">
      <div className="profile-card__avatar-wrap">
        {showFallback ? (
          <div
            className="profile-card__avatar-fallback"
            role="img"
            aria-label={profile.name}
          >
            {getInitials(profile.name)}
          </div>
        ) : (
          <img
            className="profile-card__avatar"
            src={profile.avatarUrl}
            alt={profile.name}
            width={80}
            height={80}
            loading="eager"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        )}
      </div>
      <h1 className="profile-card__name">{profile.name}</h1>
      <p className="profile-card__handle">{profile.handle}</p>
      <p className="profile-card__bio">{profile.bio}</p>
    </header>
  )
}
