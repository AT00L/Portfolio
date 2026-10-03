import { motion } from 'motion/react'
import { skills } from '../data'
import { ease } from '../motion'
import { section } from '../ui'
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

// Three boxes on the first row and two wider ones under them; two per row on
// tablets (an odd last one goes full width); one per row on phones.
function span(i, count) {
  const tablet = i === count - 1 && count % 2 === 1 ? 'max-2xl:col-span-full' : 'max-2xl:col-span-3'
  return `${i < 3 ? 'col-span-2' : 'col-span-3'} ${tablet} max-sm:col-span-full`
}

export default function Skills() {
  return (
    <section id="skills" className={section}>
      <div className="wrap">
        <SectionHead index="02" label="Skills" title="What I work with." />
        <div className="grid grid-cols-6 gap-5">
          {skills.map((g, i) => (
            <motion.article
              key={g.title}
              className={`${span(i, skills.length)} flex flex-col gap-3.5 rounded-3xl border border-line bg-card p-[26px] [box-shadow:var(--soft-shadow)] max-sm:p-[22px]`}
              variants={box}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-8% 0px' }}
            >
              <header className="flex items-center gap-3">
                <span
                  className="grid size-10 place-items-center rounded-xl border border-line-2 text-accent-text"
                  aria-hidden="true"
                >
                  <CapIcon name={g.icon} />
                </span>
                <h3 className="flex-1 text-[22px] font-semibold tracking-[-0.03em]">{g.title}</h3>
                <span className="font-mono text-[12px] leading-[normal] text-muted" aria-hidden="true">
                  {String(g.items.length).padStart(2, '0')}
                </span>
              </header>
              <p className="max-w-[46ch] text-[15px] text-fg-2">{g.blurb}</p>
              <motion.ul className="mt-1.5 flex flex-wrap gap-2" variants={list}>
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
