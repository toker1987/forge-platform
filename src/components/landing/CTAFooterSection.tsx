import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTAFooterSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#0F172A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <h2 className="font-space-grotesk font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#F8FAFC] mb-4 sm:mb-6">
            Ready to Build Autonomously?
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto mb-8 sm:mb-10">
            Join thousands of builders using FORGE to turn ideas into
            production-ready products — without writing a line of code.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="/dashboard"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg transition-all active:scale-[0.98]"
            >
              Launch Your Idea
              <ArrowRight size={18} />
            </a>
            <a
              href="/login"
              className="w-full sm:w-auto flex items-center justify-center gap-2 border border-[#334155] hover:border-[#64748B] text-[#F8FAFC] font-medium px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg transition-all"
            >
              Sign In
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
