import { toggleTheme, useTheme } from '../theme'

const icon =
  'absolute shrink-0 [transition:translate_0.6s_var(--ease),rotate_0.6s_var(--ease),opacity_0.4s]'

export default function ThemeToggle() {
  const theme = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  const onClick = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    toggleTheme(r.left + r.width / 2, r.top + r.height / 2)
  }

  // Shows the theme you'd switch to: a moon on light, a sun on dark.
  return (
    <button
      type="button"
      className="relative grid size-10 place-items-center overflow-hidden rounded-full border border-line-2 bg-chip text-fg transition-colors duration-300 hover:border-fg"
      onClick={onClick}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      <svg
        className={`${icon} ${theme === 'light' ? 'translate-y-[120%] -rotate-90 opacity-0' : ''}`}
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
      </svg>
      <svg
        className={`${icon} ${theme === 'dark' ? '-translate-y-[120%] rotate-60 opacity-0' : ''}`}
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
        fill="currentColor"
      >
        <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z" />
      </svg>
    </button>
  )
}
