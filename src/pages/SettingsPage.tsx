import { useState } from "react"
import { motion } from "framer-motion"
import { User, Bell, Shield, Key } from "lucide-react"

const TABS = [
  { id: "account", label: "Account", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "api", label: "API Keys", icon: Key },
]

function Toggle({ label, desc, defaultOn = false }: { label: string; desc: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
      <div>
        <p className="text-[12px] font-medium text-white">{label}</p>
        <p className="text-[11px] text-[#475569]">{desc}</p>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`w-9 h-5 rounded-full transition-colors relative ${on ? "bg-[#3B82F6]" : "bg-[#1e293b]"}`}
      >
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${on ? "translate-x-4" : "translate-x-0.5"}`} />
      </button>
    </div>
  )
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Settings</h1>
        <p className="text-[12px] text-[#475569] mt-0.5">Manage your account preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-white/[0.02] border border-white/[0.06] rounded-lg w-fit">
        {TABS.map(t => {
          const Icon = t.icon
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all ${
                activeTab === t.id ? "bg-white/[0.06] text-white" : "text-[#475569] hover:text-[#94a3b8]"
              }`}
            >
              <Icon size={14} />
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Account Tab */}
      {activeTab === "account" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-[13px] font-semibold text-white mb-4">Profile</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] text-[#475569] mb-1.5">Display Name</label>
                <input
                  type="text" defaultValue="Alex Chen"
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] text-white focus:border-[#3B82F6]/50 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#475569] mb-1.5">Email</label>
                <input
                  type="email" defaultValue="alex@forge.dev"
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] text-white focus:border-[#3B82F6]/50 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#475569] mb-1.5">Company</label>
                <input
                  type="text" defaultValue="Forge Labs"
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] text-white focus:border-[#3B82F6]/50 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-[13px] font-semibold text-white mb-2">Subscription</h3>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full">PRO PLAN</span>
              <span className="text-[11px] text-[#475569]">Renews on Aug 15, 2025</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5"
        >
          <h3 className="text-[13px] font-semibold text-white mb-2">Notification Preferences</h3>
          <Toggle label="Build completions" desc="Get notified when a build finishes" defaultOn />
          <Toggle label="New project approvals" desc="Notifications for case decisions" defaultOn />
          <Toggle label="Agent alerts" desc="Warnings or errors from agents" />
          <Toggle label="Weekly digest" desc="Summary of all activity" defaultOn />
          <Toggle label="Marketing emails" desc="Product updates and tips" />
        </motion.div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-[13px] font-semibold text-white mb-4">Change Password</h3>
            <div className="space-y-3">
              <input
                type="password" placeholder="Current password"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] text-white placeholder-[#334155] focus:border-[#3B82F6]/50 focus:outline-none transition-colors"
              />
              <input
                type="password" placeholder="New password"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] text-white placeholder-[#334155] focus:border-[#3B82F6]/50 focus:outline-none transition-colors"
              />
              <input
                type="password" placeholder="Confirm new password"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] text-white placeholder-[#334155] focus:border-[#3B82F6]/50 focus:outline-none transition-colors"
              />
              <button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-[12px] font-medium px-4 py-2 rounded-lg transition-colors">
                Update Password
              </button>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-[13px] font-semibold text-white mb-2">Two-Factor Authentication</h3>
            <p className="text-[11px] text-[#475569] mb-3">Add an extra layer of security to your account</p>
            <Toggle label="Enable 2FA" desc="Require OTP code on login" />
          </div>
        </motion.div>
      )}

      {/* API Keys Tab */}
      {activeTab === "api" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5"
        >
          <h3 className="text-[13px] font-semibold text-white mb-4">API Keys</h3>
          <div className="space-y-3">
            {[
              { name: "Production Key", key: "forge_pk_live_••••••••••••x7k9m", created: "Jul 1, 2025" },
              { name: "Development Key", key: "forge_pk_dev_••••••••••••a3b2c", created: "Jun 15, 2025" },
            ].map(k => (
              <div key={k.name} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                <div>
                  <p className="text-[12px] font-medium text-white">{k.name}</p>
                  <p className="text-[11px] text-[#475569] font-mono">{k.key}</p>
                  <p className="text-[10px] text-[#334155]">Created {k.created}</p>
                </div>
                <button className="text-[11px] text-[#F43F5E] hover:text-[#F43F5E]/80 transition-colors">
                  Revoke
                </button>
              </div>
            ))}
          </div>
          <button className="mt-4 flex items-center gap-1.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-[12px] font-medium px-4 py-2 rounded-lg transition-colors">
            <Key size={14} /> Generate New Key
          </button>
        </motion.div>
      )}
    </div>
  )
}
