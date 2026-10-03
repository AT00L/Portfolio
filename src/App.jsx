import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Cursor from './components/Cursor'
import Experience from './components/Experience'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Nav from './components/Nav'
import Preloader from './components/Preloader'
import Projects from './components/Projects'
import Skills from './components/Skills'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Show the intro once per browser session.
function introSeen() {
  try {
    return sessionStorage.getItem('intro-seen') === '1'
  } catch {
    return false
  }
}

export default function App() {
  const [ready, setReady] = useState(() => prefersReducedMotion() || introSeen())
  const lenis = useRef(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    if (prefersReducedMotion()) return
    const instance = new Lenis({ autoRaf: true, lerp: 0.085, wheelMultiplier: 1 })
    lenis.current = instance
    return () => {
      instance.destroy()
      lenis.current = null
    }
  }, [])

  // Hold the page still while the intro plays.
  useEffect(() => {
    document.documentElement.classList.toggle('is-loading', !ready)
    if (ready) lenis.current?.start()
    else {
      window.scrollTo(0, 0)
      lenis.current?.stop()
    }
  }, [ready])

  // Smooth in-page anchor links (#work, #contact, …).
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return
      const target = a.getAttribute('href') === '#top' ? 0 : document.querySelector(a.hash)
      if (target === null) return
      e.preventDefault()
      if (lenis.current) lenis.current.scrollTo(target, { duration: 1.4 })
      else if (target === 0) window.scrollTo({ top: 0, behavior: 'smooth' })
      else target.scrollIntoView({ behavior: 'smooth' })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem('intro-seen', '1')
    } catch {
      // Storage can be unavailable (private mode); the intro just replays next time.
    }
    setReady(true)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{!ready && <Preloader key="intro" onDone={finishIntro} />}</AnimatePresence>
      <motion.div
        className="fixed inset-x-0 top-0 z-110 h-0.5 origin-left bg-mark"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
      <Cursor />
      <div
        className="pointer-events-none fixed inset-0 z-100 bg-noise opacity-(--grain)"
        aria-hidden="true"
      />
      <Nav lenis={lenis} />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
      </main>
      <Contact />
    </MotionConfig>
  )
}
