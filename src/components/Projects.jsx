import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { claudeCredit, projectFilters, projects } from '../data'
import useMediaQuery from '../useMediaQuery'
import { ArrowIcon, GitHubIcon, SparkIcon } from './Icons'
import ProjectVisual from './ProjectVisual'
import RollText from './RollText'
import SectionHead from './SectionHead'

// Cards pin and stack only where a whole card fits on screen; elsewhere they simply flow.
const STACK_QUERY = '(min-width: 961px) and (min-height: 760px)'

const countFor = (filter) =>
  filter === 'All' ? projects.length : projects.filter((p) => p.categories.includes(filter)).length

// Only offer filters that at least one project uses.
const filters = projectFilters.filter((f) => countFor(f) > 0)

export default function Projects() {
  const stacked = useMediaQuery(STACK_QUERY)
  const [filter, setFilter] = useState('All')
  const shown = filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter))

  return (
    <section id="work" className="section work">
      <div className="wrap">
        <SectionHead index="04" label="Selected work" title="Things I’ve built.">
          <div className="tabs" role="group" aria-label="Filter projects">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                className={`tab ${filter === f ? 'is-active' : ''}`}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {filter === f && (
                  <motion.span
                    layoutId="tab-pill"
                    className="tab__pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="tab__label">{f}</span>
                <span className="tab__count">{countFor(f)}</span>
              </button>
            ))}
          </div>
        </SectionHead>
        {/* Re-keyed per filter so the stack re-measures its scroll range and the cards animate in. */}
        <Stack key={filter} items={shown} stacked={stacked} />
      </div>
    </section>
  )
}

function Stack({ items, stacked }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <div className={`stack ${stacked ? 'is-stacked' : ''}`} ref={ref}>
      {items.map((p, i) => (
        <Card
          key={p.id}
          project={p}
          index={i}
          total={items.length}
          progress={scrollYProgress}
          stacked={stacked}
        />
      ))}
    </div>
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
            <span className="card__num">
              {String(projects.indexOf(p) + 1).padStart(2, '0')}
            </span>
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
