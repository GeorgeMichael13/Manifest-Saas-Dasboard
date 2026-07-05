const BASE_URL = 'https://dummyjson.com'

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

// Products / inventory
export function getProducts({ limit = 100, skip = 0 } = {}) {
  return request(`/products?limit=${limit}&skip=${skip}`)
}

export function getProductCategories() {
  return request('/products/categories')
}

// Carts (treated as "orders" for this dashboard)
export function getCarts({ limit = 50, skip = 0 } = {}) {
  return request(`/carts?limit=${limit}&skip=${skip}`)
}

// Users / customers
export function getUsers({ limit = 50, skip = 0 } = {}) {
  return request(`/users?limit=${limit}&skip=${skip}`)
}
