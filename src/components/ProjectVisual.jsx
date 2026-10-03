import { useAnimationFrame, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { dot } from '../ui'

// Syntax colours for the little code snippets.
const code = {
  sel: 'text-[#ff9ecb]',
  prop: 'text-[#8ec5ff]',
  val: 'text-mark',
  kw: 'text-[#c792ea]',
  fn: 'text-[#82aaff]',
  dir: 'text-[#8ec5ff]',
  dim: 'text-muted',
}

const column = 'flex w-[min(100%,460px)] flex-col gap-3.5'
const darkWell = 'rounded-[14px] border border-line-2 bg-[#0b111c]'
const greyWell = 'rounded-[14px] border border-line-2 bg-[#151c2a]'

// Small, code-drawn previews of each project. Purely decorative.
export default function ProjectVisual({ kind }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '0px 0px -10% 0px' })
  const View = views[kind]
  return (
    <div
      className="grid size-full grid-cols-[minmax(0,1fr)] place-items-center p-[clamp(18px,3vw,36px)] transition-transform duration-[900ms] ease-smooth group-hover/card:scale-[1.03]"
      ref={ref}
    >
      <View live={inView} />
    </div>
  )
}

const skeleton = 'rounded-md bg-[#263042]'
const windowDot = 'size-[9px] rounded-full bg-[#334155]'

