import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { claudeCredit, projects } from '../data'
import useMediaQuery from '../useMediaQuery'
import { ArrowIcon, GitHubIcon, SparkIcon } from './Icons'
import ProjectVisual from './ProjectVisual'
import RollText from './RollText'
import SectionHead from './SectionHead'

// Cards pin and stack only where a whole card fits on screen; elsewhere they simply flow.
const STACK_QUERY = '(min-width: 961px) and (min-height: 760px)'

export default function Projects() {
  const ref = useRef(null)
  const stacked = useMediaQuery(STACK_QUERY)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section id="work" className="section work">
      <div className="wrap">
        <SectionHead index="02" label="Selected work" title="Things I’ve built." />
        <div className={`stack ${stacked ? 'is-stacked' : ''}`} ref={ref}>
          {projects.map((p, i) => (
            <Card
              key={p.id}
              project={p}
              index={i}
              total={projects.length}
              progress={scrollYProgress}
              stacked={stacked}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function Card({ project: p, index, total, progress, stacked }) {
  const ref = useRef(null)
  // Cards underneath shrink and darken slightly as the next one stacks on top.
  const depth = total - 1 - index
  const scale = useTransform(progress, [index / total, 1], [1, 1 - depth * 0.045])
  const shade = useTransform(progress, [index / total, 1], [0, depth * 0.18])

  // Spotlight position is written straight to CSS vars — no re-render per mouse move.
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  const primary = p.live ?? p.repo

  return (
    <motion.div
      className="stack__item"
      style={{ '--i': index }}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.article
        className="card"
        ref={ref}
        style={{ scale: stacked ? scale : 1 }}
        onPointerMove={onMove}
      >
        <div className="card__info">
          <div className="card__top">
            <span className="card__num">{String(index + 1).padStart(2, '0')}</span>
            <span className="card__kind">{p.kind}</span>
          </div>
          <h3 className="card__title">{p.name}</h3>
          <p className="card__blurb">{p.blurb}</p>
          <ul className="tags">
            {p.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className="card__links">
            <a href={p.repo} target="_blank" rel="noreferrer" className="btn btn--sm hover-roll">
              <GitHubIcon />
              <RollText text="Source" />
            </a>
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className="btn btn--sm btn--accent hover-roll"
              >
                <RollText text={p.liveLabel ?? 'Live site'} />
                <ArrowIcon />
              </a>
            )}
          </div>
          {p.madeWithClaude && (
            <p className="credit">
              <span className="credit__icon" aria-hidden="true">
                <SparkIcon />
              </span>
              <span>
                <span className="credit__label">{claudeCredit.label}</span>
                <span className="credit__note">{claudeCredit.note}</span>
              </span>
            </p>
          )}
        </div>

        <a
          className="card__visual"
          href={primary}
          target="_blank"
          rel="noreferrer"
          tabIndex={-1}
          aria-hidden="true"
          data-cursor={p.live ? (p.liveCursor ?? 'Visit') : 'Code'}
        >
          <ProjectVisual kind={p.visual} />
        </a>

        {stacked && <motion.div className="card__shade" style={{ opacity: shade }} aria-hidden="true" />}
      </motion.article>
    </motion.div>
  )
}
