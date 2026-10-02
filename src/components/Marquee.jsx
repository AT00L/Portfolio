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

const COPIES = 4
const wrap = (min, max, v) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

// An endless ticker that speeds up — and flips direction — with scroll velocity.
function Track({ items, speed, className }) {
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
    let move = direction.current * speed * (delta / 1000)
    move += move * Math.abs(f)
    baseX.set(baseX.get() + move)
  })

  return (
    <div className={`marquee__band ${className}`}>
      <motion.div className="marquee__track" style={{ x, skewX: reduce ? 0 : skew }}>
        {Array.from({ length: COPIES }, (_, c) => (
          <span key={c} className="marquee__group" aria-hidden={c > 0}>
            {items.map((t) => (
              <span key={t} className="marquee__item">
                {t}
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
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
    <section className="marquee" aria-label="Tech I work with">
      <Track items={stack} speed={-2.2} className="marquee__band--accent" />
      <Track items={reversed} speed={1.6} className="marquee__band--ghost" />
    </section>
  )
}
