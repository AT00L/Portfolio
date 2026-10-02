import { useEffect, useState } from 'react'
import { profile } from '../data'

const fmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: profile.timezone,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

export default function Clock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="clock">
      {profile.tzLabel} <time>{fmt.format(now)}</time>
    </span>
  )
}
