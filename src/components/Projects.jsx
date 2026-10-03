import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { claudeCredit, projectFilters, projects } from '../data'
import { btn, btnAccent, btnGhost, btnSm, section, tag, tags } from '../ui'
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
    <section id="work" className={section}>
      <div className="wrap">
        <SectionHead index="04" label="Selected work" title="Things I’ve built.">
          <div
            className="flex flex-wrap gap-1 rounded-full border border-line bg-chip p-[5px] max-sm:max-w-full max-sm:flex-nowrap max-sm:overflow-x-auto max-sm:[scrollbar-width:none]"
            role="group"
            aria-label="Filter projects"
          >
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                className={`relative isolate inline-flex h-[38px] shrink-0 items-center gap-2 rounded-full px-4 text-[14px] font-medium transition-colors duration-300 ${
                  filter === f ? 'text-page' : 'text-fg-2 hover:text-fg'
                }`}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {filter === f && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 -z-1 rounded-[inherit] bg-fg"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span>{f}</span>
                <span className="font-mono text-[11px] leading-[normal] font-medium opacity-60">
                  {countFor(f)}
                </span>
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
    <div className={`flex flex-col ${stacked ? 'gap-[14vh]' : 'gap-5'}`} ref={ref}>
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
      className={stacked ? 'sticky top-[calc(var(--nav-h)_+_28px_+_var(--i)*22px)]' : undefined}
      style={{ '--i': index }}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.article
        className={`group/card relative isolate grid origin-top grid-cols-[1fr_1.15fr] gap-[clamp(24px,4vw,56px)] overflow-hidden rounded-(--radius) border border-line bg-card p-[clamp(22px,3.2vw,44px)] [box-shadow:var(--card-shadow)] before:absolute before:inset-0 before:-z-1 before:bg-[radial-gradient(520px_circle_at_var(--mx,50%)_var(--my,50%),var(--spot),transparent_45%)] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100 max-xl:grid-cols-1 ${
          stacked ? 'min-h-[min(580px,calc(100svh_-_var(--nav-h)_-_140px))]' : ''
        }`}
        ref={ref}
        style={{ scale: stacked ? scale : 1 }}
        onPointerMove={onMove}
      >
        <div className="flex min-h-0 flex-col">
          <div className="flex justify-between font-mono text-[13px] leading-[normal] tracking-[0.08em] text-muted uppercase">
            <span className="text-accent-text">
              {String(projects.indexOf(p) + 1).padStart(2, '0')}
            </span>
            <span>{p.kind}</span>
          </div>
          <h3 className="pt-7 text-[clamp(2rem,3.8vw,3.5rem)] leading-none font-semibold tracking-[-0.045em] max-xl:pt-[18px]">
            {p.name}
          </h3>
          <p className="mt-4 max-w-[48ch] text-[clamp(0.97rem,1.05vw,1.05rem)] text-fg-2">{p.blurb}</p>
          <ul className={`${tags} mt-5`}>
            {p.tags.map((t) => (
              <li key={t} className={tag}>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              className={`${btn} ${btnSm} ${btnGhost}`}
            >
              <GitHubIcon />
              <RollText text="Source" />
            </a>
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className={`${btn} ${btnSm} ${btnAccent}`}
              >
                <RollText text={p.liveLabel ?? 'Live site'} />
                <ArrowIcon />
              </a>
            )}
          </div>
          {p.madeWithClaude && (
            <p className="mt-[26px] flex items-center gap-3 border-t border-line pt-5">
              <span
                className="grid size-9 place-items-center rounded-full border border-accent-line bg-accent-soft text-accent-text"
                aria-hidden="true"
              >
                <SparkIcon className="transition-transform duration-[800ms] ease-smooth group-hover/card:rotate-90" />
              </span>
              <span>
                <span className="block font-mono text-[11px] leading-[1.2] font-medium tracking-[0.1em] text-accent-text uppercase">
                  {claudeCredit.label}
                </span>
                <span className="mt-[5px] block text-[15px] text-fg">{claudeCredit.note}</span>
              </span>
            </p>
          )}
        </div>

        <a
          className="stage relative grid min-h-0 min-w-0 grid-cols-[minmax(0,1fr)] overflow-hidden rounded-[20px] border border-line bg-[#141416] bg-[radial-gradient(circle_at_80%_0%,rgba(212,255,58,0.1),transparent_50%)] max-xl:-order-1 max-xl:h-[300px] max-sm:h-[260px]"
          href={primary}
          target="_blank"
          rel="noreferrer"
          tabIndex={-1}
          aria-hidden="true"
          data-cursor={p.live ? (p.liveCursor ?? 'Visit') : 'Code'}
        >
          <ProjectVisual kind={p.visual} />
        </a>

        {stacked && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-5 rounded-[inherit] bg-shade"
            style={{ opacity: shade }}
            aria-hidden="true"
          />
        )}
      </motion.article>
    </motion.div>
  )
}
