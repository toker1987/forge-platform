import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const stats = [
  { value: 2847, suffix: "+", label: "Projects Shipped" },
  { value: 180, suffix: "K+", label: "Hours Saved" },
  { value: 12, suffix: "M+", label: "Signals Processed" },
  { value: 99.97, suffix: "%", label: "Uptime", isDecimal: true },
]

const testimonials = [
  { quote: "FORGE turned a vague trend signal into a working MVP in 48 hours. The business case analysis alone saved us weeks of research.", name: "Sarah Chen", role: "VP Product, Vercel" },
  { quote: "The autonomous builder guild is remarkable. Architecture decisions were sound, code quality was high, and the sandbox preview let us validate before deploying.", name: "Marcus Johnson", role: "CTO, Linear" },
  { quote: "We use FORGE as our internal R&D engine. It scouts opportunities we would have missed and builds prototypes while we sleep.", name: "Elena Rodriguez", role: "Head of Innovation, Stripe" },
]

function AnimatedCounter({ value, suffix, isDecimal }: { value: number; suffix: string; isDecimal?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1500
    const startTime = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(eased * value)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, value])

  const display = isDecimal ? count.toFixed(2) : Math.floor(count).toLocaleString()
  return <span ref={ref}>{display}{suffix}</span>
}

export default function SocialProofSection() {
  return (
    <section className="py-24 px-6 bg-forge-surface-dark/30">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl sm:text-4xl font-bold text-forge-text-primary mb-1"><AnimatedCounter value={stat.value} suffix={stat.suffix} isDecimal={stat.isDecimal} /></div>
              <p className="text-sm text-forge-text-tertiary">{stat.label}</p>
            </div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-forge-text-primary mb-4">Trusted by Builders</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="glass-card p-6">
              <p className="text-sm text-forge-text-secondary leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-forge-surface-elevated flex items-center justify-center text-xs font-bold text-forge-text-secondary">{t.name.split(" ").map((n) => n[0]).join("")}</div>
                <div><p className="text-sm font-medium text-forge-text-primary">{t.name}</p><p className="text-xs text-forge-text-tertiary">{t.role}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
