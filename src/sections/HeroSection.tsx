import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, Sparkles } from "lucide-react"
import SwarmCanvas from "@/components/SwarmCanvas"

const headlineWords = ["Autonomous", "Agents", "That", "Build", "Products"]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
}

const wordVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0, 0, 0.2, 1] as const } },
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-forge-base">
      <SwarmCanvas />
      <div className="absolute inset-0 bg-gradient-to-b from-forge-base/30 via-transparent to-forge-base z-[2]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.08)_0%,_transparent_60%)] z-[2]" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-forge-blue/20 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forge-emerald opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-forge-emerald" />
          </span>
          <span className="text-sm text-forge-text-secondary">Swarm is operational</span>
          <Sparkles size={14} className="text-forge-amber" />
        </motion.div>
        <motion.h1 variants={containerVariants} initial="hidden" animate="visible"
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          {headlineWords.map((word, i) => (
            <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.3em]">{word}</motion.span>
          ))}
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.8 }}
          className="text-lg sm:text-xl text-forge-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
          FORGE deploys a swarm of AI agents to research trends, analyze markets, and build digital products — from concept to deployment.
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/dashboard" className="inline-flex items-center gap-2 bg-forge-blue hover:bg-forge-blue/90 text-white font-medium px-8 py-3.5 rounded-lg transition-all active:scale-[0.98] shadow-glow">
            Start Building <ArrowRight size={18} />
          </Link>
          <button className="inline-flex items-center gap-2 border border-forge-surface-elevated hover:border-forge-text-tertiary text-forge-text-primary font-medium px-8 py-3.5 rounded-lg transition-all active:scale-[0.98]">
            Watch Demo
          </button>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="mt-6 text-xs text-forge-text-tertiary">
          No credit card required
        </motion.p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 hero-fade z-[3]" />
    </section>
  )
}
