import { motion } from "framer-motion"
import { Check } from "lucide-react"

const plans = [
  { name: "Starter", price: "$49", period: "/mo", desc: "Read-only trend reports. Limited runs per month.", features: ["Trend signal reports", "5 scout runs / month", "Community support", "Basic analytics"], cta: "Get Started", highlighted: false },
  { name: "Pro", price: "$299", period: "/mo", desc: "Full pipeline through BusinessCase with sandboxed previews.", features: ["Everything in Starter", "Unlimited scout + analyst", "Sandboxed preview deploys", "20 builder runs / month", "Priority support", "Team collaboration"], cta: "Start Building", highlighted: true },
  { name: "Enterprise", price: "Custom", period: "", desc: "White-label, dedicated capacity, SLA, and your own API keys.", features: ["Everything in Pro", "White-label deployment", "Dedicated sandbox capacity", "Custom SLA", "SSO & advanced security", "Dedicated account manager"], cta: "Contact Sales", highlighted: false },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-6 bg-forge-base">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-forge-text-primary mb-4">Simple, Transparent Pricing</h2>
          <p className="text-forge-text-secondary max-w-xl mx-auto">Pay for what you use. Upgrade or downgrade at any time.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative rounded-xl p-6 lg:p-8 flex flex-col ${plan.highlighted ? "bg-forge-surface border-2 border-forge-blue shadow-glow" : "bg-forge-surface/50 border border-forge-surface-elevated/20"}`}>
              {plan.highlighted && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><span className="bg-forge-blue text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">Most Popular</span></div>}
              <h3 className="text-lg font-semibold text-forge-text-primary mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-0.5 mb-3"><span className="text-3xl font-bold text-forge-text-primary">{plan.price}</span>{plan.period && <span className="text-forge-text-tertiary text-sm">{plan.period}</span>}</div>
              <p className="text-sm text-forge-text-secondary mb-6">{plan.desc}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-forge-text-secondary"><Check size={16} className={`shrink-0 mt-0.5 ${plan.highlighted ? "text-forge-blue" : "text-forge-emerald"}`} />{f}</li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-lg font-medium text-sm transition-all active:scale-[0.98] ${plan.highlighted ? "bg-forge-blue hover:bg-forge-blue/90 text-white shadow-glow" : "bg-forge-surface-elevated/30 hover:bg-forge-surface-elevated/50 text-forge-text-primary border border-forge-surface-elevated/30"}`}>{plan.cta}</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
