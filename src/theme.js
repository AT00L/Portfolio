import { useSyncExternalStore } from 'react'

// The theme lives on <html data-theme>. index.html sets it before first paint:
// dark by default, light if the visitor chose it.
// There's no document when the page is prerendered at build time (scripts/prerender.js).
const root = typeof document === 'undefined' ? null : document.documentElement
const colors = { light: '#dff0fd', dark: '#0b0f19' }

const read = () => (root.dataset.theme === 'dark' ? 'dark' : 'light')

const subscribe = (onChange) => {
  const observer = new MutationObserver(onChange)
  observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

export function useTheme() {
  // The prerendered page uses the default, dark.
  return useSyncExternalStore(subscribe, read, () => 'dark')
}

function apply(theme) {
  root.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', colors[theme])
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // Storage can be unavailable (private mode); the choice just isn't remembered.
  }
}

// Switches theme with a circle that grows out from (x, y), where supported.
export function toggleTheme(x = window.innerWidth / 2, y = 0) {
  const next = read() === 'dark' ? 'light' : 'dark'
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || reduce) {
    apply(next)
    return
  }
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
  const transition = document.startViewTransition(() => apply(next))
  transition.ready.then(() => {
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 750, easing: 'cubic-bezier(0.76, 0, 0.24, 1)', pseudoElement: '::view-transition-new(root)' },
    )
  })
}
