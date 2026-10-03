import { animate, motion, useInView, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'
import { about, stats } from '../data'
import { section } from '../ui'
import SectionHead from './SectionHead'

// Each word brightens as the paragraph scrolls through the viewport.
function ScrollText({ text }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')

  return (
    <p
      className="max-w-[1180px] text-[clamp(1.55rem,3.5vw,3.3rem)] leading-[1.16] font-medium tracking-[-0.035em]"
      ref={ref}
    >
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
    <span aria-hidden="true">
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
    <span
      className="text-[clamp(3.6rem,8vw,7.5rem)] leading-[0.9] font-semibold tracking-[-0.06em] tabular-nums"
      ref={ref}
    >
      00{suffix}
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className={section}>
      <div className="wrap">
        <SectionHead index="01" label="About" title="Builder by default." />
        <ScrollText text={about} />
        <ul className="mt-[clamp(64px,9vw,120px)] grid grid-cols-3 border-t border-line max-md:grid-cols-1">
          {stats.map((s, i) => (
            <motion.li
              key={s.label}
              className="flex flex-col gap-3.5 border-r border-line px-7 pt-8 pb-2 first:pl-0 last:border-r-0 max-md:flex-row max-md:items-center max-md:justify-between max-md:gap-5 max-md:border-r-0 max-md:border-b max-md:px-0 max-md:py-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              <Counter value={s.value} suffix={s.suffix} />
              <span className="max-w-[24ch] text-[15px] text-muted max-md:text-right">{s.label}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
