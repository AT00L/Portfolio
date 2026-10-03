import { motion } from 'motion/react'
import { fadeUp, reveal } from '../motion'
import { eyebrow, titleMask } from '../ui'

export default function SectionHead({ index, label, title, children }) {
  return (
    <motion.div
      className="mb-[clamp(48px,7vw,96px)]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
    >
      <motion.p className={eyebrow} variants={fadeUp}>
        <span className="text-accent-text">({index})</span> {label}
      </motion.p>
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <h2 className="mt-5 text-[clamp(2.6rem,7.4vw,7rem)] leading-[0.95] font-semibold tracking-[-0.05em]">
          <span className={titleMask}>
            <motion.span className="block" variants={reveal}>
              {title}
            </motion.span>
          </span>
        </h2>
        {children && (
          <motion.div className="max-w-full pb-1.5" variants={fadeUp} custom={2}>
            {children}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
