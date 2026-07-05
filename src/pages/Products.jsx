import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import Topbar from '../components/Topbar'
import { LoadingState, ErrorState, EmptyState } from '../components/StateViews'
import { useFetch } from '../api/useFetch'
import { getProducts } from '../api/dummyjson'
import { formatCurrency } from '../utils/transforms'

function StockBadge({ stock }) {
  let tone = 'bg-teal/20 text-teal-light'
  let label = 'In stock'
  if (stock === 0) {
    tone = 'bg-alert/20 text-alert'
    label = 'Out of stock'
  } else if (stock < 15) {
    tone = 'bg-amber/20 text-amber'
    label = 'Low stock'
  }
  return (
    <span className={`text-xs font-mono px-2 py-0.5 rounded ${tone}`}>
      {label} · {stock}
    </span>
  )
}

export default function Products() {
  const { data, error, loading, refetch } = useFetch(
    () => getProducts({ limit: 100 }),
    [],
  )
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  const categories = useMemo(() => {
    if (!data) return []
    return ['all', ...new Set(data.products.map((p) => p.category))]
  }, [data])

  const filtered = useMemo(() => {
    if (!data) return []
    return data.products.filter((p) => {
      const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'all' || p.category === category
      return matchesQuery && matchesCategory
    })
  }, [data, query, category])

  return (
    <div>
      <Topbar
        title="Inventory"
        subtitle={data ? `${data.total} products tracked` : 'Loading…'}
      />

      {loading && <LoadingState />}
      {error && <ErrorState message={error.message} onRetry={refetch} />}

      {!loading && !error && (
        <>
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-paper/30"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                className="w-full bg-ink-light border border-ink-lighter rounded-md pl-9 pr-3 py-2 text-sm font-mono placeholder:text-paper/30 focus:outline-none focus:ring-1 focus:ring-amber"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-ink-light border border-ink-lighter rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-amber"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'all' ? 'All categories' : c}
                </option>
              ))}
            </select>
          </div>

          {filtered.length === 0 ? (
            <EmptyState message="No products match your filters." />
          ) : (
            <div className="bg-ink-light border border-ink-lighter rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-lighter text-left text-xs font-mono uppercase text-paper/40">
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Price</th>
                    <th className="px-4 py-3 font-medium">Rating</th>
                    <th className="px-4 py-3 font-medium">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.slice(0, 30).map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-ink-lighter/60 last:border-0 hover:bg-ink-lighter/40"
                    >
                      <td className="px-4 py-3 flex items-center gap-3">
                        <img
                          src={p.thumbnail}
                          alt={p.title}
                          className="w-8 h-8 rounded object-cover bg-ink-lighter"
                          loading="lazy"
                        />
                        <span className="text-paper/90">{p.title}</span>
                      </td>
                      <td className="px-4 py-3 text-paper/60 capitalize">
                        {p.category}
                      </td>
                      <td className="px-4 py-3 font-mono text-paper/90">
                        {formatCurrency(p.price)}
                      </td>
                      <td className="px-4 py-3 font-mono text-paper/60">
                        {p.rating.toFixed(1)}
                      </td>
                      <td className="px-4 py-3">
                        <StockBadge stock={p.stock} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length > 30 && (
                <p className="text-xs font-mono text-paper/30 px-4 py-3">
                  Showing 30 of {filtered.length} results — refine your search
                  to narrow further.
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
