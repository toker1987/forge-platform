import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

const tiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    description: "Perfect for solo builders exploring autonomous development.",
    features: [
      "3 concurrent projects",
      "10K signals/month",
      "Basic business cases",
      "Community support",
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "$299",
    period: "/mo",
    description: "For serious teams shipping products at scale.",
    features: [
      "Unlimited projects",
      "100K signals/month",
      "Advanced analytics",
      "Priority build queue",
      "Custom domains",
      "Team collaboration",
    ],
    highlighted: true,
    cta: "Start Pro Trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Dedicated infrastructure and custom agent training.",
    features: [
      "Everything in Pro",
      "Unlimited signals",
      "Custom agent training",
      "SSO & SAML",
      "Dedicated support",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 sm:py-24 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-space-grotesk font-bold text-2xl sm:text-3xl md:text-4xl text-[#F8FAFC] mb-4">
            Simple Pricing
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto">
            Start free, scale as you ship. No hidden fees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }}
              whileHover={{ y: -4 }}
              className={`glass-card p-5 sm:p-6 flex flex-col ${
                tier.highlighted
                  ? "border-[#3B82F6] shadow-glow animate-pulse-glow"
                  : ""
              }`}
            >
              {tier.highlighted && (
                <span className="self-start text-xs font-semibold text-[#3B82F6] bg-[rgba(59,130,246,0.1)] px-3 py-1 rounded-full mb-4">
                  Most Popular
                </span>
              )}
              <h3 className="font-semibold text-lg text-[#F8FAFC] mb-1">
                {tier.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="font-space-grotesk font-bold text-3xl sm:text-4xl text-[#F8FAFC]">
                  {tier.price}
                </span>
                <span className="text-sm text-[#94A3B8]">{tier.period}</span>
              </div>
              <p className="text-sm text-[#94A3B8] mb-6">{tier.description}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check size={16} className="text-[#10B981] mt-0.5 shrink-0" />
                    <span className="text-sm text-[#94A3B8]">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2.5 rounded-lg font-medium transition-all active:scale-[0.98] ${
                  tier.highlighted
                    ? "bg-[#3B82F6] hover:bg-[#2563EB] text-white"
                    : "border border-[#334155] hover:border-[#64748B] text-[#F8FAFC]"
                }`}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
