import { useState } from "react"
import { Outlet, useLocation, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  Menu,
  X,
  Zap,
} from "lucide-react"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FolderKanban, label: "Projects", path: "/projects" },
  { icon: Settings, label: "Settings", path: "/settings" },
]

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[#080c14] flex">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0c111b] border-r border-white/[0.06] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="h-14 flex items-center px-5 border-b border-white/[0.06]">
          <Link
            to="/"
            className="flex items-center gap-2.5"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="w-7 h-7 rounded-md bg-[#3B82F6] flex items-center justify-center">
              <Zap size={15} className="text-white" />
            </div>
            <span className="font-bold text-[15px] text-white tracking-tight">
              FORGE
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
              || (item.path === "/projects" && location.pathname.startsWith("/projects"))
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
                  isActive
                    ? "bg-[#3B82F6]/10 text-[#3B82F6]"
                    : "text-[#64748b] hover:text-[#94a3b8] hover:bg-white/[0.02]"
                }`}
              >
                <Icon size={17} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-2.5 px-2 py-2">
            <div className="w-7 h-7 rounded-full bg-[#1e3a5f] flex items-center justify-center text-[11px] font-bold text-[#3B82F6]">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-white truncate">Alex Chen</p>
              <p className="text-[11px] text-[#475569] truncate">alex@forge.dev</p>
            </div>
            <span className="text-[10px] font-semibold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded-full">
              PRO
            </span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Mobile header */}
        <div className="lg:hidden h-14 flex items-center px-4 border-b border-white/[0.06] bg-[#0c111b]/80 backdrop-blur-md sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 text-[#64748b] hover:text-white"
          >
            <Menu size={20} />
          </button>
          <span className="ml-3 font-bold text-sm text-white">FORGE</span>
        </div>

        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
