import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FolderKanban, Activity, TrendingUp, Hammer, CheckCircle2, Clock, ChevronRight, Zap, AlertCircle } from "lucide-react"
import GlassCard from "@/components/GlassCard"

const stats = [
  { label: "Active Projects", value: 12, icon: FolderKanban, color: "text-forge-blue" },
  { label: "Agents Active", value: 5, icon: Activity, color: "text-forge-emerald" },
  { label: "Trends", value: 47, icon: TrendingUp, color: "text-forge-amber" },
  { label: "Builds Done", value: 8, icon: Hammer, color: "text-forge-purple" },
]

const feedItems = [
  { agent: "Trend Scout", action: "Discovered 3 new signals in AI dev tools", time: "2m ago", type: "info" },
  { agent: "Business Analyst", action: "Completed case — confidence: 87%", time: "15m ago", type: "success" },
  { agent: "Orchestrator", action: "Approval required: Smart Contract Auditor", time: "32m ago", type: "warning" },
  { agent: "Builder Guild", action: "Frontend build complete for #2841", time: "1h ago", type: "success" },
  { agent: "QA", action: "Security scan passed — 0 critical issues", time: "2h ago", type: "success" },
  { agent: "Trend Scout", action: "Signal velocity dropping for no-code DBs", time: "3h ago", type: "info" },
  { agent: "Builder Guild", action: "Backend API tests failing — retrying", time: "4h ago", type: "error" },
]

const activeProjects = [
  { id: "2841", name: "AI Code Review Agent", status: "IN_BUILD", stage: "Frontend implementation", progress: 72 },
  { id: "2840", name: "Smart Contract Auditor", status: "CASE_BUILT", stage: "Awaiting approval", progress: 35 },
  { id: "2839", name: "DevOps Metrics Dashboard", status: "QA_REVIEW", stage: "Security scanning", progress: 91 },
  { id: "2838", name: "API Rate Limiter", status: "LIVE", stage: "Deployed", progress: 100 },
]

const statusConfig: Record<string, { class: string; label: string }> = {
  IDEA_SCOUTED: { class: "status-idea", label: "Researching" },
  CASE_BUILT: { class: "status-case", label: "Review" },
  IN_BUILD: { class: "status-build", label: "Building" },
  QA_REVIEW: { class: "status-qa", label: "QA" },
  LIVE: { class: "status-live", label: "Live" },
  REJECTED: { class: "status-rejected", label: "Rejected" },
}

export default function Dashboard() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <GlassCard className="flex items-center gap-3 sm:gap-4">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-forge-surface-elevated/50 flex items-center justify-center ${stat.color} shrink-0`}>
                <stat.icon size={16} className="sm:hidden" />
                <stat.icon size={20} className="hidden sm:block" />
              </div>
              <div className="min-w-0">
                <p className="text-lg sm:text-2xl font-bold text-forge-text-primary">{stat.value}</p>
                <p className="text-[10px] sm:text-xs text-forge-text-tertiary truncate">{stat.label}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
          <GlassCard className="p-3 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-sm sm:text-lg font-semibold text-forge-text-primary flex items-center gap-2">
                <Activity size={16} className="text-forge-blue sm:hidden" />
                <Activity size={18} className="text-forge-blue hidden sm:block" />
                Agent Activity
              </h2>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forge-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-forge-emerald" />
              </span>
            </div>
            <div className="space-y-2 sm:space-y-3 max-h-[350px] sm:max-h-[400px] overflow-y-auto scrollbar-hide pr-1">
              {feedItems.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-forge-surface/30 hover:bg-forge-surface/50 transition-colors">
                  {item.type === "success" && <CheckCircle2 size={14} className="text-forge-emerald shrink-0 mt-0.5 sm:hidden" />}
                  {item.type === "success" && <CheckCircle2 size={16} className="text-forge-emerald shrink-0 mt-0.5 hidden sm:block" />}
                  {item.type === "warning" && <AlertCircle size={14} className="text-forge-amber shrink-0 mt-0.5 sm:hidden" />}
                  {item.type === "warning" && <AlertCircle size={16} className="text-forge-amber shrink-0 mt-0.5 hidden sm:block" />}
                  {item.type === "error" && <AlertCircle size={14} className="text-forge-rose shrink-0 mt-0.5 sm:hidden" />}
                  {item.type === "error" && <AlertCircle size={16} className="text-forge-rose shrink-0 mt-0.5 hidden sm:block" />}
                  {item.type === "info" && <Zap size={14} className="text-forge-blue shrink-0 mt-0.5 sm:hidden" />}
                  {item.type === "info" && <Zap size={16} className="text-forge-blue shrink-0 mt-0.5 hidden sm:block" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-forge-text-primary"><span className="font-medium text-forge-blue">{item.agent}:</span>{" "}{item.action}</p>
                    <p className="text-[10px] sm:text-xs text-forge-text-tertiary mt-0.5 flex items-center gap-1"><Clock size={9} className="sm:hidden" /><Clock size={10} className="hidden sm:block" /> {item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <GlassCard className="p-3 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-sm sm:text-lg font-semibold text-forge-text-primary">Active</h2>
              <Link to="/projects" className="text-[10px] sm:text-xs text-forge-blue hover:underline flex items-center gap-0.5">View All <ChevronRight size={10} /></Link>
            </div>
            <div className="space-y-2.5 sm:space-y-3">
              {activeProjects.map((project) => {
                const status = statusConfig[project.status]
                return (
                  <Link key={project.id} to={`/projects/${project.id}/build`} className="block p-2.5 sm:p-3 rounded-lg bg-forge-surface/30 hover:bg-forge-surface/50 transition-colors">
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <p className="text-xs sm:text-sm font-medium text-forge-text-primary truncate pr-2">{project.name}</p>
                      <span className={`status-badge shrink-0 ${status.class}`}>{status.label}</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-forge-text-tertiary mb-1.5 sm:mb-2">{project.stage}</p>
                    <div className="w-full h-1.5 bg-forge-surface-elevated/30 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${project.progress}%`, background: project.progress === 100 ? "#10B981" : project.progress > 70 ? "#3B82F6" : project.progress > 35 ? "#A78BFA" : "#F59E0B" }} />
                    </div>
                  </Link>
                )
              })}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}