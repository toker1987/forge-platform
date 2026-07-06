import { useState } from "react"
import { Link, useLocation, Outlet } from "react-router-dom"
import { motion } from "framer-motion"
import { LayoutDashboard, FolderKanban, Settings, ChevronLeft, ChevronRight, Bell, Search } from "lucide-react"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FolderKanban, label: "Projects", path: "/projects" },
  { icon: Settings, label: "Settings", path: "/settings" },
]

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  return (
    <div className="flex h-screen bg-forge-base">
      <aside className={`${collapsed ? "w-16" : "w-64"} bg-forge-surface-dark border-r border-forge-surface-elevated/10 flex flex-col transition-all duration-300 shrink-0`}>
        <div className="h-16 flex items-center px-4 border-b border-forge-surface-elevated/10">
          <Link to="/" className={`font-display text-lg font-bold text-forge-text-primary tracking-tight ${collapsed ? "hidden" : "block"}`}>FORGE</Link>
          {!collapsed && <button onClick={() => setCollapsed(true)} className="ml-auto text-forge-text-tertiary hover:text-forge-text-primary p-1 rounded transition-colors"><ChevronLeft size={16} /></button>}
          {collapsed && <button onClick={() => setCollapsed(false)} className="mx-auto text-forge-text-tertiary hover:text-forge-text-primary p-1 rounded transition-colors"><ChevronRight size={16} /></button>}
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path)
            return (
              <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-forge-blue/10 text-forge-blue border-l-[3px] border-forge-blue" : "text-forge-text-secondary hover:text-forge-text-primary hover:bg-forge-surface/50 border-l-[3px] border-transparent"} ${collapsed ? "justify-center" : ""}`}>
                <item.icon size={18} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>
        <div className="p-3 border-t border-forge-surface-elevated/10">
          <div className={`flex items-center gap-3 px-3 py-2 ${collapsed ? "justify-center" : ""}`}>
            <div className="w-8 h-8 rounded-full bg-forge-blue/20 flex items-center justify-center text-forge-blue text-xs font-bold shrink-0">JD</div>
            {!collapsed && <div className="min-w-0"><p className="text-sm font-medium text-forge-text-primary truncate">John Doe</p><span className="text-[10px] font-medium text-forge-blue bg-forge-blue/10 px-1.5 py-0.5 rounded">PRO</span></div>}
          </div>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-forge-surface-dark/50 border-b border-forge-surface-elevated/10 flex items-center justify-between px-6 shrink-0">
          <h1 className="text-sm font-medium text-forge-text-secondary capitalize">{location.pathname.split("/")[1] || "Dashboard"}</h1>
          <div className="flex items-center gap-3">
            <button className="p-2 text-forge-text-tertiary hover:text-forge-text-primary rounded-lg hover:bg-forge-surface transition-colors"><Search size={18} /></button>
            <button className="p-2 text-forge-text-tertiary hover:text-forge-text-primary rounded-lg hover:bg-forge-surface transition-colors relative"><Bell size={18} /><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-forge-rose rounded-full" /></button>
          </div>
        </header>
        <motion.main key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </motion.main>
      </div>
    </div>
  )
}
