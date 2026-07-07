import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import SwarmCanvas from "@/components/SwarmCanvas";

const headlineWords = ["Your", "Ideas.", "Built", "Autonomously."];

const wordVars = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#0B1120]">
      <SwarmCanvas />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0F172A] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(100,116,139,0.2)] bg-[rgba(30,41,59,0.5)] mb-6 sm:mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-xs sm:text-sm text-[#94A3B8]">
            2,847 projects shipped autonomously
          </span>
        </motion.div>

        {/* Headline — word by word */}
        <h1 className="font-space-grotesk font-bold text-[#F8FAFC] leading-[1.1] tracking-tight mb-4 sm:mb-6">
          <span className="block text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVars}
                initial="hidden"
                animate="visible"
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" as const }}
          className="text-base sm:text-lg md:text-xl text-[#94A3B8] max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed"
        >
          FORGE deploys autonomous AI agents to research trends, validate
          business cases, and build production-ready products — while you sleep.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75, ease: "easeOut" as const }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="/dashboard"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg transition-all active:scale-[0.98]"
          >
            Launch Your Idea
            <ArrowRight size={18} />
          </a>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 border border-[#334155] hover:border-[#64748B] text-[#F8FAFC] font-medium px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg transition-all">
            <Play size={18} />
            Watch Demo
          </button>
        </motion.div>

        {/* Trust bar */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8 sm:mt-12 text-xs text-[#64748B]"
        >
          Trusted by teams at Stripe, Vercel, Linear, and Notion
        </motion.p>
      </div>
    </section>
  );
}
