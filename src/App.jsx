import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import MobileHeader from './components/MobileHeader'
import Overview from './pages/Overview'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Customers from './pages/Customers'

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-ink">
      <Sidebar drawerOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <MobileHeader onMenuClick={() => setDrawerOpen(true)} />

        <main className="flex-1 px-4 py-5 sm:px-6 sm:py-6 md:px-10 md:py-8 max-w-[1400px] mx-auto w-full">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}