export default function Topbar({ title, subtitle }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })

  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-paper/50 mt-1">{subtitle}</p>
        )}
      </div>
      <div className="text-right hidden sm:block">
        <p className="text-xs font-mono text-paper/40 uppercase tracking-wider">
          Manifest Date
        </p>
        <p className="text-sm font-mono text-paper/70">{today}</p>
      </div>
    </header>
  )
}
