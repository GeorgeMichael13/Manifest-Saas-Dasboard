import { useMemo } from 'react'
import Topbar from '../components/Topbar'
import { LoadingState, ErrorState, EmptyState } from '../components/StateViews'
import { useFetch } from '../api/useFetch'
import { getUsers, getCarts } from '../api/dummyjson'
import { getOrdersPerUser, formatCurrency } from '../utils/transforms'

export default function Customers() {
  const users = useFetch(() => getUsers({ limit: 50 }), [])
  const carts = useFetch(() => getCarts({ limit: 50 }), [])

  const loading = users.loading || carts.loading
  const error = users.error || carts.error

  const rows = useMemo(() => {
    if (!users.data || !carts.data) return []
    const ordersByUser = getOrdersPerUser(carts.data.carts)
    return users.data.users
      .map((u) => {
        const stats = ordersByUser.get(u.id) || { orders: 0, spent: 0 }
        return { ...u, ...stats }
      })
      .sort((a, b) => b.spent - a.spent)
  }, [users.data, carts.data])

  return (
    <div>
      <Topbar
        title="Customers"
        subtitle={users.data ? `${users.data.total} registered customers` : 'Loading…'}
      />

      {loading && <LoadingState />}
      {error && (
        <ErrorState
          message={error.message}
          onRetry={() => {
            users.refetch()
            carts.refetch()
          }}
        />
      )}

      {!loading && !error && (
        <>
          {rows.length === 0 ? (
            <EmptyState message="No customers to show." />
          ) : (
            <div className="bg-ink-light border border-ink-lighter rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-lighter text-left text-xs font-mono uppercase text-paper/40">
                    <th className="px-4 py-3 font-medium">Customer</th>
                    <th className="px-4 py-3 font-medium">Location</th>
                    <th className="px-4 py-3 font-medium">Orders</th>
                    <th className="px-4 py-3 font-medium">Lifetime Spend</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 30).map((u) => (
                    <tr
                      key={u.id}
                      className="border-b border-ink-lighter/60 last:border-0 hover:bg-ink-lighter/40"
                    >
                      <td className="px-4 py-3 flex items-center gap-3">
                        <img
                          src={u.image}
                          alt={`${u.firstName} ${u.lastName}`}
                          className="w-8 h-8 rounded-full object-cover bg-ink-lighter"
                          loading="lazy"
                        />
                        <div>
                          <p className="text-paper/90">
                            {u.firstName} {u.lastName}
                          </p>
                          <p className="text-xs text-paper/40 font-mono">
                            {u.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-paper/60">
                        {u.address?.city}, {u.address?.state}
                      </td>
                      <td className="px-4 py-3 font-mono text-paper/60">
                        {u.orders}
                      </td>
                      <td className="px-4 py-3 font-mono text-paper/90">
                        {formatCurrency(u.spent)}
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
