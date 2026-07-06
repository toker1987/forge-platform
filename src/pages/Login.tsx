import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Eye, EyeOff, Github } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-forge-base flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.06)_0%,_transparent_60%)]" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="font-display text-3xl font-bold text-forge-text-primary">FORGE</Link>
          <p className="text-sm text-forge-text-secondary mt-2">Sign in to your account</p>
        </div>
        <div className="glass-card p-8">
          <button className="w-full flex items-center justify-center gap-2 bg-forge-surface hover:bg-forge-surface-elevated/30 text-forge-text-primary text-sm font-medium py-2.5 rounded-lg border border-forge-surface-elevated/30 transition-all mb-6">
            <Github size={18} /> Continue with GitHub
          </button>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-forge-surface-elevated/30" />
            <span className="text-xs text-forge-text-tertiary">or</span>
            <div className="flex-1 h-px bg-forge-surface-elevated/30" />
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label className="text-xs text-forge-text-tertiary mb-1 block">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                className="w-full bg-forge-base border border-forge-surface-elevated/30 rounded-lg px-4 py-2.5 text-sm text-forge-text-primary placeholder:text-forge-text-tertiary focus:outline-none focus:border-forge-blue focus:ring-2 focus:ring-forge-blue/20" />
            </div>
            <div>
              <label className="text-xs text-forge-text-tertiary mb-1 block">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full bg-forge-base border border-forge-surface-elevated/30 rounded-lg px-4 py-2.5 pr-10 text-sm text-forge-text-primary placeholder:text-forge-text-tertiary focus:outline-none focus:border-forge-blue focus:ring-2 focus:ring-forge-blue/20" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-forge-text-tertiary hover:text-forge-text-primary">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full bg-forge-blue hover:bg-forge-blue/90 text-white font-medium py-2.5 rounded-lg transition-all active:scale-[0.98]">Sign In</button>
          </form>
          <p className="text-center text-xs text-forge-text-tertiary mt-6">Don&apos;t have an account? <a href="#" className="text-forge-blue hover:underline">Sign up</a></p>
        </div>
        <p className="text-center text-xs text-forge-text-tertiary mt-6"><Link to="/" className="hover:text-forge-text-secondary transition-colors">&larr; Back to home</Link></p>
      </motion.div>
    </div>
  )
}
