export const ease = [0.16, 1, 0.3, 1]

// For text lines inside a `.mask`. Trigger these from a parent: a line parked
// fully inside its mask has no visible area, so an observer on it never fires.
export const reveal = {
  hidden: { y: '110%' },
  show: (i = 0) => ({ y: '0%', transition: { duration: 1.1, ease, delay: i * 0.1 } }),
}

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: i * 0.1 } }),
}
