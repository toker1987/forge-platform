import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { Quote } from "lucide-react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 2847, suffix: "+", label: "Projects Shipped" },
  { value: 180, suffix: "K+", label: "Hours Saved" },
  { value: 12, suffix: "M+", label: "Signals Processed" },
  { value: 99.97, suffix: "%", label: "Uptime" },
];

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "FORGE shipped our MVP in 72 hours. What would have taken our team 3 months was done autonomously while we focused on strategy.",
    author: "Sarah Chen",
    role: "CTO, Velocity Labs",
  },
  {
    quote: "The business case validation alone saved us from building the wrong product. The agent swarm caught a market shift we missed.",
    author: "Marcus Johnson",
    role: "Product Lead, Nexus Inc",
  },
  {
    quote: "We've shipped 14 products with FORGE. The quality keeps improving — the agents literally learn from each build.",
    author: "Elena Rodriguez",
    role: "Founder, Autonomous Ventures",
  },
];

function StatCard({ stat }: { stat: Stat }) {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const count = useCountUp({ end: stat.value, duration: 1500, isInView });

  return (
    <div ref={ref} className="text-center">
      <div className="font-space-grotesk font-bold text-3xl sm:text-4xl md:text-5xl text-[#F8FAFC] mb-1">
        {stat.value % 1 !== 0 ? count.toFixed(2) : count}
        {stat.suffix}
      </div>
      <p className="text-sm text-[#94A3B8]">{stat.label}</p>
    </div>
  );
}

export default function SocialProofSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#0B1120]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }}
            >
              <StatCard stat={stat} />
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="font-space-grotesk font-bold text-xl sm:text-2xl md:text-3xl text-[#F8FAFC]">
            Trusted by Builders
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }}
              className="glass-card p-5 sm:p-6"
            >
              <Quote size={20} className="text-[#3B82F6] mb-4" />
              <p className="text-sm sm:text-base text-[#94A3B8] mb-6 leading-relaxed">
                "{t.quote}"
              </p>
              <div>
                <p className="font-medium text-sm text-[#F8FAFC]">{t.author}</p>
                <p className="text-xs text-[#64748B]">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
