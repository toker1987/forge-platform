import { motion } from "framer-motion"
import { Radar, LineChart, Workflow, Code2, ShieldCheck } from "lucide-react"
import GlassCard from "@/components/GlassCard"

const agents = [
  { icon: Radar, name: "Trend Scout", desc: "Monitors GitHub, Product Hunt, Reddit, and X for emerging trends with signal strength scoring.", accent: "amber" as const },
  { icon: LineChart, name: "Business Analyst", desc: "Transforms raw signals into viable business cases with TAM/SAM/SOM analysis and competitive scans.", accent: "blue" as const },
  { icon: Workflow, name: "Orchestrator PM", desc: "Manages the pipeline, holds approval gates, routes between agents, and tracks budget against quotas.", accent: "purple" as const },
  { icon: Code2, name: "Builder Guild", desc: "Architect, Frontend, Backend, and QA agents that build in sandboxed, network-restricted environments.", accent: "emerald" as const },
  { icon: ShieldCheck, name: "QA & Deploy", desc: "Security scans, linting, dependency audits, and isolated staging previews — never unsupervised.", accent: "rose" as const },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const } },
}

export default function AgentSwarmSection() {
  return (
    <section id="features" className="py-24 px-6 bg-forge-base">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-forge-text-primary mb-4">Five Agents. One Swarm.</h2>
          <p className="text-forge-text-secondary max-w-xl mx-auto">Each agent specializes in a stage of the product lifecycle. Together, they form an autonomous pipeline.</p>
        </motion.div>
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <motion.div key={agent.name} variants={item}>
              <GlassCard accentColor={agent.accent} className="h-full">
                <div className={`w-10 h-10 rounded-lg bg-forge-${agent.accent}/10 flex items-center justify-center mb-4`}>
                  <agent.icon size={20} className={`text-forge-${agent.accent}`} />
                </div>
                <h3 className="text-lg font-semibold text-forge-text-primary mb-2">{agent.name}</h3>
                <p className="text-sm text-forge-text-secondary leading-relaxed">{agent.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
          <motion.div variants={item}>
            <GlassCard accentColor="blue" className="h-full flex flex-col justify-center items-center text-center">
              <div className="w-10 h-10 rounded-full bg-forge-blue/10 flex items-center justify-center mb-4"><Workflow size={20} className="text-forge-blue" /></div>
              <h3 className="text-lg font-semibold text-forge-text-primary mb-2">Ready to deploy your swarm?</h3>
              <p className="text-sm text-forge-text-secondary mb-4">Start with a single trend signal and watch the full pipeline execute.</p>
              <a href="#pricing" className="text-sm font-medium text-forge-blue hover:underline">View Pricing</a>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
