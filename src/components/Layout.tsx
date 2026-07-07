import { useState } from "react"
import { Link, useLocation, Outlet } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { LayoutDashboard, FolderKanban, Settings, Bell, Search, Menu, X } from "lucide-react"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FolderKanban, label: "Projects", path: "/projects" },
  { icon: Settings, label: "Settings", path: "/settings" },
]

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const isActive = (path: string) => location.pathname.startsWith(path)

  return (
    <div className="flex h-screen bg-forge-base overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-60 bg-forge-surface-dark border-r border-forge-surface-elevated/10 flex-col shrink-0">
        <div className="h-14 flex items-center px-4 border-b border-forge-surface-elevated/10">
          <Link to="/" className="font-display text-lg font-bold text-forge-text-primary tracking-tight">FORGE</Link>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive(item.path) ? "bg-forge-blue/10 text-forge-blue border-l-[3px] border-forge-blue" : "text-forge-text-secondary hover:text-forge-text-primary hover:bg-forge-surface/50 border-l-[3px] border-transparent"
              }`}>
              <item.icon size={18} /><span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-forge-surface-elevated/10">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-forge-blue/20 flex items-center justify-center text-forge-blue text-xs font-bold shrink-0">JD</div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-forge-text-primary truncate">John Doe</p>
              <span className="text-[10px] font-medium text-forge-blue bg-forge-blue/10 px-1.5 py-0.5 rounded">PRO</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-[260px] bg-forge-surface-dark border-r border-forge-surface-elevated/10 z-50 flex flex-col lg:hidden">
              <div className="h-14 flex items-center justify-between px-4 border-b border-forge-surface-elevated/10">
                <Link to="/" className="font-display text-lg font-bold text-forge-text-primary" onClick={() => setSidebarOpen(false)}>FORGE</Link>
                <button onClick={() => setSidebarOpen(false)} className="p-1 text-forge-text-tertiary hover:text-forge-text-primary"><X size={18} /></button>
              </div>
              <nav className="flex-1 py-4 px-3 space-y-1">
                {navItems.map((item) => (
                  <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive(item.path) ? "bg-forge-blue/10 text-forge-blue border-l-[3px] border-forge-blue" : "text-forge-text-secondary hover:text-forge-text-primary hover:bg-forge-surface/50 border-l-[3px] border-transparent"
                    }`}>
                    <item.icon size={18} /><span>{item.label}</span>
                  </Link>
                ))}
              </nav>
              <div className="p-3 border-t border-forge-surface-elevated/10">
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-forge-blue/20 flex items-center justify-center text-forge-blue text-xs font-bold">JD</div>
                  <div><p className="text-sm font-medium text-forge-text-primary">John Doe</p><span className="text-[10px] font-medium text-forge-blue bg-forge-blue/10 px-1.5 py-0.5 rounded">PRO</span></div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-14 bg-forge-surface-dark/50 border-b border-forge-surface-elevated/10 flex items-center justify-between px-3 sm:px-5 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 text-forge-text-tertiary hover:text-forge-text-primary rounded-lg hover:bg-forge-surface transition-colors">
              <Menu size={20} />
            </button>
            <h1 className="text-sm font-medium text-forge-text-secondary capitalize">{location.pathname.split("/")[1] || "Dashboard"}</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="p-2 text-forge-text-tertiary hover:text-forge-text-primary rounded-lg hover:bg-forge-surface transition-colors"><Search size={16} /></button>
            <button className="p-2 text-forge-text-tertiary hover:text-forge-text-primary rounded-lg hover:bg-forge-surface transition-colors relative">
              <Bell size={16} /><span className="absolute top-1 right-1 w-1.5 h-1.5 bg-forge-rose rounded-full" />
            </button>
          </div>
        </header>
        <motion.main key={location.pathname} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
          className="flex-1 overflow-y-auto no-scrollbar p-3 sm:p-5 lg:p-6">
          <Outlet />
        </motion.main>
      </div>
    </div>
  )
}