// Letters roll up one after another when the closest `.hover-roll` ancestor is hovered.
export default function RollText({ text }) {
  return (
    <span className="roll">
      <span className="sr-only">{text}</span>
      {[...text].map((ch, i) => {
        const glyph = ch === ' ' ? ' ' : ch
        return (
          <span key={i} className="roll__char" style={{ '--i': i }} aria-hidden="true">
            <span>{glyph}</span>
            <span>{glyph}</span>
          </span>
        )
      })}
    </span>
  )
}
