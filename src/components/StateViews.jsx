import { AlertTriangle, PackageSearch, Loader2 } from 'lucide-react'

export function LoadingState({ label = 'Loading manifest data…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-paper/40">
      <Loader2 className="animate-spin mb-3" size={22} />
      <p className="text-sm font-mono">{label}</p>
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <AlertTriangle className="text-alert mb-3" size={22} />
      <p className="text-sm font-medium text-paper/80 mb-1">
        Couldn't load this data
      </p>
      <p className="text-xs font-mono text-paper/40 mb-4 max-w-sm">
        {message || 'The request to the data source failed.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs font-mono px-4 py-2 rounded border border-ink-lighter text-amber hover:bg-ink-lighter transition-colors"
        >
          Retry request
        </button>
      )}
    </div>
  )
}

export function EmptyState({ message = 'Nothing here yet.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-paper/40">
      <PackageSearch className="mb-3" size={22} />
      <p className="text-sm font-mono">{message}</p>
    </div>
  )
}
