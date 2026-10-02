import { useAnimationFrame, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

// Small, code-drawn previews of each project. Purely decorative.
export default function ProjectVisual({ kind }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '0px 0px -10% 0px' })
  const View = views[kind]
  return (
    <div className={`viz viz--${kind} ${inView ? 'is-live' : ''}`} ref={ref}>
      <View live={inView} />
    </div>
  )
}

function Injector() {
  return (
    <div className="v-browser">
      <div className="v-bar">
        <i />
        <i />
        <i />
        <span className="v-url">shop.example.com</span>
      </div>
      <div className="v-page">
        <div className="sk sk--nav" />
        <div className="v-product">
          <div className="sk sk--img" />
          <div className="v-col">
            <div className="sk sk--h" />
            <div className="sk sk--p" />
            <div className="sk sk--p sk--short" />
            <div className="v-target">
              Add to cart
              <span className="v-target__tag">button#add-to-cart · 148×44</span>
            </div>
          </div>
        </div>
      </div>
      <div className="v-panel">
        <p className="v-panel__title">
          <span className="dot" /> Custom CSS
        </p>
        <pre>
          <span className="c-sel">&amp;</span> {'{'}
          {'\n  '}
          <span className="c-prop">background</span>: <span className="c-val">#d4ff3a</span>;
          {'\n  '}
          <span className="c-prop">border-radius</span>: <span className="c-val">999px</span>;
          {'\n'}
          {'}'}
        </pre>
        <span className="v-panel__btn">Save rule ⌘↵</span>
      </div>
    </div>
  )
}

function Shortener({ live }) {
  const [clicks, setClicks] = useState(128)

  useEffect(() => {
    if (!live) return
    const id = setInterval(() => setClicks((c) => c + 1), 1400)
    return () => clearInterval(id)
  }, [live])

  return (
    <div className="v-short">
      <div className="v-term">
        <p>
          <b>$</b> curl -sI urlshortneratul.is-a.dev/PPBqWA9
        </p>
        <p className="v-ok">HTTP/1.1 302 Found</p>
        <p className="v-dim">location: https://github.com/AT00L</p>
      </div>
      <div className="v-table">
        <div className="v-row v-row--head">
          <span>Short</span>
          <span>Destination</span>
          <span>Clicks</span>
        </div>
        <div className="v-row v-row--hot">
          <span>/PPBqWA9</span>
          <span>github.com/AT00L</span>
          <span key={clicks} className="v-bump">
            {clicks}
          </span>
        </div>
        <div className="v-row">
          <span>/x7Kp2-q</span>
          <span>linkedin.com/…</span>
          <span>64</span>
        </div>
        <div className="v-row">
          <span>/Qm_r81Z</span>
          <span>docs.google.com/…</span>
          <span>31</span>
        </div>
      </div>
    </div>
  )
}

function Monorepo() {
  return (
    <div className="v-mono">
      <pre className="v-tree">
        <span className="c-dir">yourlabtest/</span>
        {'\n├── '}
        <span className="c-dir">packages/</span>
        {'\n│   ├── '}
        <span className="c-dir">web/</span>
        {'      '}
        <span className="v-dim">React · MUI · Tailwind</span>
        {'\n│   └── '}
        <span className="c-dir">server/</span>
        {'   '}
        <span className="v-dim">Express 5 · MongoDB</span>
        {'\n└── package.json  '}
        <span className="v-dim">workspaces</span>
      </pre>
      <div className="v-flow">
        <span className="v-node">web</span>
        <span className="v-wire">
          <em>GET /product</em>
          <i />
        </span>
        <span className="v-node">server</span>
        <span className="v-wire">
          <i />
        </span>
        <span className="v-node v-node--db">MongoDB</span>
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
    <div className="v-fps">
      <div className="v-fps__read">
        <span className="v-fps__num">{fps}</span>
        <span className="v-fps__unit">
          fps
          <small>measured live, right now</small>
        </span>
      </div>
      <div className="v-fps__bars" aria-hidden="true">
        {bars.map((b, i) => (
          <i key={i} style={{ transform: `scaleY(${b / peak})` }} />
        ))}
      </div>
      <pre className="v-code">
        <span className="c-kw">const</span> lenis = <span className="c-kw">new</span>{' '}
        <span className="c-fn">Lenis</span>({'{ '}
        <span className="c-prop">autoRaf</span>: <span className="c-val">true</span>
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
