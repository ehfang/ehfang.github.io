/**
 * Renders a string whose `**bold**` spans get editorial emphasis —
 * used so content files stay plain text.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-medium text-paper">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  )
}