function Injector() {
  return (
    <div className="relative mb-[14%] ml-[8%] w-[min(100%,440px)] rounded-[14px] border border-line-2 bg-[#1a2130] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
      <div className="flex h-[34px] items-center gap-1.5 border-b border-line px-3">
        <i className={windowDot} />
        <i className={windowDot} />
        <i className={windowDot} />
        <span className="ml-2.5 flex-1 rounded-md bg-[#0f1520] px-2.5 font-mono text-[10.5px] leading-[20px] text-muted">
          shop.example.com
        </span>
      </div>
      <div className="flex flex-col gap-3.5 px-4 pt-4 pb-[22px]">
        <div className={`${skeleton} h-3 w-[55%]`} />
        <div className="grid grid-cols-[1fr_1.15fr] gap-3.5">
          <div className="aspect-square rounded-[10px] bg-[linear-gradient(135deg,#2a3446,#1e2636)]" />
          <div className="flex flex-col gap-2">
            <div className={`${skeleton} h-[15px] w-[85%]`} />
            <div className={`${skeleton} h-2`} />
            <div className={`${skeleton} h-2 w-[60%]`} />
            <div className="relative mt-auto grid h-[34px] animate-restyle place-items-center rounded-lg bg-[#2a3446] font-sans text-[12px] leading-[normal] font-semibold text-[#cbd5e1] outline-[1.5px] outline-offset-[3px] outline-mark outline-dashed">
              Add to cart
              <span className="absolute -top-[27px] -left-1 max-w-[calc(100%_+_8px)] overflow-hidden rounded-[4px] bg-accent px-1.5 py-1 font-mono text-[9.5px] leading-none font-medium text-ellipsis whitespace-nowrap text-ink">
                button#add-to-cart · 148×44
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-[18%] -left-[10%] w-1/2 min-w-[190px] rounded-xl border border-line-2 bg-[#121a28] p-3.5 font-mono text-[11px] leading-[1.65] shadow-[0_24px_50px_-10px_rgba(0,0,0,0.85)]">
        <p className="mb-2 flex items-center gap-2 font-sans text-[10.5px] leading-[normal] font-semibold tracking-[0.08em] uppercase">
          <span className={`${dot} size-1.5`} /> Custom CSS
        </p>
        <pre className="[font:inherit] text-fg-2">
          <span className={code.sel}>&amp;</span> {'{'}
          {'\n  '}
          <span className={code.prop}>background</span>: <span className={code.val}>#2563eb</span>;
          {'\n  '}
          <span className={code.prop}>border-radius</span>: <span className={code.val}>999px</span>;
          {'\n'}
          {'}'}
        </pre>
        <span className="mt-2.5 inline-block rounded-md bg-fg px-2.5 py-[5px] font-sans text-[10px] leading-[normal] font-semibold text-page">
          Save rule ⌘↵
        </span>
      </div>
    </div>
  )
}

const cell = '[&>span]:overflow-hidden [&>span]:text-ellipsis [&>span]:whitespace-nowrap [&>span:last-child]:text-right [&>span:last-child]:tabular-nums'
const row = `grid grid-cols-[1fr_1.35fr_0.55fr] gap-2.5 px-4 py-3 ${cell}`

function Shortener({ live }) {
  const [clicks, setClicks] = useState(128)

  useEffect(() => {
    if (!live) return
    const id = setInterval(() => setClicks((c) => c + 1), 1400)
    return () => clearInterval(id)
  }, [live])

  return (
    <div className={column}>
      <div
        className={`${darkWell} overflow-hidden px-[18px] py-4 font-mono text-[11.5px] leading-[1.75] whitespace-nowrap max-sm:text-[10.5px]`}
      >
        <p>
          <b className="font-medium text-mark">$</b> curl -sI localhost:8000/PPBqWA9
        </p>
        <p className="text-[#7ee787]">HTTP/1.1 302 Found</p>
        <p className={code.dim}>location: https://github.com/AT00L</p>
      </div>
      <div className={`${greyWell} overflow-hidden font-mono text-[12px] leading-[normal]`}>
        <div className={`${row} text-[10.5px] tracking-[0.08em] text-muted uppercase`}>
          <span>Short</span>
          <span>Destination</span>
          <span>Clicks</span>
        </div>
        <div className={`${row} border-t border-line bg-[rgba(96,165,250,0.08)] text-fg`}>
          <span className="text-mark">/PPBqWA9</span>
          <span>github.com/AT00L</span>
          <span key={clicks} className="animate-bump">
            {clicks}
          </span>
        </div>
        <div className={`${row} border-t border-line text-fg-2`}>
          <span>/x7Kp2-q</span>
          <span>linkedin.com/…</span>
          <span>64</span>
        </div>
        <div className={`${row} border-t border-line text-fg-2`}>
          <span>/Qm_r81Z</span>
          <span>docs.google.com/…</span>
          <span>31</span>
        </div>
      </div>
    </div>
  )
}

const node = 'shrink-0 rounded-lg border px-3 py-2 font-mono text-[11.5px] leading-[normal] font-medium bg-[#1e2738]'
const wire = 'relative mx-2 h-px min-w-6 flex-1 bg-line-2'
// A dot that travels along a wire; the second wire starts half a cycle later.
const packet =
  'absolute top-[-2.5px] right-1.5 left-0 h-1.5 animate-packet before:absolute before:top-0 before:left-0 before:size-1.5 before:rounded-full before:bg-mark before:shadow-[0_0_10px_var(--mark)]'

function Monorepo() {
  return (
    <div className={column}>
      <pre
        className={`${darkWell} overflow-hidden px-5 py-[18px] font-mono text-[12px] leading-[1.85] text-fg-2 max-sm:text-[10.5px]`}
      >
        <span className={code.dir}>yourlabtest/</span>
        {'\n├── '}
        <span className={code.dir}>packages/</span>
        {'\n│   ├── '}
        <span className={code.dir}>web/</span>
        {'      '}
        <span className={code.dim}>React · MUI · Tailwind</span>
        {'\n│   └── '}
        <span className={code.dir}>server/</span>
        {'   '}
        <span className={code.dim}>Express 5 · MongoDB</span>
        {'\n└── package.json  '}
        <span className={code.dim}>workspaces</span>
      </pre>
      <div className={`${greyWell} flex items-center px-4 pt-[30px] pb-5`}>
        <span className={`${node} border-line-2`}>web</span>
        <span className={wire}>
          <em className="absolute bottom-[9px] left-1/2 -translate-x-1/2 font-mono text-[9.5px] leading-[normal] font-normal whitespace-nowrap text-muted not-italic">
            GET /product
          </em>
          <i className={packet} />
        </span>
        <span className={`${node} border-line-2`}>server</span>
        <span className={wire}>
          <i className={`${packet} [animation-delay:1.2s]`} />
        </span>
        <span className={`${node} border-[rgba(126,231,135,0.4)] text-[#7ee787]`}>MongoDB</span>
      </div>
    </div>
  )
}

const BARS = 28

// A real frame-rate meter for this page.
function Portfolio({ live }) {
  const [fps, setFps] = useState(60)
  const [bars, setBars] = useState(() => Array(BARS).fill(60))
  const acc = useRef({ frames: 0, time: 0 })

  useAnimationFrame((_, delta) => {
    if (!live) return
    const a = acc.current
    a.frames += 1
    a.time += delta
    if (a.time >= 250) {
      const value = Math.min(120, Math.round((a.frames * 1000) / a.time))
      a.frames = 0
      a.time = 0
      setFps(value)
      setBars((b) => [...b.slice(1), value])
    }
  })

  const peak = Math.max(60, ...bars)

  return (
    <div className={column}>
      <div className="flex items-end gap-3.5">
        <span className="text-[clamp(4.5rem,8vw,7rem)] leading-[0.8] font-semibold tracking-[-0.06em] text-mark tabular-nums">
          {fps}
        </span>
        <span className="flex flex-col gap-1 pb-1 text-[20px] font-medium">
          fps
          <small className="font-mono text-[11px] leading-[normal] font-normal text-muted">
            measured live, right now
          </small>
        </span>
      </div>
      <div className={`${darkWell} flex h-24 items-stretch gap-1 p-3.5`} aria-hidden="true">
        {bars.map((b, i) => (
          <i
            key={i}
            className="flex-1 origin-bottom rounded-[2px] bg-[linear-gradient(to_top,rgba(96,165,250,0.2),var(--mark))] transition-transform duration-250 ease-linear"
            style={{ transform: `scaleY(${b / peak})` }}
          />
        ))}
      </div>
      <pre
        className={`${greyWell} overflow-hidden px-4 py-3.5 font-mono text-[12px] leading-[normal] whitespace-nowrap text-fg-2 max-sm:text-[10.5px]`}
      >
        <span className={code.kw}>const</span> lenis = <span className={code.kw}>new</span>{' '}
        <span className={code.fn}>Lenis</span>({'{ '}
        <span className={code.prop}>autoRaf</span>: <span className={code.val}>true</span>
        {' })'}
      </pre>
    </div>
  )
}

const views = {
  injector: Injector,
  shortener: Shortener,
  monorepo: Monorepo,
  portfolio: Portfolio,
}
