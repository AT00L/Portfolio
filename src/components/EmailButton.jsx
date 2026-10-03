import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { profile } from '../data'
import { ease } from '../motion'
import { btn, btnGhost, btnSm } from '../ui'
import { ArrowIcon, MailIcon } from './Icons'
import Magnetic from './Magnetic'

const to = encodeURIComponent(profile.email)
const subject = encodeURIComponent('Hi Atul, from your portfolio')
// Opens a new email in whichever mail app the visitor has set as their default.
const mailto = `mailto:${profile.email}?subject=${subject}`
// For visitors with no mail app set up, where mailto: does nothing.
const webmail = [
  { name: 'Gmail', href: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}` },
  { name: 'Outlook', href: `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${subject}` },
  { name: 'Yahoo', href: `https://compose.mail.yahoo.com/?to=${to}&subject=${subject}` },
]

export default function EmailButton() {
  const [fallback, setFallback] = useState(false)
  const timer = useRef(null)
  const panel = useRef(null)

  // A mail app opening takes focus away from the page. If that hasn't happened
  // a second after the click, nothing opened, so offer web mail instead.
  const onClick = () => {
    let left = false
    const mark = () => {
      left = true
    }
    window.addEventListener('blur', mark, { once: true })
    document.addEventListener('visibilitychange', mark, { once: true })
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      window.removeEventListener('blur', mark)
      document.removeEventListener('visibilitychange', mark)
      if (!left) setFallback(true)
    }, 1000)
  }

  useEffect(() => () => clearTimeout(timer.current), [])

  // Close the panel with Escape or a click anywhere outside it.
  useEffect(() => {
    if (!fallback) return
    const onKey = (e) => {
      if (e.key === 'Escape') setFallback(false)
    }
    const onDown = (e) => {
      if (!panel.current?.contains(e.target)) setFallback(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [fallback])

  return (
    <div className="relative">
      <Magnetic strength={0.45}>
        <a
          href={mailto}
          onClick={onClick}
          className="group/link flex aspect-square w-[clamp(190px,18vw,250px)] flex-col items-center justify-center gap-2.5 rounded-full bg-accent text-center text-ink [transition:scale_0.6s_var(--ease),background-color_0.4s] hover:scale-[1.06] hover:bg-fg hover:text-page"
          data-cursor="Email me"
        >
          <MailIcon size={30} />
          <span className="text-[17px] leading-tight font-semibold tracking-[-0.02em]">
            Want to connect?
          </span>
          <span className="font-mono text-[11.5px] leading-[normal] font-medium">{profile.email}</span>
          <ArrowIcon size={20} />
        </a>
      </Magnetic>

      <AnimatePresence>
        {fallback && (
          <motion.div
            ref={panel}
            role="dialog"
            aria-label="Email options"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.3, ease }}
            className="absolute top-full right-0 z-20 mt-4 w-[300px] origin-top rounded-2xl border border-line-2 bg-card p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] max-md:right-auto max-md:left-0"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-[16px] leading-snug font-semibold tracking-[-0.02em]">No email app opened?</p>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setFallback(false)}
                className="-mt-1 -mr-1 grid size-7 shrink-0 place-items-center rounded-full text-[18px] leading-none text-muted transition-colors hover:text-fg"
              >
                ×
              </button>
            </div>
            <p className="mt-1 text-[14px] text-fg-2">Write to me from your web mail instead:</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {webmail.map((m) => (
                <a
                  key={m.name}
                  href={m.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setFallback(false)}
                  className={`${btn} ${btnSm} ${btnGhost}`}
                >
                  {m.name}
                  <ArrowIcon />
                </a>
              ))}
            </div>
            <p className="mt-4 border-t border-line pt-3 font-mono text-[12px] text-muted">{profile.email}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
