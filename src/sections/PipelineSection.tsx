import { motion } from "framer-motion"
import { Lightbulb, Search, BarChart3, Hammer, Rocket } from "lucide-react"

const stages = [
  { icon: Lightbulb, label: "IDEA", desc: "Submit a product idea or niche to watch", color: "#F59E0B" },
  { icon: Search, label: "SCOUT", desc: "Trend Scout gathers evidence from multiple sources", color: "#3B82F6" },
  { icon: BarChart3, label: "ANALYZE", desc: "Business Analyst builds the case with market data", color: "#A78BFA" },
  { icon: Hammer, label: "BUILD", desc: "Builder Guild architects and implements the product", color: "#10B981" },
  { icon: Rocket, label: "DEPLOY", desc: "QA verifies and deploys to isolated staging", color: "#F43F5E" },
]

export default function PipelineSection() {
  return (
    <section className="py-24 px-6 bg-forge-surface-dark/50">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-forge-text-primary mb-4">From Idea to Deployment</h2>
          <p className="text-forge-text-secondary max-w-xl mx-auto">A fully autonomous pipeline with human approval gates at critical decision points.</p>
        </motion.div>
        <div className="hidden md:block relative">
          <div className="absolute top-[2.25rem] left-[10%] right-[10%] h-0.5 bg-forge-surface-elevated/30" />
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }} className="absolute top-[2.25rem] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-forge-amber via-forge-blue to-forge-emerald origin-left" />
          <div className="flex justify-between relative z-10">
            {stages.map((stage, i) => (
              <motion.div key={stage.label} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }} className="flex flex-col items-center text-center w-40">
                <div className="w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-110"
                  style={{ background: `radial-gradient(circle, ${stage.color}20 0%, ${stage.color}08 70%)`, border: `2px solid ${stage.color}40`, boxShadow: `0 0 20px ${stage.color}20` }}>
                  <stage.icon size={22} style={{ color: stage.color }} />
                </div>
                <span className="text-xs font-bold tracking-widest mb-2" style={{ color: stage.color }}>{stage.label}</span>
                <p className="text-xs text-forge-text-tertiary leading-relaxed">{stage.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="md:hidden space-y-6 relative">
          <div className="absolute left-[1.35rem] top-4 bottom-4 w-0.5 bg-forge-surface-elevated/30" />
          {stages.map((stage, i) => (
            <motion.div key={stage.label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }} className="flex items-start gap-4 relative z-10">
              <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                style={{ background: `radial-gradient(circle, ${stage.color}20 0%, ${stage.color}08 70%)`, border: `2px solid ${stage.color}40`, boxShadow: `0 0 12px ${stage.color}20` }}>
                <stage.icon size={18} style={{ color: stage.color }} />
              </div>
              <div>
                <span className="text-xs font-bold tracking-widest" style={{ color: stage.color }}>{stage.label}</span>
                <p className="text-sm text-forge-text-tertiary mt-1 leading-relaxed">{stage.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
