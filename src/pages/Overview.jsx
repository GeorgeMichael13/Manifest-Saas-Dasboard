import { useMemo } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts'
import { DollarSign, ShoppingCart, Package, Users } from 'lucide-react'
import Topbar from '../components/Topbar'
import StatCard from '../components/StatCard'
import { LoadingState, ErrorState } from '../components/StateViews'
import { useFetch } from '../api/useFetch'
import { getCarts, getProducts, getUsers } from '../api/dummyjson'
import {
  bucketCartsByPseudoDate,
  getRevenueByCategory,
  buildProductCategoryMap,
  formatCurrency,
} from '../utils/transforms'

const chartTooltipStyle = {
  background: '#171E2E',
  border: '1px solid #212A3D',
  borderRadius: 6,
  fontSize: 12,
  fontFamily: 'JetBrains Mono, monospace',
}

export default function Overview() {
  const carts = useFetch(() => getCarts({ limit: 50 }), [])
  const products = useFetch(() => getProducts({ limit: 100 }), [])
  const users = useFetch(() => getUsers({ limit: 100 }), [])

  const loading = carts.loading || products.loading || users.loading
  const error = carts.error || products.error || users.error

  const revenueTrend = useMemo(() => {
    if (!carts.data) return []
    return bucketCartsByPseudoDate(carts.data.carts)
  }, [carts.data])

  const categoryRevenue = useMemo(() => {
    if (!carts.data || !products.data) return []
    const map = buildProductCategoryMap(products.data.products)
    return getRevenueByCategory(carts.data.carts, map)
  }, [carts.data, products.data])

  const totalRevenue = useMemo(() => {
    if (!carts.data) return 0
    return carts.data.carts.reduce((sum, c) => sum + c.discountedTotal, 0)
  }, [carts.data])

  const avgOrderValue = carts.data?.carts?.length
    ? totalRevenue / carts.data.carts.length
    : 0

  return (
    <div>
      <Topbar
        title="Overview"
        subtitle="Store performance at a glance — pulled live from DummyJSON"
      />

      {loading && <LoadingState />}
      {error && (
        <ErrorState
          message={error.message}
          onRetry={() => {
            carts.refetch()
            products.refetch()
            users.refetch()
          }}
        />
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <StatCard
              label="Total Revenue"
              value={formatCurrency(totalRevenue)}
              delta={8.2}
              deltaLabel="vs last period"
              icon={DollarSign}
            />
            <StatCard
              label="Orders"
              value={carts.data.total}
              delta={3.1}
              deltaLabel="vs last period"
              icon={ShoppingCart}
            />
            <StatCard
              label="Avg. Order Value"
              value={formatCurrency(avgOrderValue)}
              delta={-1.4}
              deltaLabel="vs last period"
              icon={Package}
            />
            <StatCard
              label="Customers"
              value={users.data.total}
              delta={4.6}
              deltaLabel="vs last period"
              icon={Users}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 bg-ink-light border border-ink-lighter rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-medium text-sm text-paper/80">
                  Revenue — Last 14 Days
                </h2>
                <span className="text-[10px] font-mono text-paper/30 uppercase">
                  Simulated timeline*
                </span>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={revenueTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#212A3D" />
                  <XAxis
                    dataKey="date"
                    stroke="#F7F6F2"
                    opacity={0.4}
                    fontSize={11}
                    fontFamily="JetBrains Mono, monospace"
                  />
                  <YAxis
                    stroke="#F7F6F2"
                    opacity={0.4}
                    fontSize={11}
                    fontFamily="JetBrains Mono, monospace"
                  />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#E8A33D"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-[10px] font-mono text-paper/30 mt-2">
                *DummyJSON's cart data has no order timestamps, so orders are
                distributed across days deterministically for illustration.
              </p>
            </div>

            <div className="bg-ink-light border border-ink-lighter rounded-lg p-5">
              <h2 className="font-display font-medium text-sm text-paper/80 mb-4">
                Revenue by Category
              </h2>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={categoryRevenue} layout="vertical" margin={{ left: 10 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="category"
                    stroke="#F7F6F2"
                    opacity={0.6}
                    fontSize={11}
                    width={90}
                  />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Bar dataKey="revenue" fill="#4D8B87" radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
