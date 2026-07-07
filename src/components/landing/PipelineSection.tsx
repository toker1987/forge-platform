import { motion } from "framer-motion";
import { Search, FileCheck, ClipboardList, Hammer, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Stage {
  icon: LucideIcon;
  name: string;
  description: string;
}

const stages: Stage[] = [
  { icon: Search, name: "Discover", description: "Trend scouting & signal detection" },
  { icon: FileCheck, name: "Validate", description: "Business case & market analysis" },
  { icon: ClipboardList, name: "Plan", description: "Project structure & task breakdown" },
  { icon: Hammer, name: "Build", description: "Full-stack development & iteration" },
  { icon: Rocket, name: "Deploy", description: "QA, security scan & launch" },
];

export default function PipelineSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#0B1120]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-space-grotesk font-bold text-2xl sm:text-3xl md:text-4xl text-[#F8FAFC] mb-4">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto">
            From raw signal to shipped product — our pipeline orchestrates the
            entire journey.
          </p>
        </motion.div>

        {/* Mobile: Vertical */}
        <div className="sm:hidden relative pl-4">
          <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#3B82F6] via-[#A78BFA] to-[#10B981]" />
          {stages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }}
                className="relative flex items-start gap-4 mb-6"
              >
                <div className="w-10 h-10 rounded-full bg-[#0F172A] border-2 border-[#3B82F6] flex items-center justify-center z-10 shrink-0">
                  <Icon size={16} className="text-[#3B82F6]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#F8FAFC]">{stage.name}</h3>
                  <p className="text-sm text-[#94A3B8]">{stage.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop: Horizontal */}
        <div className="hidden sm:block relative">
          {/* Connecting line */}
          <div className="absolute top-[28px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#3B82F6] via-[#A78BFA] to-[#10B981]" />

          <div className="relative flex justify-between">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              return (
                <motion.div
                  key={stage.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.12,
                    ease: "easeOut" as const,
                  }}
                  className="flex flex-col items-center text-center"
                  style={{ width: "18%" }}
                >
                  <div className="w-14 h-14 rounded-full bg-[#0F172A] border-2 border-[#3B82F6] flex items-center justify-center mb-4 relative z-10 shadow-glow">
                    <Icon size={22} className="text-[#3B82F6]" />
                  </div>
                  <h3 className="font-semibold text-[#F8FAFC] mb-1">{stage.name}</h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{stage.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
