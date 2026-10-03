// Letters roll up one after another when the closest `group/link` ancestor is hovered.
export default function RollText({ text }) {
  return (
    <span className="inline-flex whitespace-pre">
      <span className="sr-only">{text}</span>
      {[...text].map((ch, i) => {
        const glyph = ch === ' ' ? '\u00A0' : ch
        const letter =
          'block transition-transform delay-[calc(var(--i)*14ms)] duration-[600ms] ease-snap group-hover/link:-translate-y-full'
        return (
          <span
            key={i}
            className="inline-flex h-[1.2em] flex-col overflow-hidden leading-[1.2]"
            style={{ '--i': i }}
            aria-hidden="true"
          >
            <span className={letter}>{glyph}</span>
            <span className={letter}>{glyph}</span>
          </span>
        )
      })}
    </span>
  )
}
