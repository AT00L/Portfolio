import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

const follow = { stiffness: 500, damping: 40, mass: 0.6 }

// A trailing ring that grows over interactive elements. Mouse devices only.
export default function Cursor() {
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )
  const [state, setState] = useState({ active: false, label: '', visible: false })
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, follow)
  const sy = useSpring(y, follow)

  useEffect(() => {
    if (!enabled) return

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setState((s) => (s.visible ? s : { ...s, visible: true }))
    }
    const over = (e) => {
      const target = e.target.closest('a, button, [data-cursor]')
      setState((s) => {
        const label = target?.dataset.cursor ?? ''
        const active = Boolean(target)
        return s.active === active && s.label === label ? s : { ...s, active, label }
      })
    }
    const leave = () => setState((s) => ({ ...s, visible: false }))

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  // A label turns the ring into a filled bubble; links and buttons grow it.
  const look = state.label
    ? 'size-[88px] -mt-[44px] -ml-[44px] scale-100 border-accent bg-accent'
    : state.active
      ? 'size-[34px] -mt-[17px] -ml-[17px] scale-[1.55] border-accent-text bg-accent-soft'
      : `size-[34px] -mt-[17px] -ml-[17px] border-cursor ${state.visible ? 'scale-100' : 'scale-0'}`

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-120"
      style={{ x: sx, y: sy }}
      aria-hidden="true"
    >
      <span
        className={`absolute top-0 left-0 grid place-items-center rounded-full border [transition:scale_0.45s_var(--ease),width_0.45s_var(--ease),height_0.45s_var(--ease),margin_0.45s_var(--ease),background-color_0.3s,border-color_0.3s] ${look}`}
      >
        {state.label && (
          <span className="font-mono text-[11px] leading-none font-medium tracking-[0.06em] text-ink uppercase">
            {state.label}
          </span>
        )}
      </span>
    </motion.div>
  )
}
