import { Menu, Boxes } from 'lucide-react'

export default function MobileHeader({ onMenuClick }) {
    return (
        <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-ink-light border-b border-ink-lighter">
            <div className="flex items-center gap-2">
                <Boxes className="text-amber" size={18} />
                <span className="font-display font-semibold text-base tracking-tight">
                    Manifest
                </span>
            </div>
            <button
                onClick={onMenuClick}
                aria-label="Open menu"
                className="p-2 -mr-2 rounded-md text-paper/70 hover:text-paper hover:bg-ink-lighter transition-colors"
            >
                <Menu size={20} />
            </button>
        </header>
    )
}