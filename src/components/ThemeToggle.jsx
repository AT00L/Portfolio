import { toggleTheme, useTheme } from '../theme'

export default function ThemeToggle() {
  const theme = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  const onClick = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    toggleTheme(r.left + r.width / 2, r.top + r.height / 2)
  }

  return (
    <button
      type="button"
      className={`theme-toggle is-${theme}`}
      onClick={onClick}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      <svg className="theme-toggle__sun" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
      </svg>
      <svg className="theme-toggle__moon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z" />
      </svg>
    </button>
  )
}
