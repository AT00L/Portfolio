import { motion } from 'motion/react'
import { skills } from '../data'
import { ease } from '../motion'
import { CapIcon } from './Icons'
import SectionHead from './SectionHead'
import SkillChip from './SkillChip'

const box = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: (i % 3) * 0.08 } }),
}

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03, delayChildren: 0.2 } },
}

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="wrap">
        <SectionHead index="02" label="Skills" title="What I work with." />
        <div className="skills__grid">
          {skills.map((g, i) => (
            <motion.article
              key={g.title}
              className="skill-box"
              variants={box}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-8% 0px' }}
            >
              <header className="skill-box__head">
                <span className="skill-box__icon" aria-hidden="true">
                  <CapIcon name={g.icon} />
                </span>
                <h3>{g.title}</h3>
                <span className="skill-box__count" aria-hidden="true">
                  {String(g.items.length).padStart(2, '0')}
                </span>
              </header>
              <p className="skill-box__blurb">{g.blurb}</p>
              <motion.ul className="chips" variants={list}>
                {g.items.map((s) => (
                  <SkillChip key={s.name} {...s} />
                ))}
              </motion.ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
