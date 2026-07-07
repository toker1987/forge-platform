import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md bg-[rgba(15,23,42,0.8)] border-b border-[rgba(100,116,139,0.1)]"
            : "bg-transparent"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="font-space-grotesk font-bold text-xl text-[#F8FAFC]">
            FORGE
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/login"
              className="text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] px-4 py-2 transition-colors"
            >
              Sign in
            </a>
            <a
              href="/dashboard"
              className="text-sm font-medium bg-[#3B82F6] hover:bg-[#2563EB] text-white px-5 py-2.5 rounded-lg transition-all active:scale-[0.98]"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[#F8FAFC]"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[260px] z-50 bg-[#0B1120] border-l border-[rgba(100,116,139,0.1)] p-6 md:hidden"
            >
              <div className="flex justify-end mb-8">
                <button onClick={() => setMobileOpen(false)} className="p-2 text-[#F8FAFC]">
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-base font-medium text-[#94A3B8] hover:text-[#F8FAFC] py-2 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <hr className="border-[rgba(100,116,139,0.15)] my-4" />
                <a
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-[#94A3B8] hover:text-[#F8FAFC] py-2 transition-colors"
                >
                  Sign in
                </a>
                <a
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="text-center text-base font-medium bg-[#3B82F6] hover:bg-[#2563EB] text-white px-5 py-3 rounded-lg transition-all active:scale-[0.98]"
                >
                  Get Started
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
