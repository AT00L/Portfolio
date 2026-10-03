import { motion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { experience } from '../data'
import { ease } from '../motion'
import { badge, section, tag, tags } from '../ui'
import { ArrowIcon } from './Icons'
import SectionHead from './SectionHead'

const inView = { once: true, margin: '-10% 0px' }

export default function Experience() {
  const ref = useRef(null)
  // The rail fills in as the timeline scrolls through the viewport.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section id="experience" className={section}>
      <div className="wrap">
        <SectionHead index="03" label="Experience" title="Where I ship." />

        {/* Date | rail | card on desktop; rail | card on smaller screens. */}
        <div
          className="relative grid grid-cols-[minmax(0,1fr)_var(--node)_minmax(0,1.9fr)] gap-x-[clamp(20px,3vw,40px)] gap-y-14 pb-12 [--node:56px] max-lg:grid-cols-[var(--node)_minmax(0,1fr)] max-lg:gap-x-4 max-lg:[--node:40px]"
          ref={ref}
        >
          <span
            className="relative col-start-2 mt-[calc(var(--node)/2)] -mb-12 w-0.5 justify-self-center overflow-hidden rounded-[2px] bg-line-2 [mask-image:linear-gradient(to_bottom,#000_80%,transparent)] max-lg:col-start-1"
            style={{ gridRow: `1 / ${experience.length + 1}` }}
            aria-hidden="true"
          >
            <motion.span
              className="absolute inset-0 origin-top bg-(image:--accent-fill)"
              style={{ scaleY: fill }}
            />
          </span>

          {experience.map((job, i) => (
            <div key={job.company} className="contents" style={{ '--row': i + 1 }}>
              <motion.div
                className="col-start-1 row-(--row) flex flex-col items-end gap-3.5 pt-3 text-right max-lg:hidden"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={inView}
                transition={{ duration: 1, ease }}
              >
                {job.current && <span className={badge}>Current</span>}
                <p className="font-mono text-[13px] leading-[normal] tracking-[0.08em] text-muted uppercase">
                  {job.period}
                </p>
                <p
                  className="flex items-start gap-2 text-[clamp(4rem,9vw,8.5rem)] leading-[0.8] font-semibold tracking-[-0.06em] text-ghost"
                  aria-hidden="true"
                >
                  {String(job.years).padStart(2, '0')}
                  <span className="mt-[0.4em] font-mono text-[13px] leading-[normal] font-normal tracking-[0.08em] text-muted uppercase">
                    yrs
                  </span>
                </p>
              </motion.div>

              <div
                className={`relative z-1 col-start-2 row-(--row) grid size-(--node) place-items-center rounded-full border border-line-2 bg-card font-serif text-[28px] leading-none font-normal text-accent-text italic shadow-[0_0_0_8px_var(--ring-bg)] max-lg:col-start-1 max-lg:text-[20px] max-lg:shadow-[0_0_0_6px_var(--ring-bg)] ${
                  job.current
                    ? 'after:absolute after:-inset-px after:animate-ring after:rounded-full after:border after:border-mark'
                    : ''
                }`}
                aria-hidden="true"
              >
                {job.company.charAt(0)}
              </div>

              <motion.article
                className="relative col-start-3 row-(--row) overflow-hidden rounded-(--radius) border border-line bg-card p-[clamp(24px,3.4vw,44px)] [box-shadow:var(--soft-shadow)] after:pointer-events-none after:absolute after:-top-[45%] after:-right-[15%] after:aspect-square after:w-[70%] after:bg-[radial-gradient(circle,var(--accent-glow),transparent_60%)] max-lg:col-start-2"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 1.1, ease }}
              >
                <p className="hidden font-mono text-[12px] leading-[normal] tracking-[0.08em] text-muted uppercase max-lg:mb-[18px] max-lg:flex max-lg:flex-wrap max-lg:items-center max-lg:gap-3">
                  {job.current && <span className={badge}>Current</span>}
                  {job.period}
                </p>
                <h3 className="text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.9] font-semibold tracking-[-0.055em]">
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="Visit"
                    className="group/link inline-flex items-start gap-[0.08em] transition-colors duration-[400ms] hover:text-accent-text"
                  >
                    {job.company}
                    <ArrowIcon size={28} className="mt-[0.06em] size-[0.32em]" />
                  </a>
                </h3>
                <p className="mt-3.5 text-[clamp(1.1rem,1.6vw,1.35rem)] text-fg-2">{job.role}</p>
                <ul className="mt-7 grid gap-3.5 border-t border-line pt-6">
                  {job.points.map((p, j) => (
                    <motion.li
                      key={p}
                      className="relative pl-[26px] text-fg-2 before:absolute before:top-[0.75em] before:left-0 before:h-0.5 before:w-3.5 before:bg-mark"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={inView}
                      transition={{ duration: 0.8, ease, delay: 0.2 + j * 0.08 }}
                    >
                      {p}
                    </motion.li>
                  ))}
                </ul>
                <div className="relative mt-7 grid gap-4 border-t border-line pt-[26px]">
                  {job.stack.map((g) => (
                    <div
                      key={g.label}
                      className="grid grid-cols-[150px_minmax(0,1fr)] items-start gap-5 max-md:grid-cols-1 max-md:gap-2.5"
                    >
                      <p className="pt-2 font-mono text-[12px] leading-[1.2] tracking-[0.1em] text-accent-text uppercase max-md:pt-0">
                        {g.label}
                      </p>
                      <ul className={tags}>
                        {g.items.map((t) => (
                          <li key={t} className={tag}>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
