import { Link } from "react-router-dom"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-forge-surface-dark border-t border-forge-surface-elevated/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-display text-xl font-bold text-forge-text-primary">FORGE</Link>
            <p className="mt-3 text-sm text-forge-text-tertiary leading-relaxed">
              Autonomous agents that research trends, analyze markets, and build digital products.
            </p>
            <div className="flex gap-4 mt-5">
              <a href="#" className="text-forge-text-tertiary hover:text-forge-text-primary transition-colors"><Github size={18} /></a>
              <a href="#" className="text-forge-text-tertiary hover:text-forge-text-primary transition-colors"><Twitter size={18} /></a>
              <a href="#" className="text-forge-text-tertiary hover:text-forge-text-primary transition-colors"><Linkedin size={18} /></a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-forge-text-primary mb-4">Product</h4>
            <ul className="space-y-3">
              {["Features", "Pricing", "Changelog", "Roadmap"].map((item) => (
                <li key={item}><a href="#" className="text-sm text-forge-text-tertiary hover:text-forge-text-secondary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-forge-text-primary mb-4">Resources</h4>
            <ul className="space-y-3">
              {["Documentation", "API Reference", "Community", "Blog"].map((item) => (
                <li key={item}><a href="#" className="text-sm text-forge-text-tertiary hover:text-forge-text-secondary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-forge-text-primary mb-4">Company</h4>
            <ul className="space-y-3">
              {["About", "Careers", "Contact", "Legal"].map((item) => (
                <li key={item}><a href="#" className="text-sm text-forge-text-tertiary hover:text-forge-text-secondary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-forge-surface-elevated/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-forge-text-tertiary">&copy; {new Date().getFullYear()} FORGE. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-forge-text-tertiary hover:text-forge-text-secondary">Privacy</a>
            <a href="#" className="text-xs text-forge-text-tertiary hover:text-text-secondary">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
