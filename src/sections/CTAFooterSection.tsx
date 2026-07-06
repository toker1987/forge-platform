import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export default function CTAFooterSection() {
  return (
    <section className="py-24 px-6 bg-forge-base">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forge-text-primary mb-6 tracking-tight">Ready to Build Autonomously?</h2>
        <p className="text-lg text-forge-text-secondary mb-10 max-w-xl mx-auto">Deploy your first swarm today. From trend signal to working product in under 48 hours.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/dashboard" className="inline-flex items-center gap-2 bg-forge-blue hover:bg-forge-blue/90 text-white font-medium px-8 py-3.5 rounded-lg transition-all active:scale-[0.98] shadow-glow">
            Start Building Free <ArrowRight size={18} />
          </Link>
          <a href="#" className="inline-flex items-center gap-2 border border-forge-surface-elevated hover:border-forge-text-tertiary text-forge-text-primary font-medium px-8 py-3.5 rounded-lg transition-all">Read the Docs</a>
        </div>
      </motion.div>
    </section>
  )
}
