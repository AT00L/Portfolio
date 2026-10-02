import { motion } from 'motion/react'
import { profile } from '../data'
import { ease, fadeUp, reveal } from '../motion'
import Clock from './Clock'
import { ArrowIcon, GitHubIcon } from './Icons'
import Magnetic from './Magnetic'
import RollText from './RollText'

const inView = { once: true, margin: '-10% 0px' }

const letter = {
  hidden: { y: '100%' },
  show: (i) => ({ y: '0%', transition: { duration: 1, ease, delay: i * 0.035 } }),
}

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact__glow" aria-hidden="true" />
      <div className="wrap">
        <motion.div initial="hidden" whileInView="show" viewport={inView}>
          <motion.p className="eyebrow" variants={fadeUp}>
            <span>(04)</span> Contact
          </motion.p>
          <h2 className="contact__title">
            <span className="mask">
              <motion.span variants={reveal} custom={0}>
                Got an idea?
              </motion.span>
            </span>
            <span className="mask">
              <motion.span variants={reveal} custom={1}>
                Let’s <em>build</em> it.
              </motion.span>
            </span>
          </h2>
        </motion.div>

        <div className="contact__row">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 1, ease, delay: 0.2 }}
          >
            Always happy to talk shop — interesting problems, side projects, or just good
            engineering. The quickest way to see what I’m up to is my GitHub.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={inView}
            transition={{ duration: 1.1, ease, delay: 0.25 }}
          >
            <Magnetic strength={0.45}>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="orb"
                data-cursor="Say hi"
              >
                <GitHubIcon size={30} />
                <span>github.com/{profile.githubHandle}</span>
                <ArrowIcon size={22} />
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      <footer className="footer">
        <motion.p
          className="footer__name"
          aria-hidden="true"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -5% 0px' }}
        >
          {[...profile.name].map((ch, i) => (
            <span className="mask" key={i}>
              <motion.span variants={letter} custom={i}>
                {ch === ' ' ? '\u00A0' : ch}
              </motion.span>
            </span>
          ))}
        </motion.p>
        <div className="footer__bar wrap">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span className="footer__built">Built with React, Motion &amp; Lenis</span>
          <Clock />
          <a href="#top" className="hover-roll footer__top">
            <RollText text="Back to top" /> ↑
          </a>
        </div>
      </footer>
    </section>
  )
}
