import { Link } from "react-router-dom"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-forge-surface-dark border-t border-forge-surface-elevated/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-display text-xl font-bold text-forge-text-primary">FORGE</Link>
            <p className="mt-3 text-xs sm:text-sm text-forge-text-tertiary leading-relaxed">Autonomous agents that research trends, analyze markets, and build digital products.</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-forge-text-tertiary hover:text-forge-text-primary"><Github size={16} /></a>
              <a href="#" className="text-forge-text-tertiary hover:text-forge-text-primary"><Twitter size={16} /></a>
              <a href="#" className="text-forge-text-tertiary hover:text-forge-text-primary"><Linkedin size={16} /></a>
            </div>
          </div>
          {[
            { title: "Product", items: ["Features", "Pricing", "Changelog", "Roadmap"] },
            { title: "Resources", items: ["Documentation", "API Reference", "Community", "Blog"] },
            { title: "Company", items: ["About", "Careers", "Contact", "Legal"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs sm:text-sm font-semibold text-forge-text-primary mb-3 sm:mb-4">{col.title}</h4>
              <ul className="space-y-2 sm:space-y-3">
                {col.items.map((item) => (
                  <li key={item}><a href="#" className="text-xs sm:text-sm text-forge-text-tertiary hover:text-forge-text-secondary transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-forge-surface-elevated/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[11px] sm:text-xs text-forge-text-tertiary">&copy; {new Date().getFullYear()} FORGE. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6">
            <a href="#" className="text-[11px] sm:text-xs text-forge-text-tertiary hover:text-forge-text-secondary">Privacy</a>
            <a href="#" className="text-[11px] sm:text-xs text-forge-text-tertiary hover:text-forge-text-secondary">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}