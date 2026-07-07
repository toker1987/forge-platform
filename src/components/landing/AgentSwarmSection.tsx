import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Users, Code2, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Agent {
  icon: LucideIcon;
  name: string;
  description: string;
  capabilities: string[];
  accent: string;
  glow: string;
}

const agents: Agent[] = [
  {
    icon: TrendingUp,
    name: "Trend Scout",
    description: "Continuously monitors market signals, social trends, and search data to discover high-opportunity product ideas.",
    capabilities: ["Social listening", "Search trend analysis", "Competitor tracking"],
    accent: "#F59E0B",
    glow: "shadow-glow-amber",
  },
  {
    icon: BarChart3,
    name: "Business Analyst",
    description: "Validates ideas with TAM/SAM/SOM analysis, competitive scans, and revenue projections before a line of code is written.",
    capabilities: ["Market sizing", "Competitive analysis", "Revenue modeling"],
    accent: "#3B82F6",
    glow: "shadow-glow",
  },
  {
    icon: Users,
    name: "PM Orchestrator",
    description: "Structures projects into actionable tasks, manages dependencies, and coordinates the builder guild.",
    capabilities: ["Task breakdown", "Dependency mapping", "Timeline management"],
    accent: "#A78BFA",
    glow: "shadow-glow",
  },
  {
    icon: Code2,
    name: "Builder Guild",
    description: "Full-stack engineering agents that architect, code, and deploy production-ready applications.",
    capabilities: ["Frontend & Backend", "Database design", "CI/CD pipeline"],
    accent: "#10B981",
    glow: "shadow-glow-emerald",
  },
  {
    icon: Shield,
    name: "QA & Deploy",
    description: "Automated testing, security scanning, and zero-downtime deployment with real-time monitoring.",
    capabilities: ["Automated testing", "Security scanning", "Zero-downtime deploy"],
    accent: "#F43F5E",
    glow: "shadow-glow-rose",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

export default function AgentSwarmSection() {
  return (
    <section id="features" className="py-16 sm:py-24 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-space-grotesk font-bold text-2xl sm:text-3xl md:text-4xl text-[#F8FAFC] mb-4">
            The Agent Swarm
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto">
            Five specialized agents working in concert to take your idea from
            concept to live product.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {agents.map((agent, i) => {
            const Icon = agent.icon;
            return (
              <motion.div
                key={agent.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`glass-card p-5 sm:p-6 ${agent.glow} transition-shadow duration-300 hover:shadow-glow-strong`}
                style={{ borderTop: `2px solid ${agent.accent}` }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${agent.accent}15` }}
                >
                  <Icon size={20} style={{ color: agent.accent }} />
                </div>
                <h3 className="font-semibold text-base sm:text-lg text-[#F8FAFC] mb-2">
                  {agent.name}
                </h3>
                <p className="text-sm text-[#94A3B8] mb-4 leading-relaxed">
                  {agent.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {agent.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="text-xs px-2.5 py-1 rounded-full border border-[rgba(100,116,139,0.2)] text-[#94A3B8]"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
