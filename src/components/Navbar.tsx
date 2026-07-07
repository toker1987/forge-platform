import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isLanding = location.pathname === "/"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  const navLinks = [
    { label: "Features", href: isLanding ? "#features" : "/#features" },
    { label: "Pricing", href: isLanding ? "#pricing" : "/#pricing" },
    { label: "Docs", href: "#" },
  ]

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 h-14 sm:h-16 transition-all duration-300 ${
        scrolled ? "bg-forge-base/80 backdrop-blur-md border-b border-forge-surface-elevated/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        <Link to="/" className="font-display text-lg sm:text-xl font-bold text-forge-text-primary tracking-tight">FORGE</Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-medium text-forge-text-secondary hover:text-forge-text-primary transition-colors">{link.label}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-forge-text-secondary hover:text-forge-text-primary px-4 py-2 rounded-lg transition-colors">Sign In</Link>
          <Link to="/dashboard" className="text-sm font-medium bg-forge-blue hover:bg-forge-blue/90 text-white px-5 py-2.5 rounded-lg transition-all active:scale-[0.98]">Get Started</Link>
        </div>
        <button className="md:hidden text-forge-text-primary p-1" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-forge-base/95 backdrop-blur-lg border-b border-forge-surface-elevated/20 overflow-hidden">
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-sm font-medium text-forge-text-secondary hover:text-forge-text-primary py-2" onClick={() => setMobileOpen(false)}>{link.label}</a>
              ))}
              <Link to="/login" className="text-sm font-medium text-forge-text-secondary hover:text-forge-text-primary py-2" onClick={() => setMobileOpen(false)}>Sign In</Link>
              <Link to="/dashboard" className="text-sm font-medium bg-forge-blue text-white px-5 py-2.5 rounded-lg text-center mt-1" onClick={() => setMobileOpen(false)}>Get Started</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}