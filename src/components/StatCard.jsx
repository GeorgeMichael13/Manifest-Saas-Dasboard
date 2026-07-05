// Deterministic 4-digit "ticket number" derived from the label, so it
// stays stable across re-renders instead of flickering on every update.
function ticketNumber(seed) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i)
    hash |= 0
  }
  return String(1000 + (Math.abs(hash) % 9000))
}

export default function StatCard({ label, value, delta, deltaLabel, icon: Icon }) {
  const isPositive = typeof delta === 'number' ? delta >= 0 : null

  return (
    <div className="ticket flex items-stretch">
      <div className="flex-1 p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-mono uppercase tracking-wider text-paper/40">
            {label}
          </p>
          {Icon && <Icon size={16} className="text-paper/30" />}
        </div>
        <p className="font-mono text-2xl font-semibold text-paper">{value}</p>
        {delta !== undefined && (
          <p
            className={`text-xs font-mono mt-2 ${
              isPositive ? 'text-teal-light' : 'text-alert'
            }`}
          >
            {isPositive ? '▲' : '▼'} {Math.abs(delta)}% {deltaLabel}
          </p>
        )}
      </div>
      <div className="ticket-perforation w-10 flex items-center justify-center">
        <span
          className="text-[10px] font-mono text-paper/30 tracking-widest"
          style={{ writingMode: 'vertical-rl' }}
        >
          NO. {ticketNumber(label)}
        </span>
      </div>
    </div>
  )
}
