import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { trpc } from "@/providers/trpc"
import { MOCK_BUILDS, MOCK_BUILD_STEPS, MOCK_AGENT_LOGS } from "@/lib/mock-data"
import {
  ArrowLeft, Loader2, CheckCircle2, Circle,
  Terminal, Play, Pause, RotateCcw,
} from "lucide-react"

const STAGE_ICONS = ["Architect", "Frontend", "Backend", "QA"]
const STAGE_COLORS = ["#3B82F6", "#8B5CF6", "#F59E0B", "#10B981"]

function timeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  const s = Math.floor((Date.now() - d.getTime()) / 1000)
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h`
  return `${Math.floor(h / 24)}d`
}

export default function ProjectBuild() {
  const { id } = useParams()
  const pid = Number(id) || 1

  const { data: buildData } = trpc.build.list.useQuery(
    { projectId: pid },
    { staleTime: Infinity }
  )
  const builds = buildData?.builds?.length ? buildData.builds : MOCK_BUILDS.filter(b => b.projectId === pid)
  const build = builds[0] ?? MOCK_BUILDS[0]

  const { data: stepData } = trpc.buildStep.list.useQuery(
    { buildId: build?.id ?? 1 },
    { staleTime: Infinity }
  )
  const steps = stepData?.steps?.length ? stepData.steps : MOCK_BUILD_STEPS.filter(s => s.buildId === (build?.id ?? 1))

  const { data: logData } = trpc.agentLog.list.useQuery(
    { projectId: pid },
    { staleTime: Infinity }
  )
  const logs = logData?.logs?.length ? logData.logs : MOCK_AGENT_LOGS.filter(l => l.projectId === pid)

  // Compute progress
  const completedSteps = steps.filter(s => s.status === "completed").length
  const totalSteps = steps.length || 1
  const progress = Math.round((completedSteps / totalSteps) * 100)

  // Stage progress
  const stageProgress = STAGE_ICONS.map((_, idx) => {
    const stageSteps = steps.filter((_, i) => Math.floor(i / Math.ceil(totalSteps / 4)) === idx)
    if (stageSteps.length === 0) return 100
    return Math.round((stageSteps.filter(s => s.status === "completed").length / stageSteps.length) * 100)
  })

  return (
    <div className="space-y-5 max-w-5xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Link to="/projects" className="flex items-center gap-1 text-[11px] text-[#475569] hover:text-[#3B82F6] transition-colors">
          <ArrowLeft size={13} /> Projects
        </Link>
        <span className="text-[#334155]">/</span>
        <Link to={`/projects/${pid}/case`} className="text-[11px] text-[#475569] hover:text-[#3B82F6] transition-colors">Case</Link>
        <span className="text-[#334155]">/</span>
        <span className="text-[11px] text-[#64748B]">Build Pipeline</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Build Pipeline</h1>
          <p className="text-[12px] text-[#475569] mt-0.5">Build #{build?.id ?? 1} · {progress}% complete</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.08] text-white text-[11px] font-medium px-3 py-2 rounded-lg transition-colors">
            <Pause size={13} /> Pause
          </button>
          <button className="flex items-center gap-1.5 bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.08] text-white text-[11px] font-medium px-3 py-2 rounded-lg transition-colors">
            <RotateCcw size={13} /> Restart
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5"
      >
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] text-[#475569]">Overall Progress</span>
          <span className="text-[13px] font-bold text-white">{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" as const }}
            className="h-full rounded-full bg-[#3B82F6]"
          />
        </div>

        {/* Stages */}
        <div className="grid grid-cols-4 gap-3 mt-4">
          {STAGE_ICONS.map((stage, i) => (
            <div key={stage} className="text-center">
              <div className="text-[10px] text-[#475569] mb-1">{stage}</div>
              <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stageProgress[i]}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: STAGE_COLORS[i] }}
                />
              </div>
              <div className="text-[10px] text-[#64748B] mt-1">{stageProgress[i]}%</div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Task Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden"
        >
          <div className="px-5 py-3.5 border-b border-white/[0.06] flex items-center gap-2">
            <CheckCircle2 size={14} className="text-[#10B981]" />
            <span className="text-[13px] font-semibold text-white">Tasks</span>
            <span className="text-[10px] text-[#475569] ml-auto">{completedSteps}/{totalSteps}</span>
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {steps.map((step, i) => (
              <div key={step.id ?? i} className="flex items-center gap-3 px-5 py-2.5 border-b border-white/[0.03] last:border-0">
                {step.status === "completed" ? (
                  <CheckCircle2 size={14} className="text-[#10B981] shrink-0" />
                ) : step.status === "in_progress" ? (
                  <Loader2 size={14} className="text-[#3B82F6] animate-spin shrink-0" />
                ) : (
                  <Circle size={14} className="text-[#334155] shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className={`text-[12px] truncate ${step.status === "completed" ? "text-[#475569] line-through" : "text-white"}`}>
                    {step.taskName}
                  </p>
                </div>
                <span className="text-[10px] text-[#334155] shrink-0">{timeAgo(step.createdAt)}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Build Log */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden"
        >
          <div className="px-5 py-3.5 border-b border-white/[0.06] flex items-center gap-2">
            <Terminal size={14} className="text-[#F59E0B]" />
            <span className="text-[13px] font-semibold text-white">Build Log</span>
          </div>
          <div className="px-5 py-2 max-h-[400px] overflow-y-auto font-mono">
            {logs.slice(-15).map((log, i) => (
              <div key={i} className="flex items-start gap-2 py-1 text-[10px] border-b border-white/[0.02] last:border-0">
                <span className="text-[#334155] shrink-0">{new Date(log.createdAt).toTimeString().slice(0, 8)}</span>
                <span style={{ color: log.agentName.includes("Build") ? "#10B981" : log.agentName.includes("QA") ? "#F43F5E" : "#3B82F6" }}>
                  [{log.agentName}]
                </span>
                <span className="text-[#475569]">{log.message}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* QA Summary */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5"
      >
        <h3 className="text-[13px] font-semibold text-white mb-3">QA Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Tests Passed", value: "47/50", color: "#10B981" },
            { label: "Coverage", value: "87%", color: "#3B82F6" },
            { label: "Build Time", value: "12m 34s", color: "#F59E0B" },
            { label: "Bundle Size", value: "142 KB", color: "#8B5CF6" },
          ].map(item => (
            <div key={item.label} className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.04] text-center">
              <p className="text-[10px] text-[#475569] uppercase tracking-wider">{item.label}</p>
              <p className="text-[15px] font-bold mt-0.5" style={{ color: item.color }}>{item.value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
