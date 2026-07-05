import { NavLink } from 'react-router-dom'
import { LayoutGrid, Package, ClipboardList, Users, Boxes } from 'lucide-react'

const links = [
  { to: '/', label: 'Overview', icon: LayoutGrid, end: true },
  { to: '/products', label: 'Inventory', icon: Package },
  { to: '/orders', label: 'Orders', icon: ClipboardList },
  { to: '/customers', label: 'Customers', icon: Users },
]

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-60 md:flex-col shrink-0 bg-ink-light border-r border-ink-lighter px-4 py-6">
      <div className="flex items-center gap-2 px-2 mb-10">
        <Boxes className="text-amber" size={22} />
        <span className="font-display font-semibold text-lg tracking-tight">
          Manifest
        </span>
      </div>

      <nav className="flex flex-col gap-1">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-ink-lighter text-amber'
                  : 'text-paper/70 hover:text-paper hover:bg-ink-lighter/60'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-3 py-4 border-t border-ink-lighter">
        <p className="text-xs text-paper/40 font-mono leading-relaxed">
          DATA SOURCE
          <br />
          dummyjson.com
        </p>
      </div>
    </aside>
  )
}
