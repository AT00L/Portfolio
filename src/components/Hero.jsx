import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { profile } from '../data'
import { ease } from '../motion'
import { ArrowIcon, CodeIcon, GitHubIcon } from './Icons'
import Magnetic from './Magnetic'
import RollText from './RollText'


const rise = {
  hidden: { y: '115%', rotate: 3 },
  show: (i) => ({ y: '0%', rotate: 0, transition: { duration: 1.25, ease, delay: 0.25 + i * 0.1 } }),
}

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 1, ease, delay: 0.6 + i * 0.08 } }),
}

export default function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  // Soft glow that trails the pointer. It's moved with transforms only, so no repaints.
  const gx = useMotionValue(window.innerWidth * 0.7)
  const gy = useMotionValue(window.innerHeight * 0.3)
  const sgx = useSpring(gx, { stiffness: 40, damping: 20 })
  const sgy = useSpring(gy, { stiffness: 40, damping: 20 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    gx.set(e.clientX - r.left)
    gy.set(e.clientY - r.top)
  }

  const state = ready ? 'show' : 'hidden'

  return (
    <section id="top" className="hero" ref={ref} onPointerMove={onMove}>
      <div className="hero__grid" aria-hidden="true" />
      <motion.div className="hero__glow" style={{ x: sgx, y: sgy }} aria-hidden="true" />

      <motion.div className="hero__content wrap" style={{ y, opacity, scale }}>
        <motion.p className="pill" variants={fade} custom={-3} initial="hidden" animate={state}>
          <span className="dot" aria-hidden="true" />
          {profile.role} at{' '}
          <a href={profile.companyUrl} target="_blank" rel="noreferrer">
            {profile.company}
          </a>
          <span className="pill__sep" aria-hidden="true" />
          {profile.years}+ yrs
        </motion.p>

        <h1 className="hero__title">
          <span className="sr-only">
            Hello, I’m {profile.name} — {profile.roles.join(' ')}
          </span>
          <span className="mask" aria-hidden="true">
            <motion.span
              className="hero__hello"
              variants={rise}
              custom={0}
              initial="hidden"
              animate={state}
            >
              Hello, I’m <em>{profile.first}</em>
            </motion.span>
          </span>
          <span className="mask" aria-hidden="true">
            <motion.span
              className="hero__role"
              variants={rise}
              custom={1}
              initial="hidden"
              animate={state}
            >
              <Typewriter phrases={profile.roles} start={ready} />
            </motion.span>
          </span>
        </h1>

        <div className="hero__bottom">
          <div className="hero__intro">
            <motion.p variants={fade} custom={0} initial="hidden" animate={state}>
              A software developer with {profile.years}+ years of building production software at{' '}
              {profile.company}. I build web apps in React, mobile apps in React Native, and the APIs
              and tooling behind them.
            </motion.p>
            <motion.div
              className="hero__cta"
              variants={fade}
              custom={1}
              initial="hidden"
              animate={state}
            >
              <Magnetic>
                <a href="#work" className="btn btn--accent hover-roll">
                  <RollText text="See my work" />
                  <ArrowIcon down />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn hover-roll"
                >
                  <GitHubIcon />
                  <RollText text={`@${profile.githubHandle}`} />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={profile.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="btn hover-roll"
                >
                  <CodeIcon />
                  <RollText text="LeetCode" />
                </a>
              </Magnetic>
            </motion.div>
          </div>

          <motion.div className="hero__term" variants={fade} custom={2} initial="hidden" animate={state}>
            <Terminal start={ready} delay={2200} />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="hero__foot wrap"
        variants={fade}
        custom={4}
        initial="hidden"
        animate={state}
      >
        <span className="scroll-hint">
          <span className="scroll-hint__track" aria-hidden="true">
            <span />
          </span>
          Scroll
        </span>
        <span>Web · Mobile · Backend — {new Date().getFullYear()}</span>
      </motion.div>
    </section>
  )
}

const script = [
  { cmd: 'whoami', out: 'atul — software developer (web + mobile)' },
  { cmd: 'cat experience.txt', out: `${profile.years}+ years @ ${profile.company} · still shipping` },
  { cmd: 'ls ~/projects', out: 'css-injector  url-shortener  yourlabtest  portfolio' },
]

// Types each phrase, holds it, deletes it, then moves to the next one.
function Typewriter({ phrases, start }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [chars, setChars] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!start || reduce) return
    const full = phrases[index]
    let delay
    if (!deleting) delay = chars === 0 ? 900 : chars < full.length ? 55 + Math.random() * 50 : 2000
    else delay = chars > 0 ? 28 : 350
    const t = setTimeout(() => {
      if (!deleting && chars < full.length) setChars(chars + 1)
      else if (!deleting) setDeleting(true)
      else if (chars > 0) setChars(chars - 1)
      else {
        setDeleting(false)
        setIndex((index + 1) % phrases.length)
      }
    }, delay)
    return () => clearTimeout(t)
  }, [start, reduce, phrases, index, chars, deleting])

  const text = reduce ? phrases[0] : phrases[index].slice(0, chars)

  return (
    <>
      {text}
      <span className="hero__caret" />
    </>
  )
}

function Terminal({ start, delay = 0 }) {
  const reduce = useReducedMotion()
  const [line, setLine] = useState(0)
  const [chars, setChars] = useState(0)
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    if (!start || reduce) return
    const t = setTimeout(() => setArmed(true), delay)
    return () => clearTimeout(t)
  }, [start, reduce, delay])

  useEffect(() => {
    if (!armed || reduce || line >= script.length) return
    const cmd = script[line].cmd
    const typing = chars < cmd.length
    const wait = chars === 0 ? 650 : typing ? 45 + Math.random() * 55 : 380
    const t = setTimeout(() => {
      if (typing) setChars((c) => c + 1)
      else {
        setLine((l) => l + 1)
        setChars(0)
      }
    }, wait)
    return () => clearTimeout(t)
  }, [armed, reduce, line, chars])

  const shown = reduce ? script.length : line

  return (
    <div className="term" role="img" aria-label="Terminal: whoami, experience and projects">
      <div className="term__bar">
        <i />
        <i />
        <i />
        <span>atul@dev — zsh</span>
      </div>
      <div className="term__body" aria-hidden="true">
        {script.slice(0, shown).map((s) => (
          <div key={s.cmd}>
            <p>
              <b>~ $</b> {s.cmd}
            </p>
            <p className="term__out">{s.out}</p>
          </div>
        ))}
        <p>
          <b>~ $</b> {shown < script.length && script[shown].cmd.slice(0, chars)}
          <span className="term__caret" />
        </p>
      </div>
    </div>
  )
}
