import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Search, Plus, MoreHorizontal, Clock } from "lucide-react"
import GlassCard from "@/components/GlassCard"

type Status = "IDEA_SCOUTED" | "CASE_BUILT" | "IN_BUILD" | "QA_REVIEW" | "LIVE" | "REJECTED"
type TenantMode = "internal" | "client"

interface Project {
  id: string; name: string; status: Status; mode: TenantMode; niche: string; signalStrength: number; lastUpdated: string
}

const statusConfig: Record<Status, { class: string; label: string }> = {
  IDEA_SCOUTED: { class: "status-idea", label: "Researching" },
  CASE_BUILT: { class: "status-case", label: "Review" },
  IN_BUILD: { class: "status-build", label: "Building" },
  QA_REVIEW: { class: "status-qa", label: "QA" },
  LIVE: { class: "status-live", label: "Live" },
  REJECTED: { class: "status-rejected", label: "Rejected" },
}

const mockProjects: Project[] = [
  { id: "2841", name: "AI Code Review Agent", status: "IN_BUILD", mode: "internal", niche: "dev-tools", signalStrength: 92, lastUpdated: "5m ago" },
  { id: "2840", name: "Smart Contract Auditor", status: "CASE_BUILT", mode: "client", niche: "web3", signalStrength: 87, lastUpdated: "32m ago" },
  { id: "2839", name: "DevOps Metrics Dashboard", status: "QA_REVIEW", mode: "internal", niche: "devops", signalStrength: 78, lastUpdated: "1h ago" },
  { id: "2838", name: "API Rate Limiter", status: "LIVE", mode: "internal", niche: "infra", signalStrength: 95, lastUpdated: "3h ago" },
  { id: "2837", name: "No-Code DB Builder", status: "REJECTED", mode: "internal", niche: "nocode", signalStrength: 42, lastUpdated: "1d ago" },
  { id: "2836", name: "AI Test Generator", status: "LIVE", mode: "client", niche: "qa", signalStrength: 89, lastUpdated: "2d ago" },
  { id: "2835", name: "Prompt Engineering Studio", status: "IDEA_SCOUTED", mode: "internal", niche: "ai", signalStrength: 71, lastUpdated: "5h ago" },
  { id: "2834", name: "Security Scanner SaaS", status: "IN_BUILD", mode: "client", niche: "security", signalStrength: 84, lastUpdated: "6h ago" },
]

export default function Projects() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all")
  const [modeFilter, setModeFilter] = useState<TenantMode | "all">("all")

  const filtered = mockProjects.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
    if (statusFilter !== "all" && p.status !== statusFilter) return false
    if (modeFilter !== "all" && p.mode !== modeFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-forge-text-primary">Projects</h1>
          <p className="text-sm text-forge-text-secondary mt-1">{filtered.length} project{filtered.length !== 1 ? "s" : ""}</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-forge-blue hover:bg-forge-blue/90 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all active:scale-[0.98]">
          <Plus size={16} /> New Project
        </button>
      </div>
      <GlassCard className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-forge-text-tertiary" />
          <input type="text" placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-forge-base border border-forge-surface-elevated/30 rounded-lg pl-9 pr-4 py-2 text-sm text-forge-text-primary placeholder:text-forge-text-tertiary focus:outline-none focus:border-forge-blue focus:ring-2 focus:ring-forge-blue/20" />
        </div>
        <div className="flex gap-2">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as Status | "all")}
            className="bg-forge-base border border-forge-surface-elevated/30 rounded-lg px-3 py-2 text-sm text-forge-text-primary focus:outline-none focus:border-forge-blue">
            <option value="all">All Status</option>
            {Object.entries(statusConfig).map(([key, { label }]) => (<option key={key} value={key}>{label}</option>))}
          </select>
          <select value={modeFilter} onChange={(e) => setModeFilter(e.target.value as TenantMode | "all")}
            className="bg-forge-base border border-forge-surface-elevated/30 rounded-lg px-3 py-2 text-sm text-forge-text-primary focus:outline-none focus:border-forge-blue">
            <option value="all">All Modes</option>
            <option value="internal">Internal</option>
            <option value="client">Client</option>
          </select>
        </div>
      </GlassCard>
      <GlassCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-forge-surface-elevated/20">
                <th className="text-left text-xs font-semibold text-forge-text-tertiary uppercase tracking-wider px-6 py-3">Project</th>
                <th className="text-left text-xs font-semibold text-forge-text-tertiary uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-forge-text-tertiary uppercase tracking-wider px-4 py-3">Mode</th>
                <th className="text-left text-xs font-semibold text-forge-text-tertiary uppercase tracking-wider px-4 py-3">Signal</th>
                <th className="text-left text-xs font-semibold text-forge-text-tertiary uppercase tracking-wider px-4 py-3">Updated</th>
                <th className="text-right text-xs font-semibold text-forge-text-tertiary uppercase tracking-wider px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((project, i) => (
                <motion.tr key={project.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-b border-forge-surface-elevated/10 hover:bg-forge-surface/20 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <Link to={`/projects/${project.id}/build`} className="text-sm font-medium text-forge-text-primary hover:text-forge-blue transition-colors">{project.name}</Link>
                      <p className="text-xs text-forge-text-tertiary mt-0.5">ID: {project.id} &middot; {project.niche}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4"><span className={`status-badge ${statusConfig[project.status].class}`}>{statusConfig[project.status].label}</span></td>
                  <td className="px-4 py-4"><span className={`text-xs font-medium capitalize ${project.mode === "client" ? "text-forge-purple" : "text-forge-text-secondary"}`}>{project.mode}</span></td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-forge-surface-elevated/30 rounded-full overflow-hidden"><div className="h-full rounded-full bg-forge-blue" style={{ width: `${project.signalStrength}%` }} /></div>
                      <span className="text-xs text-forge-text-secondary">{project.signalStrength}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4"><span className="text-xs text-forge-text-tertiary flex items-center gap-1"><Clock size={10} /> {project.lastUpdated}</span></td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {project.status === "CASE_BUILT" && (
                        <Link to={`/projects/${project.id}/case`} className="text-xs bg-forge-blue/10 text-forge-blue hover:bg-forge-blue/20 px-3 py-1.5 rounded-md transition-colors font-medium">Review</Link>
                      )}
                      <button className="p-1.5 text-forge-text-tertiary hover:text-forge-text-primary rounded-md hover:bg-forge-surface transition-colors"><MoreHorizontal size={14} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="py-12 text-center"><p className="text-sm text-forge-text-tertiary">No projects match your filters.</p></div>}
      </GlassCard>
    </div>
  )
}
