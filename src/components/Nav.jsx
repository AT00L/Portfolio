import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { profile } from '../data'
import Clock from './Clock'
import { GitHubIcon } from './Icons'
import Magnetic from './Magnetic'
import RollText from './RollText'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

const ease = [0.76, 0, 0.24, 1]
const origin = 'at calc(100% - 40px) 36px'

export default function Nav({ lenis }) {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 240)
    setScrolled(y > 24)
  })

  // Lenis is started/stopped synchronously so an anchor click in the menu can scroll right away.
  const toggle = (next) => {
    setOpen(next)
    if (next) lenis.current?.stop()
    else lenis.current?.start()
    document.documentElement.classList.toggle('menu-open', next)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      lenis.current?.start()
      document.documentElement.classList.remove('menu-open')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, lenis])

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'is-scrolled' : ''}`}
        animate={{ y: hidden && !open ? '-120%' : '0%' }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="nav__inner wrap">
          <a href="#top" className="nav__logo hover-roll">
            <span className="nav__mark" aria-hidden="true">
              a<i />
            </span>
            <RollText text={profile.name} />
          </a>

          <nav className="nav__links" aria-label="Primary">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover-roll">
                <RollText text={l.label} />
              </a>
            ))}
          </nav>

          <div className="nav__right">
            <Clock />
            <Magnetic strength={0.25}>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn--sm hover-roll"
              >
                <GitHubIcon />
                <RollText text="GitHub" />
              </a>
            </Magnetic>
            <button
              type="button"
              className={`nav__burger ${open ? 'is-open' : ''}`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => toggle(!open)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: `circle(0% ${origin})` }}
            animate={{ clipPath: `circle(150% ${origin})` }}
            exit={{ clipPath: `circle(0% ${origin})` }}
            transition={{ duration: 0.8, ease }}
          >
            <nav className="menu__links" aria-label="Mobile">
              {links.map((l, i) => (
                <div key={l.href} className="mask">
                  <motion.a
                    href={l.href}
                    onClick={() => toggle(false)}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.06 }}
                  >
                    <span className="menu__num">0{i + 1}</span>
                    {l.label}
                  </motion.a>
                </div>
              ))}
            </nav>
            <div className="menu__foot">
              <a href={profile.github} target="_blank" rel="noreferrer">
                github.com/{profile.githubHandle} ↗
              </a>
              <Clock />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
