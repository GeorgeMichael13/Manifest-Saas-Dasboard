import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Overview from './pages/Overview'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Customers from './pages/Customers'

export default function App() {
  return (
    <div className="flex min-h-screen bg-ink">
      <Sidebar />
      <main className="flex-1 px-6 py-6 md:px-10 md:py-8 max-w-[1400px] mx-auto w-full">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
        </Routes>
      </main>
    </div>
  )
}
