import { useEffect, useState } from 'react'
import { profile } from '../data'

const fmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: profile.timezone,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

export default function Clock({ className = '' }) {
  // No time in the prerendered page (it would be the build's); it fills in on load.
  const [now, setNow] = useState(() => (typeof window === 'undefined' ? null : new Date()))

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span
      className={`font-mono text-[12px] leading-none tracking-[0.04em] whitespace-nowrap text-muted ${className}`}
    >
      {profile.tzLabel} <time className="text-fg-2 tabular-nums">{now ? fmt.format(now) : '--:--:--'}</time>
    </span>
  )
}
