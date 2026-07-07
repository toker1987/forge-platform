import { useMemo } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { trpc } from "@/providers/trpc"
import { MOCK_PROJECTS, MOCK_AGENT_LOGS } from "@/lib/mock-data"
import {
  FolderKanban,
  Bot,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Activity,
} from "lucide-react"

/* ─── Stat Card ─────────────────────────────────────────────────── */
function StatCard({ label, value, change, icon: Icon, iconColor, delay }: {
  label: string; value: string; change: string
  icon: React.ElementType; iconColor: string; delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" as const }}
      className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.1] transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] text-[#475569] font-medium uppercase tracking-wider">{label}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${iconColor}15` }}>
          <Icon size={15} style={{ color: iconColor }} />
        </div>
      </div>
      <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
      <div className="text-[11px] text-[#475569] mt-1">{change}</div>
    </motion.div>
  )
}

/* ─── Agent Log Entry ───────────────────────────────────────────── */
function LogEntry({ time, agent, message, color, index }: {
  time: string; agent: string; message: string; color: string; index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03, ease: "easeOut" as const }}
      className="flex items-start gap-3 py-2 border-b border-white/[0.03] last:border-0"
    >
      <span className="text-[10px] text-[#334155] font-mono w-14 shrink-0 pt-0.5">{time}</span>
      <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: color }} />
      <div className="min-w-0 flex-1">
        <span className="text-[11px] font-medium" style={{ color }}>{agent}</span>
        <span className="text-[11px] text-[#475569] ml-2">{message}</span>
      </div>
    </motion.div>
  )
}

/* ─── Format time ago ───────────────────────────────────────────── */
function timeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  const s = Math.floor((Date.now() - d.getTime()) / 1000)
  if (s < 60) return "now"
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h`
  return `${Math.floor(h / 24)}d`
}

function fmtTime(date: Date | string): string {
  return new Date(date).toTimeString().slice(0, 8)
}

/* ─── AGENT COLOR MAP ───────────────────────────────────────────── */
const AGENT_COLORS: Record<string, string> = {
  TrendScout: "#F59E0B",
  BusinessAnalyst: "#3B82F6",
  PMOrchestrator: "#8B5CF6",
  BuilderGuild: "#10B981",
  QADeploy: "#F43F5E",
  "QA & Deploy": "#F43F5E",
  "Trend Scout": "#F59E0B",
  "Business Analyst": "#3B82F6",
  "PM Orchestrator": "#8B5CF6",
  "Builder Guild": "#10B981",
}

/* ─── MAIN DASHBOARD ────────────────────────────────────────────── */
export default function Dashboard() {
  // Fetch with fallback to mock
  const { data: projData } = trpc.project.list.useQuery(undefined, { staleTime: Infinity })
  const projects = projData?.projects?.length ? projData.projects : MOCK_PROJECTS

  const recentProject = projects[0]
  const { data: logData } = trpc.agentLog.list.useQuery(
    { projectId: recentProject?.id ?? 1 },
    { enabled: !!recentProject, staleTime: Infinity }
  )

  // Stats
  const active = projects.filter(p => p.status !== "REJECTED" && p.status !== "LIVE").length
  const live = projects.filter(p => p.status === "LIVE").length
  const total = projects.length || 1
  const rate = Math.round((live / total) * 100)

  // Build agent feed
  const logs = useMemo(() => {
    if (logData?.logs && logData.logs.length > 0) {
      return logData.logs.slice(-20).map(l => ({
        time: fmtTime(l.createdAt),
        agent: l.agentName,
        message: l.message,
        color: AGENT_COLORS[l.agentName] || "#64748B",
      }))
    }
    return MOCK_AGENT_LOGS.slice(-20).map(l => ({
      time: fmtTime(l.createdAt),
      agent: l.agentName,
      message: l.message,
      color: AGENT_COLORS[l.agentName] || "#64748B",
    }))
  }, [logData])

  // Recent projects
  const recent = [...projects]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 6)

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-[12px] text-[#475569] mt-0.5">Overview of your autonomous builds</p>
        </div>
        <Link
          to="/projects"
          className="flex items-center gap-1.5 text-[12px] font-medium text-[#3B82F6] hover:text-[#60a5fa] transition-colors"
        >
          View All Projects
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Active" value={String(active)} change="In progress" icon={FolderKanban} iconColor="#3B82F6" delay={0} />
        <StatCard label="Agents" value="5" change="All online" icon={Bot} iconColor="#10B981" delay={0.05} />
        <StatCard label="Signals" value="1,247" change="+12% today" icon={TrendingUp} iconColor="#F59E0B" delay={0.1} />
        <StatCard label="Success" value={`${rate}%`} change="Ship rate" icon={CheckCircle2} iconColor="#8B5CF6" delay={0.15} />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Agent Feed */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-3 bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden"
        >
          <div className="px-5 py-3.5 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-[#3B82F6]" />
              <span className="text-[13px] font-semibold text-white">Agent Activity</span>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] text-[#10B981]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              Live
            </span>
          </div>
          <div className="px-5 py-2 max-h-[400px] overflow-y-auto">
            {logs.map((log, i) => (
              <LogEntry key={i} {...log} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="lg:col-span-2 bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden"
        >
          <div className="px-5 py-3.5 border-b border-white/[0.06]">
            <span className="text-[13px] font-semibold text-white">Recent Projects</span>
          </div>
          <div>
            {recent.map((p) => (
              <Link
                key={p.id}
                to={`/projects/${p.id}/case`}
                className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors group"
              >
                <div className="w-2 h-2 rounded-full shrink-0" style={{
                  backgroundColor: p.status === "LIVE" ? "#10B981" : p.status === "IN_BUILD" ? "#8B5CF6" : p.status === "REJECTED" ? "#F43F5E" : "#3B82F6"
                }} />
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-medium text-white truncate group-hover:text-[#3B82F6] transition-colors">{p.name}</p>
                  <p className="text-[10px] text-[#475569]">{p.status.replace("_", " ")} · {timeAgo(p.updatedAt)}</p>
                </div>
                <ArrowRight size={12} className="text-[#334155] group-hover:text-[#3B82F6] transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5"
      >
        <h3 className="text-[13px] font-semibold text-white mb-3">Pipeline Status</h3>
        <div className="flex flex-wrap gap-2">
          {["IDEA_SCOUTED", "CASE_BUILT", "IN_BUILD", "QA_REVIEW", "LIVE", "REJECTED"].map(s => {
            const count = projects.filter(p => p.status === s).length
            const colors: Record<string, string> = {
              IDEA_SCOUTED: "#F59E0B", CASE_BUILT: "#3B82F6", IN_BUILD: "#8B5CF6",
              QA_REVIEW: "#F59E0B", LIVE: "#10B981", REJECTED: "#F43F5E",
            }
            const labels: Record<string, string> = {
              IDEA_SCOUTED: "Ideas", CASE_BUILT: "Cases", IN_BUILD: "Building",
              QA_REVIEW: "QA", LIVE: "Live", REJECTED: "Rejected",
            }
            return (
              <div key={s} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors[s] }} />
                <span className="text-[11px] text-[#64748B]">{labels[s]}</span>
                <span className="text-[11px] font-semibold text-white">{count}</span>
              </div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
