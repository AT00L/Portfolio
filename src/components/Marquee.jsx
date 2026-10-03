import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { useRef } from 'react'
import { stack } from '../data'

// Two copies are enough for a seamless loop while one copy is wider than the screen.
const COPIES = 2
const wrap = (min, max, v) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

// An endless ticker that speeds up — and flips direction — with scroll velocity.
// `speed` is in items per second, so the pace doesn't depend on how long the list is.
function Track({ items, speed, className, starClass }) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false })
  const skew = useTransform(velocity, [-2000, 2000], [6, -6])
  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIES, 0, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    const percentPerSecond = (speed * 100) / (items.length * COPIES)
    let move = direction.current * percentPerSecond * (delta / 1000)
    move += move * Math.abs(f)
    baseX.set(baseX.get() + move)
  })

  return (
    <div className={`-ml-[6%] w-[112%] overflow-hidden py-[18px] ${className}`}>
      <motion.div className="flex w-max will-change-transform" style={{ x, skewX: reduce ? 0 : skew }}>
        {Array.from({ length: COPIES }, (_, c) => (
          <span key={c} className="flex shrink-0" aria-hidden={c > 0}>
            {items.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-7 pr-7 text-[clamp(1.6rem,3.4vw,3rem)] leading-[1.1] font-semibold tracking-[-0.035em] whitespace-nowrap"
              >
                {t}
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  aria-hidden="true"
                  className={`shrink-0 ${starClass}`}
                >
                  <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
                </svg>
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Marquee() {
  const reversed = [...stack].reverse()
  return (
    <section className="relative overflow-hidden py-[clamp(56px,8vw,110px)]" aria-label="Tech I work with">
      <Track
        items={stack}
        speed={-1.6}
        className="relative z-2 rotate-[-2.5deg] bg-accent text-ink"
        starClass="fill-current"
      />
      <Track
        items={reversed}
        speed={1.15}
        className="-mt-[46px] rotate-2 border-y border-line bg-sunken text-fg-2 max-md:-mt-[30px]"
        starClass="fill-accent-text"
      />
    </section>
  )
}
