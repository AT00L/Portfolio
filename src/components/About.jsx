import { animate, motion, useInView, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'
import { about, stats } from '../data'
import SectionHead from './SectionHead'

// Each word brightens as the paragraph scrolls through the viewport.
function ScrollText({ text }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')

  return (
    <p className="about__text" ref={ref}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  )
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <span className="about__word" aria-hidden="true">
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </span>
  )
}

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v)).padStart(2, '0') + suffix
      },
    })
    return () => controls.stop()
  }, [inView, value, suffix])

  return (
    <span className="stat__value" ref={ref}>
      00{suffix}
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="wrap">
        <SectionHead index="01" label="About" title="Builder by default." />
        <ScrollText text={about} />
        <ul className="stats">
          {stats.map((s, i) => (
            <motion.li
              key={s.label}
              className="stat"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              <Counter value={s.value} suffix={s.suffix} />
              <span className="stat__label">{s.label}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
