import { motion } from 'motion/react'
import { fadeUp, reveal } from '../motion'

export default function SectionHead({ index, label, title, children }) {
  return (
    <motion.div
      className="section-head"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
    >
      <motion.p className="eyebrow" variants={fadeUp}>
        <span>({index})</span> {label}
      </motion.p>
      <div className="section-head__row">
        <h2 className="section-title">
          <span className="mask">
            <motion.span variants={reveal}>{title}</motion.span>
          </span>
        </h2>
        {children && (
          <motion.div className="section-head__aside" variants={fadeUp} custom={2}>
            {children}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
