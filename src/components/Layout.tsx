import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  Menu,
  X,
  Zap,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FolderKanban, label: "Projects", path: "/projects" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[260px] bg-[#0B1120] border-r border-[rgba(100,116,139,0.1)] flex flex-col transform transition-transform duration-300 lg:transform-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-[rgba(100,116,139,0.1)]">
          <Link
            to="/"
            className="font-space-grotesk font-bold text-lg text-[#F8FAFC]"
          >
            FORGE
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[rgba(59,130,246,0.1)] text-[#3B82F6] border-l-[3px] border-[#3B82F6]"
                    : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[rgba(100,116,139,0.1)]"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-[rgba(100,116,139,0.1)]">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#F8FAFC] truncate">
                Alex Chen
              </p>
              <p className="text-xs text-[#94A3B8] truncate">alex@forge.dev</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-[#F59E0B] bg-[rgba(245,158,11,0.1)] px-2 py-0.5 rounded-full">
              <Zap size={10} />
              PRO
            </span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden h-16 flex items-center px-4 border-b border-[rgba(100,116,139,0.1)]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-[#94A3B8] hover:text-[#F8FAFC]"
          >
            <Menu size={24} />
          </button>
          <span className="ml-3 font-space-grotesk font-bold text-[#F8FAFC]">
            FORGE
          </span>
        </div>

        <div className="p-3 sm:p-5 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
