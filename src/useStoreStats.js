import { useEffect, useState } from 'react'

// The Chrome Web Store page can't be fetched from another site, so the numbers
// come from shields.io, which reads the store and allows cross-site requests.
// Shields refreshes them about every 30 minutes.
const BASE = 'https://img.shields.io/chrome-web-store'
const cache = new Map()

const metric = (name, id) =>
  fetch(`${BASE}/${name}/${id}.json`)
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((d) => d.value)

function load(id) {
  if (!cache.has(id)) {
    const request = Promise.all([metric('users', id), metric('rating', id)])
      .then(([users, rating]) => ({
        // e.g. "9" or "1.2k"; anything else means shields couldn't read the store.
        users: /^\d/.test(users) ? users : null,
        rating: parseFloat(rating) || null, // "5/5" -> 5
      }))
      .catch(() => {
        cache.delete(id) // try again on the next mount
        return null
      })
    cache.set(id, request)
  }
  return cache.get(id)
}

// Users and rating for a Chrome Web Store extension; null while loading or on failure.
export default function useStoreStats(id) {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    if (!id) return
    let alive = true
    load(id).then((s) => {
      if (alive) setStats(s)
    })
    return () => {
      alive = false
    }
  }, [id])

  return stats
}
