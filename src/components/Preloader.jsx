import { animate, motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { profile } from '../data'

const curtain = [0.76, 0, 0.24, 1]

export default function Preloader({ onDone }) {
  const countRef = useRef(null)

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.4,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        if (countRef.current) countRef.current.textContent = String(Math.round(v)).padStart(3, '0')
      },
      onComplete: onDone,
    })
    return () => controls.stop()
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-200 flex flex-col justify-between bg-accent p-(--gutter) text-ink"
      exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 1, ease: curtain } }}
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      <motion.div
        className="text-[clamp(1.1rem,2.2vw,1.6rem)] font-semibold tracking-[-0.02em]"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {profile.name}
        <em className="pr-[0.05em] font-serif font-normal tracking-[-0.02em] italic"> — building</em>
      </motion.div>
      <div
        className="self-end text-[clamp(6rem,24vw,22rem)] leading-[0.8] font-semibold tracking-[-0.06em] tabular-nums"
        ref={countRef}
      >
        000
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-1 w-full origin-left bg-ink"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
      />
    </motion.div>
  )
}
