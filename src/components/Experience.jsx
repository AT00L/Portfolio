import { motion } from 'motion/react'
import { capabilities, experience } from '../data'
import { ease } from '../motion'
import { ArrowIcon, CapIcon } from './Icons'
import SectionHead from './SectionHead'

const inView = { once: true, margin: '-10% 0px' }

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="wrap">
        <SectionHead index="03" label="Experience" title="Where I ship." />

        <ol className="jobs">
          {experience.map((job) => (
            <motion.li
              key={job.company}
              className="job"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 1.1, ease }}
            >
              <div className="job__head">
                <div>
                  <p className="job__period">
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
                </div>
                <p className="job__years" aria-hidden="true">
                  {String(job.years).padStart(2, '0')}
                  <span>yrs</span>
                </p>
              </div>
              <ul className="job__points">
                {job.points.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={inView}
                    transition={{ duration: 0.8, ease, delay: 0.2 + i * 0.08 }}
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
            </motion.li>
          ))}
        </ol>

        <div className="caps">
          {capabilities.map((c, i) => (
            <motion.article
              key={c.title}
              className="cap"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 1, ease, delay: i * 0.1 }}
            >
              <div className="cap__top">
                <span className="cap__icon">
                  <CapIcon name={c.icon} />
                </span>
                <span className="cap__num">0{i + 1}</span>
              </div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <ul className="tags">
                {c.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
