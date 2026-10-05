import { useAnimationFrame, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

// Syntax colours for the code snippet in the Portfolio preview.
const code = {
  prop: 'text-[#8ec5ff]',
  val: 'text-mark',
  kw: 'text-[#c792ea]',
  fn: 'text-[#82aaff]',
}

const column = 'flex w-[min(100%,460px)] flex-col gap-3.5'
const darkWell = 'rounded-[14px] border border-line-2 bg-[#0b111c]'
const greyWell = 'rounded-[14px] border border-line-2 bg-[#151c2a]'

// Small, code-drawn copies of each project's real UI. Purely decorative.
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

// One 24×24 icon path (Material icons, as the projects use). Size and fill come from classes.
function Glyph({ d, className }) {
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`}>
      <path d={d} />
    </svg>
  )
}

const icons = {
  search:
    'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  brush:
    'M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3m13.71-9.37-1.34-1.34a.996.996 0 0 0-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41',
  flask:
    'M19.8 18.4 14 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H9.04c-.42 0-.65.48-.39.81L10 6.5v4.17L4.2 18.4c-.49.66-.02 1.6.8 1.6h14c.82 0 1.29-.94.8-1.6',
  heart:
    'M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3m-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05',
  filter: 'M10 18h4v-2h-4zM3 6v2h18V6zm3 7h12v-2H6z',
  expand: 'M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z',
}

const systemFont = "[font-family:-apple-system,BlinkMacSystemFont,'Segoe_UI',system-ui,sans-serif]"
const appWindow = 'w-[min(100%,540px)] overflow-hidden rounded-[12px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]'

const skeleton = 'rounded-md bg-[#263042]'
const windowDot = 'size-[9px] rounded-full bg-[#334155]'

// The extension's own UI: the picker's outline, label and bottom bar (content/picker.js),
// and the popup in its dark theme (popup/popup.css). It plays the real flow on a loop:
// pick an element, write CSS for it in the popup, and see it applied.
const STEPS = [
  ['pick', 2400],
  ['edit', 2800],
  ['saved', 2400],
]

const popupBtn = 'rounded-[4px] border px-2 py-[3px] text-[9.5px] leading-none'

// The page's "Add to cart" button: outlined by the picker, then restyled once the rule is saved.
function Cart({ step, fade }) {
  return (
    <div className="relative mt-auto">
      <div
        className={`grid h-[32px] place-items-center text-[12px] leading-none font-semibold transition-[background-color,color,border-radius] duration-500 max-sm:h-7 max-sm:text-[11px] ${
          step === 'saved' ? 'rounded-[999px] bg-[#2563eb] text-white' : 'rounded-lg bg-[#2a3446] text-[#cbd5e1]'
        }`}
      >
        Add to cart
      </div>
      {/* The picker's outline, and its label under the element: selector, then size. */}
      <div className={`pointer-events-none absolute -inset-[3px] ${fade(step === 'pick')}`}>
        <div className="size-full rounded-[2px] border-2 border-[#2f6feb] bg-[rgba(47,111,235,0.14)]" />
        <span className="absolute top-[calc(100%+4px)] left-0 rounded-[3px] bg-[#2f6feb] px-1.5 py-[2px] text-[9.5px] leading-[1.45] font-medium whitespace-nowrap text-white shadow-[0_1px_4px_rgba(0,0,0,0.35)]">
          button#add-to-cart.btn<span className="font-normal opacity-75">{'  '}148 × 44</span>
        </span>
      </div>
    </div>
  )
}

function Injector({ live }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!live) return
    const id = setTimeout(() => setStep((s) => (s + 1) % STEPS.length), STEPS[step][1])
    return () => clearTimeout(id)
  }, [live, step])

  const [now] = STEPS[step]
  const fade = (on) => `transition-opacity duration-300 ${on ? 'opacity-100' : 'opacity-0'}`

  return (
    <div className={`${appWindow} ${systemFont} border border-line-2 bg-[#1a2130]`}>
      <div className="flex h-[34px] items-center gap-1.5 border-b border-line px-3">
        <i className={windowDot} />
        <i className={windowDot} />
        <i className={windowDot} />
        <span className="ml-2.5 flex-1 rounded-md bg-[#0f1520] px-2.5 font-mono text-[10.5px] leading-[20px] text-muted">
          shop.example.com
        </span>
        {/* The toolbar icon; after a pick it shows a "1" badge until the rule is saved. */}
        <span className="relative ml-1 grid size-[22px] place-items-center rounded-[5px] bg-[#263042]">
          <Glyph d={icons.brush} className="size-3.5 fill-[#cbd5e1]" />
          <b
            className={`absolute -top-1 -right-1 grid size-3 place-items-center rounded-full bg-[#2f6feb] text-[7.5px] leading-none text-white ${fade(now === 'edit')}`}
          >
            1
          </b>
        </span>
      </div>

      <div className="relative h-[290px] max-sm:h-[190px]">
        <div className="flex w-[56%] flex-col gap-3.5 px-4 pt-4 max-sm:w-full max-sm:gap-2.5 max-sm:px-3 max-sm:pt-3">
          <div className={`${skeleton} h-3 w-[60%]`} />
          <div className="grid grid-cols-[1fr_1.15fr] gap-3.5 max-sm:w-[58%] max-sm:grid-cols-1 max-sm:gap-2">
            <div className="aspect-square rounded-[10px] bg-[linear-gradient(135deg,#2a3446,#1e2636)] max-sm:hidden" />
            <div className="flex flex-col gap-2">
              <div className={`${skeleton} h-[13px] w-[85%]`} />
              <div className={`${skeleton} h-2`} />
              <div className={`${skeleton} h-2 w-[60%]`} />
              <Cart step={now} fade={fade} />
            </div>
          </div>
          <div className="flex flex-col gap-2 max-sm:hidden">
            <div className={`${skeleton} h-2`} />
            <div className={`${skeleton} h-2 w-[80%]`} />
          </div>
        </div>

        {/* The picker's bar along the bottom: a clickable breadcrumb and the keys. */}
        <div
          className={`absolute inset-x-0 bottom-0 flex flex-col gap-1.5 border-t border-white/15 bg-[rgba(24,26,30,0.96)] px-3 py-2 text-[9.5px] text-[#e8eaed] ${fade(now === 'pick')}`}
        >
          <div className="flex flex-wrap items-center gap-[3px] font-mono text-[9px]">
            {['body', 'main', 'div.product', 'button#add-to-cart.btn'].map((c, i, all) => (
              <span key={c} className="contents">
                {i > 0 && <span className="opacity-50">›</span>}
                <span
                  className={`rounded-[3px] border px-1.5 py-px ${
                    i === all.length - 1 ? 'border-[#7aa2f7] bg-[#2f6feb] text-white' : 'border-transparent bg-white/10'
                  }`}
                >
                  {c}
                </span>
              </span>
            ))}
          </div>
          <div className="flex gap-3.5 opacity-70 max-sm:hidden">
            {[
              ['click', 'select'],
              ['↑↓', 'parent / child'],
              ['←→', 'sibling'],
              ['esc', 'cancel'],
            ].map(([k, v]) => (
              <span key={k}>
                <b className="font-semibold">{k}</b> {v}
              </span>
            ))}
          </div>
        </div>

        {/* The popup, opened from the toolbar icon once an element is picked. */}
        <div
          className={`absolute top-1.5 right-2.5 w-[230px] rounded-[7px] border border-[#30363d] bg-[#1c1f24] pb-2 text-[10px] text-[#e6edf3] shadow-[0_18px_40px_-8px_rgba(0,0,0,0.8)] max-sm:top-1 max-sm:right-1.5 max-sm:w-[150px] ${fade(now === 'edit')}`}
        >
          <div className="flex items-baseline gap-1.5 border-b border-[#30363d] px-2 py-1.5">
            <strong className="text-[10px] whitespace-nowrap">Custom CSS Injector</strong>
            <span className="truncate font-mono text-[8.5px] text-[#9198a1] max-sm:hidden">shop.example.com</span>
          </div>
          <div className="flex gap-1.5 px-2 pt-2 max-sm:hidden">
            <span className={`${popupBtn} border-transparent bg-[#4d84f5] font-medium text-white`}>Pick element</span>
            <span className={`${popupBtn} border-[#30363d] text-[#e6edf3]`}>this hostname ▾</span>
          </div>
          <div className="mx-2 mt-2 rounded-[5px] border border-[#30363d] bg-[#22262c] p-2">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[8px] font-semibold tracking-[0.04em] text-[#9198a1] uppercase">Selected element</span>
              <span className="text-[8.5px] text-[#4d84f5] underline max-sm:hidden">discard</span>
            </div>
            <code className="block truncate rounded-[4px] border border-[#30363d] bg-[#1c1f24] px-1.5 py-1 font-mono text-[9px]">
              {'<button> #add-to-cart .btn'}
            </code>
            <span className="mt-1 inline-block rounded-full border border-[#3fb950]/45 bg-[#1c1f24] px-1.5 text-[8px] leading-[14px] text-[#3fb950] max-sm:hidden">
              unique id: add-to-cart
            </span>
            <pre className="mt-1.5 rounded-[5px] border border-[#30363d] bg-[#1c1f24] px-1.5 py-1 font-mono text-[9px] leading-[1.5] text-[#e6edf3]">
              {'background: #2563eb;\ncolor: #fff;\nborder-radius: 999px;'}
            </pre>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className={`${popupBtn} border-transparent bg-[#4d84f5] font-medium text-white`}>Save rule</span>
              <span className="text-[8.5px] text-[#9198a1] max-sm:hidden">⌘/Ctrl + Enter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// The app's dashboard in its dark theme (views/style.css and the table app.js renders).
const LINKS = [
  ['PPBqWA9', 'https://github.com/heyAtul', '04 Oct 2026'],
  ['x7Kp2-q', 'https://www.linkedin.com/in/atul-lilhare-27478b149', '03 Oct 2026'],
  ['Qm_r81Z', 'https://chromewebstore.google.com/detail/custom-css-injector', '01 Oct 2026'],
]
const linkRow =
  'grid grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)_30px_58px_30px] items-center gap-2.5 px-2.5 max-sm:grid-cols-[minmax(0,1fr)_30px]'
const linkBtn = 'text-[8.5px] font-semibold text-[#5b8dfb]'

function Shortener({ live }) {
  const [clicks, setClicks] = useState(128)

  useEffect(() => {
    if (!live) return
    const id = setInterval(() => setClicks((c) => c + 1), 1400)
    return () => clearInterval(id)
  }, [live])

  const counts = [clicks, 64, 31]
  const total = counts.reduce((a, b) => a + b)

  return (
    <div className={`${appWindow} ${systemFont} border border-[#2d313a] bg-[#15171c] p-3.5 text-[#e8eaed] max-sm:p-2.5`}>
      <div className="mb-3 flex items-center justify-between border-b border-[#2d313a] pb-2.5 max-sm:mb-2 max-sm:pb-2">
        <span className="text-[13px] leading-none font-bold tracking-[-0.02em]">
          URL<span className="text-[#5b8dfb]">Shorty</span>
        </span>
        <span className="grid size-6 place-items-center rounded-full bg-[#5b8dfb] text-[10px] font-bold text-[#0e1016]">
          A
        </span>
      </div>

      <div className="rounded-[8px] border border-[#2d313a] bg-[#1d2026] p-3 max-sm:p-2.5">
        <p className="text-[13px] leading-tight font-bold">Shorten a URL</p>
        <p className="mt-0.5 text-[9.5px] text-[#9aa1ad] max-sm:hidden">Paste a long link and get a short one back.</p>
        <p className="mt-2 text-[8.5px] font-semibold text-[#9aa1ad] max-sm:hidden">Destination URL</p>
        <div className="mt-1 flex gap-2 max-sm:mt-1.5">
          <span className="flex h-7 min-w-0 flex-1 items-center rounded-[5px] border border-[#2d313a] bg-[#15171c] px-2 text-[9.5px] text-[#9aa1ad]/70">
            <span className="truncate">https://example.com/a/very/long/path</span>
          </span>
          <span className="grid h-7 place-items-center rounded-[5px] bg-[#5b8dfb] px-3 text-[10px] font-semibold text-[#0e1016]">
            Shorten
          </span>
        </div>
      </div>

      <p className="mt-3.5 text-[11px] font-semibold max-sm:mt-2.5">Your links</p>
      <p className="mt-0.5 mb-2 text-[9px] text-[#9aa1ad] max-sm:mb-1.5">
        3 links · {total} clicks total
      </p>
      <div className="overflow-hidden rounded-[8px] border border-[#2d313a] bg-[#1d2026] text-[9.5px] leading-none">
        <div className={`${linkRow} py-2 text-[8px] font-semibold tracking-[0.03em] text-[#9aa1ad] uppercase`}>
          <span>Short URL</span>
          <span className="max-sm:hidden">Destination</span>
          <span className="text-right">Clicks</span>
          <span className="max-sm:hidden">Created</span>
        </div>
        {LINKS.map(([id, url, date], i) => (
          <div key={id} className={`${linkRow} border-t border-[#2d313a] py-2 ${i === 2 ? 'max-sm:hidden' : ''}`}>
            <span className="flex min-w-0 items-center gap-1.5">
              <span className="truncate text-[#5b8dfb] underline">https://url.atulcode.com/{id}</span>
              <span className={linkBtn}>Copy</span>
              <span className={`${linkBtn} underline`}>QR</span>
            </span>
            <span className="truncate text-[#9aa1ad] max-sm:hidden">{url}</span>
            <span key={counts[i]} className={`text-right tabular-nums ${i === 0 ? 'animate-bump' : ''}`}>
              {counts[i]}
            </span>
            <span className="whitespace-nowrap text-[#9aa1ad] max-sm:hidden">{date}</span>
            <span className="text-right text-[8.5px] font-semibold text-[#f2705a] max-sm:hidden">Delete</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// The site's category page (packages/web/src/CategoryPage.jsx): products grouped by
// brand, each with an "I'm Interested" vote. Brand and product names are placeholders.
const PRODUCTS = ['Whey Isolate · 1 kg', 'Whey Blend · 2 kg']
const indigoChip = 'rounded-full bg-[#eef2ff] px-1.5 py-[3px] text-[8px] leading-none font-semibold text-[#6366f1]'

function LabTest({ live }) {
  const [votes, setVotes] = useState([41, 27])

  useEffect(() => {
    if (!live) return
    let n = 0
    // Votes come in for both products, more often for the first.
    const id = setInterval(() => {
      n += 1
      const i = n % 3 === 0 ? 1 : 0
      setVotes((v) => v.map((x, j) => (j === i ? x + 1 : x)))
    }, 1300)
    return () => clearInterval(id)
  }, [live])

  return (
    <div className={`${appWindow} bg-[#f8fafc] [font-family:Roboto,Helvetica,Arial,sans-serif] text-[#1e293b]`}>
      <div className="flex items-center justify-between border-b border-[#e2e8f0] bg-white px-3.5 py-2.5">
        <span className="flex items-center gap-1.5">
          <span className="grid size-6 place-items-center rounded-[7px] bg-[linear-gradient(135deg,#6366f1_0%,#8b5cf6_100%)]">
            <Glyph d={icons.flask} className="size-3.5 fill-white" />
          </span>
          <span className="text-[12px] font-extrabold tracking-[-0.02em]">YourLabTest</span>
          <span className={`${indigoChip} text-[7px]`}>BETA</span>
        </span>
        <span className="flex items-center gap-2.5 text-[9px] font-medium text-[#64748b]">
          <span className="max-sm:hidden">How it Works</span>
          <span className="max-sm:hidden">Our Mission</span>
          <span className="rounded-[6px] bg-[#6366f1] px-2 py-1 font-semibold text-white">Join Community</span>
        </span>
      </div>

      <div className="border-b border-[#e2e8f0] bg-white px-3.5 py-3 max-sm:py-2">
        <p className="text-[18px] leading-tight font-extrabold tracking-[-0.03em] max-sm:text-[15px]">Whey Protein</p>
        <p className="mt-0.5 text-[9.5px] text-[#64748b]">Browse and vote for products in this category</p>
      </div>

      <div className="grid grid-cols-[30%_minmax(0,1fr)] items-start gap-2.5 p-3 max-sm:grid-cols-1 max-sm:p-2.5">
        <div className="rounded-[8px] border border-[#e2e8f0] bg-white p-2.5 max-sm:hidden">
          <p className="flex items-center gap-1 text-[10px] font-semibold">
            <Glyph d={icons.filter} className="size-3 fill-[#6366f1]" />
            Filters
          </p>
          <p className="mt-2 flex items-center gap-1 rounded-[6px] border border-[#e2e8f0] px-1.5 py-1 text-[8.5px] text-[#94a3b8]">
            <Glyph d={icons.search} className="size-2.5 fill-[#94a3b8]" />
            Search products...
          </p>
          <p className="mt-2.5 mb-1.5 text-[9px] font-semibold">Brands</p>
          {['Brand A', 'Brand B'].map((b) => (
            <p key={b} className="flex items-center gap-1.5 py-[3px] text-[9px] text-[#475569]">
              <i className="size-2.5 rounded-[2px] border-[1.5px] border-[#6366f1]" />
              {b}
            </p>
          ))}
        </div>

        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[8.5px] text-[#64748b]">
            <span className={indigoChip}>4 products</span>2 brands
          </p>
          <div className="mt-2 rounded-[8px] border border-[#e2e8f0] bg-white">
            <div className="flex items-center gap-2 px-2.5 py-2">
              <span className="text-[11px] font-bold">Brand A</span>
              <span className="rounded-full bg-[#f1f5f9] px-1.5 py-[3px] text-[7.5px] leading-none text-[#64748b]">
                2 products
              </span>
              <Glyph d={icons.expand} className="ml-auto size-3.5 rotate-180 fill-[#64748b]" />
            </div>
            <div className="grid grid-cols-2 gap-2 px-2.5 pb-2.5 max-sm:grid-cols-1 max-sm:gap-1.5">
              {PRODUCTS.map((name, i) => (
                <div key={name} className="rounded-[8px] border border-[#e2e8f0] bg-[#f8fafc] p-2 max-sm:py-1.5">
                  <p className="text-[9.5px] leading-tight font-bold">{name}</p>
                  <div className="mt-2 flex items-center justify-between border-t border-[#e2e8f0] pt-2 max-sm:mt-1.5 max-sm:pt-1.5">
                    <span className="flex items-center gap-[3px]">
                      <Glyph d={icons.heart} className="size-2.5 fill-[#6366f1]" />
                      <b key={votes[i]} className="animate-bump text-[9.5px] leading-none tabular-nums">
                        {votes[i]}
                      </b>
                      <span className="text-[7.5px] text-[#94a3b8]">interested</span>
                    </span>
                    <span className="rounded-full bg-[#6366f1] px-1.5 py-[3px] text-[7px] leading-none font-semibold whitespace-nowrap text-white">
                      I’m Interested
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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

// The Chat preview copies the real app's chat screen: WhatsApp Web's light colours
// (from the Chat repo's theme.js), its icons, and its layout.
const waIcons = {
  search: icons.search,
  back: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
  send: 'M2.01 21 23 12 2.01 3 2 10l15 2-15 2z',
  more: 'M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',
}

function WaIcon({ name, className = '' }) {
  return <Glyph d={waIcons[name]} className={`size-4 fill-[#54656f] ${className}`} />
}

function WaAvatar({ name, className = 'size-7 text-[12px]' }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-[#00a884] leading-none text-white ${className}`}
    >
      {name[0].toUpperCase()}
    </span>
  )
}

// New users are named after their email, so the app shows the email as the name too.
const CONTACTS = ['ayand@example.com', 'sahilramu@example.com']

// A conversation that plays on a loop: [text, is it mine].
const CHAT = [
  ['Did the deploy go through?', false],
  ['Yes, it’s live now', true],
  ['Nice, checking it out', false],
  ['Let me know how it looks', true],
  ['Looks great on my phone', false],
  ['Thanks!', true],
]
const SHOWN = 6

// The time inside a bubble, like the app's: "4:20 pm", a minute later for each message.
const clock = (n) => {
  const t = 16 * 60 + 20 + n
  const h = Math.floor(t / 60) % 24
  return `${h % 12 || 12}:${String(t % 60).padStart(2, '0')} ${h < 12 ? 'am' : 'pm'}`
}

// The tail is a small triangle in the bubble's top corner.
const bubble =
  'relative max-w-[82%] animate-pop rounded-[6px] px-2 pt-1 pb-[5px] text-[11px] leading-[15px] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] before:absolute before:top-0 before:size-0 before:border-b-[6px] before:border-b-transparent'
const bubbleIn = `${bubble} origin-top-left self-start rounded-tl-none bg-white before:-left-1.5 before:border-r-[6px] before:border-r-white`
const bubbleOut = `${bubble} origin-top-right self-end rounded-tr-none bg-[#d9fdd3] before:-right-1.5 before:border-l-[6px] before:border-l-[#d9fdd3]`
const waBar = 'flex h-10 shrink-0 items-center bg-[#f0f2f5] px-2.5'
const waName = 'truncate text-[11px] leading-[14px]'
const waEmail = 'truncate text-[9.5px] leading-[13px] text-[#667781]'

function Chat({ live }) {
  // `count` messages have been sent so far; the last SHOWN of them are on screen.
  const [count, setCount] = useState(SHOWN)

  useEffect(() => {
    if (!live) return
    const id = setInterval(() => setCount((c) => c + 1), 1800)
    return () => clearInterval(id)
  }, [live])

  const shown = Array.from({ length: SHOWN }, (_, i) => count - SHOWN + i)
  const [contact] = CONTACTS

  return (
    <div className="flex h-[300px] w-[min(100%,540px)] overflow-hidden rounded-[12px] bg-white [font-family:'Segoe_UI','Helvetica_Neue',Helvetica,Arial,sans-serif] text-[#111b21] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] max-sm:h-[210px]">
      {/* The chat list. As in the app on phones, small screens show only the open chat. */}
      <div className="flex w-[38%] shrink-0 flex-col border-r border-[#d1d7db] max-sm:hidden">
        <div className={`${waBar} justify-between`}>
          <WaAvatar name="Atul" />
          <WaIcon name="more" />
        </div>
        <div className="border-b border-[#e9edef] px-2 py-1.5">
          <div className="flex h-6 items-center gap-2 rounded-[6px] bg-[#f0f2f5] px-2 text-[9.5px] whitespace-nowrap text-[#667781]">
            <WaIcon name="search" className="size-3" />
            Search or start new chat
          </div>
        </div>
        {CONTACTS.map((c) => (
          <div key={c} className={`flex h-12 items-center gap-2 pl-2 ${c === contact ? 'bg-[#f0f2f5]' : ''}`}>
            <WaAvatar name={c} className="size-8 text-[13px]" />
            <div className="flex h-full min-w-0 flex-1 flex-col justify-center border-b border-[#e9edef] pr-2">
              <p className={waName}>{c}</p>
              <p className={waEmail}>{c}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className={`${waBar} gap-2`}>
          <WaIcon name="back" className="sm:hidden" />
          <WaAvatar name={contact} />
          <div className="min-w-0">
            <p className={waName}>{contact}</p>
            <p className={waEmail}>{contact}</p>
          </div>
        </div>
        <div className="flex min-h-0 flex-1 flex-col justify-end gap-2 overflow-hidden bg-[#efeae2] px-4 py-2.5">
          {shown.map((n) => {
            const [text, isMine] = CHAT[n % CHAT.length]
            return (
              <p key={n} className={isMine ? bubbleOut : bubbleIn}>
                {text}
                {/* Room at the end of the text, so the time never covers it. */}
                <span className="inline-block w-10" />
                <span className="absolute right-1.5 bottom-[3px] text-[8px] leading-none text-[#667781]">
                  {clock(n)}
                </span>
              </p>
            )
          })}
        </div>
        <div className={`${waBar} gap-2`}>
          <span className="flex h-[26px] flex-1 items-center rounded-[6px] bg-white px-2.5 text-[10px] text-[#667781]">
            Type a message
          </span>
          <WaIcon name="send" />
        </div>
      </div>
    </div>
  )
}

const views = {
  chat: Chat,
  injector: Injector,
  shortener: Shortener,
  labtest: LabTest,
  portfolio: Portfolio,
}
