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
import { btn, btnAccent, btnGhost, btnLg, dot, emphasis, titleMask } from '../ui'
import { ArrowIcon, BriefcaseIcon, CodeIcon, GitHubIcon } from './Icons'
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
    <section
      id="top"
      className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden pt-[calc(var(--nav-h)_+_40px)] short:pt-[calc(var(--nav-h)_+_20px)]"
      ref={ref}
      onPointerMove={onMove}
    >
      <div
        className="absolute inset-0 -z-2 bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-[length:72px_72px] bg-top [mask-image:radial-gradient(ellipse_80%_70%_at_50%_35%,#000_25%,transparent_75%)]"
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute top-0 left-0 -z-1 -mt-[600px] -ml-[600px] size-[1200px] bg-[radial-gradient(circle,var(--glow),transparent_50%)] will-change-transform"
        style={{ x: sgx, y: sgy }}
        aria-hidden="true"
      />

      <motion.div className="wrap relative origin-bottom" style={{ y, opacity, scale }}>
        <motion.p
          className="inline-flex items-center gap-2.5 rounded-full border border-line-2 bg-chip py-2 pr-4 pl-3 text-[14px] text-fg-2 backdrop-blur-[8px]"
          variants={fade}
          custom={-3}
          initial="hidden"
          animate={state}
        >
          <span className={`${dot} size-2`} aria-hidden="true" />
          {profile.role} at{' '}
          <a
            href={profile.companyUrl}
            target="_blank"
            rel="noreferrer"
            className="text-fg underline decoration-line-2 underline-offset-[3px] transition-[text-decoration-color] duration-300 hover:decoration-accent"
          >
            {profile.company}
          </a>
          <span className="h-3.5 w-px bg-line-2" aria-hidden="true" />
          {profile.years}+ yrs
        </motion.p>

        <h1 className="mt-[26px] text-[34px] leading-none font-semibold tracking-[-0.05em] short:mt-5">
          <span className="sr-only">
            Hello, I’m {profile.name} — {profile.roles.join(' ')}
          </span>
          <span className={titleMask} aria-hidden="true">
            <motion.span
              className="block text-[clamp(1.9rem,4.4vw,4.6rem)] font-medium tracking-[-0.04em] text-fg-2 max-sm:text-[8.4vw]"
              variants={rise}
              custom={0}
              initial="hidden"
              animate={state}
            >
              Hello, I’m <em className={`${emphasis} text-[1.08em]`}>{profile.first}</em>
            </motion.span>
          </span>
          {/* Sized so the longest role fits on one line; the line keeps its height while typing. */}
          <span className={titleMask} aria-hidden="true">
            <motion.span
              className="block min-h-[1em] text-[clamp(2.4rem,7.2vw,7.6rem)] whitespace-nowrap short:text-[min(7.2vw,13svh)] max-sm:min-h-[2em] max-sm:text-[11.6vw] max-sm:whitespace-normal"
              variants={rise}
              custom={1}
              initial="hidden"
              animate={state}
            >
              <Typewriter phrases={profile.roles} start={ready} />
            </motion.span>
          </span>
        </h1>

        <div className="mt-[clamp(36px,5vw,64px)] grid grid-cols-[1.1fr_1fr] items-end gap-[clamp(28px,5vw,80px)] short:mt-7 max-lg:grid-cols-1 max-lg:items-start">
          <div>
            <motion.p
              className="max-w-[44ch] text-[clamp(1.05rem,1.35vw,1.22rem)] leading-[1.55] text-fg-2"
              variants={fade}
              custom={0}
              initial="hidden"
              animate={state}
            >
              A MERN stack developer with {profile.years}+ years of building production software at{' '}
              {profile.company}. I build web apps in React, mobile apps in React Native, and the APIs
              and tooling behind them.
            </motion.p>
            <motion.div
              className="mt-[30px] flex flex-wrap gap-3"
              variants={fade}
              custom={1}
              initial="hidden"
              animate={state}
            >
              <Magnetic>
                <a href="#work" className={`${btn} ${btnLg} ${btnAccent}`}>
                  <RollText text="See my work" />
                  <ArrowIcon down />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`${btn} ${btnLg} ${btnGhost}`}
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
                  className={`${btn} ${btnLg} ${btnGhost}`}
                >
                  <CodeIcon />
                  <RollText text="LeetCode" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={`${btn} ${btnLg} ${btnGhost}`}
                >
                  <BriefcaseIcon />
                  <RollText text="LinkedIn" />
                </a>
              </Magnetic>
            </motion.div>
          </div>

          <motion.div
            className="w-full max-w-[540px] justify-self-end max-lg:max-w-none max-lg:justify-self-stretch"
            variants={fade}
            custom={2}
            initial="hidden"
            animate={state}
          >
            <Terminal start={ready} delay={2200} />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="wrap mt-[clamp(36px,5vw,56px)] flex items-center justify-between border-t border-line pt-[22px] pb-6 font-mono text-[12px] leading-[normal] tracking-[0.08em] text-muted uppercase short:mt-7 short:pt-4 short:pb-[18px]"
        variants={fade}
        custom={4}
        initial="hidden"
        animate={state}
      >
        <span className="inline-flex items-center gap-3">
          <span className="relative h-7 w-px overflow-hidden bg-line-2 max-sm:hidden" aria-hidden="true">
            <span className="absolute inset-x-0 top-0 h-[40%] animate-drip bg-mark" />
          </span>
          Scroll
        </span>
        <span className="max-sm:hidden">Web · Mobile · Backend — {new Date().getFullYear()}</span>
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
      <span className="ml-[0.04em] inline-block h-[0.7em] w-[0.07em] animate-blink bg-mark" />
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
    <div
      className="stage overflow-hidden rounded-[18px] border border-line-2 bg-[rgba(15,21,34,0.94)] font-mono text-[13.5px] leading-[1.7] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-[12px] short:text-[12.5px] max-sm:text-[12px]"
      role="img"
      aria-label="Terminal: whoami, experience and projects"
    >
      <div className="relative flex items-center gap-[7px] border-b border-line px-4 py-3">
        <i className="size-2.5 rounded-full bg-[#ff5f57]" />
        <i className="size-2.5 rounded-full bg-[#febc2e]" />
        <i className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="absolute left-1/2 -translate-x-1/2 text-[12px] text-muted">atul@dev — zsh</span>
      </div>
      <div
        className="min-h-[calc(13.5px*1.7*7_+_36px)] px-[18px] pt-4 pb-5 text-fg short:min-h-[calc(12.5px*1.7*7_+_36px)] max-sm:min-h-0 [&_b]:font-medium [&_b]:text-mark [&_p]:whitespace-pre-wrap"
        aria-hidden="true"
      >
        {script.slice(0, shown).map((s) => (
          <div key={s.cmd}>
            <p>
              <b>~ $</b> {s.cmd}
            </p>
            <p className="text-muted">{s.out}</p>
          </div>
        ))}
        <p>
          <b>~ $</b> {shown < script.length && script[shown].cmd.slice(0, chars)}
          <span className="ml-0.5 inline-block h-[1.15em] w-[0.6em] animate-blink-fast bg-fg align-[-0.22em]" />
        </p>
      </div>
    </div>
  )
}
