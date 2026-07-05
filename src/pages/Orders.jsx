import { useMemo, useState } from 'react'
import Topbar from '../components/Topbar'
import { LoadingState, ErrorState, EmptyState } from '../components/StateViews'
import { useFetch } from '../api/useFetch'
import { getCarts } from '../api/dummyjson'
import { formatCurrency } from '../utils/transforms'

const SORTERS = {
  total_desc: (a, b) => b.discountedTotal - a.discountedTotal,
  total_asc: (a, b) => a.discountedTotal - b.discountedTotal,
  items_desc: (a, b) => b.totalQuantity - a.totalQuantity,
}

export default function Orders() {
  const { data, error, loading, refetch } = useFetch(
    () => getCarts({ limit: 50 }),
    [],
  )
  const [sort, setSort] = useState('total_desc')

  const sorted = useMemo(() => {
    if (!data) return []
    return [...data.carts].sort(SORTERS[sort])
  }, [data, sort])

  return (
    <div>
      <Topbar
        title="Orders"
        subtitle={data ? `${data.total} orders in the system` : 'Loading…'}
      />

      {loading && <LoadingState />}
      {error && <ErrorState message={error.message} onRetry={refetch} />}

      {!loading && !error && (
        <>
          <div className="flex justify-end mb-4">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-ink-light border border-ink-lighter rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-amber"
            >
              <option value="total_desc">Highest value first</option>
              <option value="total_asc">Lowest value first</option>
              <option value="items_desc">Most items first</option>
            </select>
          </div>

          {sorted.length === 0 ? (
            <EmptyState message="No orders to show." />
          ) : (
            <div className="bg-ink-light border border-ink-lighter rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-lighter text-left text-xs font-mono uppercase text-paper/40">
                    <th className="px-4 py-3 font-medium">Order ID</th>
                    <th className="px-4 py-3 font-medium">Customer ID</th>
                    <th className="px-4 py-3 font-medium">Items</th>
                    <th className="px-4 py-3 font-medium">Quantity</th>
                    <th className="px-4 py-3 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((cart) => (
                    <tr
                      key={cart.id}
                      className="border-b border-ink-lighter/60 last:border-0 hover:bg-ink-lighter/40"
                    >
                      <td className="px-4 py-3 font-mono text-amber">
                        #{String(cart.id).padStart(4, '0')}
                      </td>
                      <td className="px-4 py-3 font-mono text-paper/60">
                        USR-{cart.userId}
                      </td>
                      <td className="px-4 py-3 text-paper/80">
                        {cart.totalProducts} product
                        {cart.totalProducts !== 1 ? 's' : ''}
                      </td>
                      <td className="px-4 py-3 font-mono text-paper/60">
                        {cart.totalQuantity}
                      </td>
                      <td className="px-4 py-3 font-mono text-paper/90">
                        {formatCurrency(cart.discountedTotal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  )
}
