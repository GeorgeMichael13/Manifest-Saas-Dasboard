// DummyJSON's carts endpoint has no order date field, so a true
// "revenue over time" chart isn't possible from real data alone.
// We deterministically distribute carts across the last 14 days
// (by cart id) purely to give the trend chart something to plot.
// This is called out here and in the UI so it's not mistaken for
// real historical data.
export function bucketCartsByPseudoDate(carts, days = 14) {
  const buckets = Array.from({ length: days }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (days - 1 - i))
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: 0,
      orders: 0,
    }
  })

  carts.forEach((cart) => {
    const bucketIndex = cart.id % days
    buckets[bucketIndex].revenue += cart.discountedTotal
    buckets[bucketIndex].orders += 1
  })

  return buckets.map((b) => ({ ...b, revenue: Math.round(b.revenue) }))
}

export function getRevenueByCategory(carts, productCategoryMap) {
  const totals = {}

  carts.forEach((cart) => {
    cart.products.forEach((item) => {
      const category = productCategoryMap.get(item.id) || 'other'
      totals[category] = (totals[category] || 0) + item.discountedTotal
    })
  })

  return Object.entries(totals)
    .map(([category, revenue]) => ({ category, revenue: Math.round(revenue) }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 6)
}

export function buildProductCategoryMap(products) {
  const map = new Map()
  products.forEach((p) => map.set(p.id, p.category))
  return map
}

export function getOrdersPerUser(carts) {
  const map = new Map()
  carts.forEach((cart) => {
    const existing = map.get(cart.userId) || { orders: 0, spent: 0 }
    existing.orders += 1
    existing.spent += cart.discountedTotal
    map.set(cart.userId, existing)
  })
  return map
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}
