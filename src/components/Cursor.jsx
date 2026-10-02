import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

const follow = { stiffness: 500, damping: 40, mass: 0.6 }

// A trailing ring that grows over interactive elements. Mouse devices only.
export default function Cursor() {
  const [enabled] = useState(
    () => window.matchMedia('(hover: hover) and (pointer: fine)').matches,
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

  const cls = [
    'cursor',
    state.visible && 'is-visible',
    state.active && 'is-active',
    state.label && 'has-label',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <motion.div className={cls} style={{ x: sx, y: sy }} aria-hidden="true">
      <span className="cursor__ring">{state.label && <span>{state.label}</span>}</span>
    </motion.div>
  )
}
