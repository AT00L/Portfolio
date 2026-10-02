import { motion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { experience } from '../data'
import { ease } from '../motion'
import { ArrowIcon } from './Icons'
import SectionHead from './SectionHead'

const inView = { once: true, margin: '-10% 0px' }

export default function Experience() {
  const ref = useRef(null)
  // The rail fills in as the timeline scrolls through the viewport.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section id="experience" className="section experience">
      <div className="wrap">
        <SectionHead index="03" label="Experience" title="Where I ship." />

        <div className="timeline" ref={ref}>
          <span
            className="timeline__rail"
            style={{ gridRow: `1 / ${experience.length + 1}` }}
            aria-hidden="true"
          >
            <motion.span style={{ scaleY: fill }} />
          </span>

          {experience.map((job, i) => (
            <div key={job.company} className="tl-item" style={{ '--row': i + 1 }}>
              <motion.div
                className="tl-meta"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={inView}
                transition={{ duration: 1, ease }}
              >
                {job.current && <span className="badge">Current</span>}
                <p className="tl-meta__period">{job.period}</p>
                <p className="tl-meta__years" aria-hidden="true">
                  {String(job.years).padStart(2, '0')}
                  <span>yrs</span>
                </p>
              </motion.div>

              <div className={`tl-node ${job.current ? 'is-current' : ''}`} aria-hidden="true">
                {job.company.charAt(0)}
              </div>

              <motion.article
                className="tl-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 1.1, ease }}
              >
                <p className="tl-card__period">
                  {job.current && <span className="badge">Current</span>}
                  {job.period}
                </p>
                <h3 className="job__company">
                  <a href={job.url} target="_blank" rel="noreferrer" data-cursor="Visit">
                    {job.company}
                    <ArrowIcon size={28} />
                  </a>
                </h3>
                <p className="job__role">{job.role}</p>
                <ul className="job__points">
                  {job.points.map((p, j) => (
                    <motion.li
                      key={p}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={inView}
                      transition={{ duration: 0.8, ease, delay: 0.2 + j * 0.08 }}
                    >
                      {p}
                    </motion.li>
                  ))}
                </ul>
                <ul className="tags">
                  {job.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
