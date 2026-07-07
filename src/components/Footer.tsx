import { motion } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog"],
  Resources: ["Docs", "API", "Community"],
  Company: ["About", "Blog", "Contact"],
};

export default function Footer() {
  return (
    <footer className="bg-[#0B1120] border-t border-[rgba(100,116,139,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
            className="col-span-2 md:col-span-1"
          >
            <h3 className="font-space-grotesk font-bold text-lg text-[#F8FAFC] mb-2">
              FORGE
            </h3>
            <p className="text-sm text-[#94A3B8]">
              Autonomous Product Development
            </p>
          </motion.div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (i + 1), ease: "easeOut" as const }}
            >
              <h4 className="font-semibold text-sm text-[#F8FAFC] mb-4">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <span className="text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[rgba(100,116,139,0.1)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#64748B]">
            &copy; 2026 FORGE. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[#64748B] hover:text-[#F8FAFC] transition-colors cursor-pointer">
              <Github size={18} />
            </span>
            <span className="text-[#64748B] hover:text-[#F8FAFC] transition-colors cursor-pointer">
              <Twitter size={18} />
            </span>
            <span className="text-[#64748B] hover:text-[#F8FAFC] transition-colors cursor-pointer">
              <Linkedin size={18} />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
