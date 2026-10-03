// Tailwind class strings shared by several components.

// A clipping box for text that slides up into view. Its child needs `block`.
export const mask = 'block overflow-hidden'
// Big title lines: room inside the clip for descenders and italic overhang.
export const titleMask = 'block overflow-hidden pr-[0.06em] pb-[0.09em] -mb-[0.06em]'

// Serif italic accent word; a highlighter stroke sits under it in light mode.
export const emphasis =
  'pr-[0.05em] font-serif font-normal tracking-[-0.02em] italic text-(color:--em-color) bg-[linear-gradient(var(--em-mark),var(--em-mark))] bg-[length:100%_0.3em] bg-[position:0_86%] bg-no-repeat'

// Buttons: combine `btn` with one size and one colour.
// `group/link` drives the letter roll (RollText) and the arrow nudge (ArrowIcon).
export const btn =
  'group/link inline-flex items-center whitespace-nowrap rounded-full border font-medium transition-[background-color,border-color,color] duration-[450ms] ease-smooth'
export const btnLg = 'h-[52px] gap-2.5 px-6 text-[15px]'
export const btnSm = 'h-10 gap-2 px-4 text-[14px]'
export const btnGhost = 'border-line-2 bg-chip hover:border-fg hover:bg-fg hover:text-page'
export const btnAccent = 'border-accent bg-accent text-ink hover:border-fg hover:bg-fg hover:text-page'

export const tags = 'flex flex-wrap gap-2'
export const tag =
  'rounded-full border border-line-2 px-3 py-[7px] font-mono text-[12px] leading-none text-fg-2 transition-[border-color,color] duration-[400ms]'

export const badge =
  'inline-flex items-center gap-[7px] rounded-full border border-accent-line bg-accent-soft px-2.5 py-[5px] font-mono text-[11px] leading-[normal] tracking-[0.08em] text-accent-text uppercase before:size-1.5 before:animate-breathe before:rounded-full before:bg-current'

// A status dot with a ring that keeps pinging outwards. Add a size.
export const dot =
  'relative rounded-full bg-mark after:absolute after:inset-0 after:animate-dot-ping after:rounded-[inherit] after:bg-inherit'

export const section = 'relative py-[clamp(72px,9vw,130px)]'
export const eyebrow =
  'flex items-center gap-2.5 font-mono text-[13px] leading-none tracking-[0.1em] text-muted uppercase'
