import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { trpc } from "@/providers/trpc"
import { MOCK_PROJECTS } from "@/lib/mock-data"
import {
  ArrowLeft, CheckCircle2, AlertTriangle, XCircle,
  Target, TrendingUp, ShieldAlert, Loader2,
} from "lucide-react"

const STATUS_CFG: Record<string, { label: string; color: string }> = {
  IDEA_SCOUTED: { label: "Idea Scouted", color: "#F59E0B" },
  CASE_BUILT: { label: "Case Built", color: "#3B82F6" },
  IN_BUILD: { label: "In Build", color: "#8B5CF6" },
  QA_REVIEW: { label: "QA Review", color: "#F59E0B" },
  LIVE: { label: "Live", color: "#10B981" },
  REJECTED: { label: "Rejected", color: "#F43F5E" },
}

function DecisionBanner({ rec }: { rec: string | null }) {
  if (rec === "go") return (
    <div className="flex items-center gap-3 p-4 rounded-xl border border-[#10B981]/30 bg-[#10B981]/5">
      <CheckCircle2 size={18} className="text-[#10B981] shrink-0" />
      <div><p className="text-[13px] font-semibold text-[#10B981]">GO — Strong Case</p><p className="text-[11px] text-[#475569]">Market conditions favorable. Proceed with build.</p></div>
    </div>
  )
  if (rec === "go_with_conditions") return (
    <div className="flex items-center gap-3 p-4 rounded-xl border border-[#F59E0B]/30 bg-[#F59E0B]/5">
      <AlertTriangle size={18} className="text-[#F59E0B] shrink-0" />
      <div><p className="text-[13px] font-semibold text-[#F59E0B]">GO WITH CONDITIONS — Proceed with Caution</p><p className="text-[11px] text-[#475569]">Address flagged items before commitment.</p></div>
    </div>
  )
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl border border-[#F43F5E]/30 bg-[#F43F5E]/5">
      <XCircle size={18} className="text-[#F43F5E] shrink-0" />
      <div><p className="text-[13px] font-semibold text-[#F43F5E]">NO-GO — Not Recommended</p><p className="text-[11px] text-[#475569]">Risk factors exceed thresholds.</p></div>
    </div>
  )
}

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-[#475569]">{label}</span>
        <span className="text-[11px] font-medium" style={{ color }}>{score}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ duration: 0.8, ease: "easeOut" as const }} className="h-full rounded-full" style={{ backgroundColor: color }} />
      </div>
    </div>
  )
}

/* ─── MOCK DETAIL DATA ──────────────────────────────────────────── */
const MOCK_CASE = {
  marketSize: { tam: "$2.4B", sam: "$480M", som: "$24M", growth: "+34% YoY" },
  revenue: { model: "Freemium SaaS", arpu: "$49/mo", ltv: "$2,450", payback: "4.2 months" },
  risks: [
    { severity: "High", text: "Competitive market with 12+ existing players", mitigated: false },
    { severity: "Medium", text: "Customer acquisition cost may exceed projections in Q2-Q3", mitigated: false },
    { severity: "Low", text: "Technical complexity of real-time analysis engine", mitigated: true },
    { severity: "Medium", text: "Regulatory compliance for code access permissions", mitigated: true },
  ],
}

export default function ProjectCase() {
  const { id } = useParams()
  const pid = Number(id) || 1

  const { data, isLoading } = trpc.project.getById.useQuery(
    { id: pid },
    { staleTime: Infinity }
  )
  const project = data ?? MOCK_PROJECTS.find(p => p.id === pid) ?? MOCK_PROJECTS[0]

  const [decision, setDecision] = useState<string | null>(null)

  if (isLoading && !project) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={24} className="animate-spin text-[#3B82F6]" />
      </div>
    )
  }

  const cfg = STATUS_CFG[project.status] || { label: project.status, color: "#64748B" }
  const caseData = MOCK_CASE

  return (
    <div className="space-y-5 max-w-5xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Link to="/projects" className="flex items-center gap-1 text-[11px] text-[#475569] hover:text-[#3B82F6] transition-colors">
          <ArrowLeft size={13} /> Projects
        </Link>
        <span className="text-[#334155]">/</span>
        <span className="text-[11px] text-[#64748B]">Business Case</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-white tracking-tight">{project.name}</h1>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ color: cfg.color, backgroundColor: `${cfg.color}18` }}>{cfg.label}</span>
          </div>
          <p className="text-[12px] text-[#475569] mt-0.5">{project.description}</p>
        </div>
        {project.status === "CASE_BUILT" && (
          <Link
            to={`/projects/${pid}/build`}
            className="flex items-center gap-1.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-[12px] font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <CheckCircle2 size={14} /> Approve & Build
          </Link>
        )}
      </div>

      {/* Decision Banner */}
      <DecisionBanner rec={project.recommendation} />

      {/* Scores */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/[0.02] border border-white/[0.06] rounded-xl p-5"
      >
        <h3 className="col-span-full text-[13px] font-semibold text-white mb-1">Assessment Scores</h3>
        <ScoreBar label="Pain Score" score={project.painScore ?? 72} color="#F59E0B" />
        <ScoreBar label="Confidence" score={project.confidenceScore ?? 68} color="#3B82F6" />
        <ScoreBar label="Market Fit" score={project.painScore ? Math.min(100, project.painScore + 12) : 78} color="#10B981" />
        <ScoreBar label="Technical Feasibility" score={project.confidenceScore ? Math.min(100, project.confidenceScore + 8) : 76} color="#8B5CF6" />
      </motion.div>

      {/* Market Sizing */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <Target size={14} className="text-[#3B82F6]" />
          <h3 className="text-[13px] font-semibold text-white">Market Sizing</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "TAM", value: project.tam ?? caseData.marketSize.tam },
            { label: "SAM", value: project.sam ?? caseData.marketSize.sam },
            { label: "SOM", value: project.som ?? caseData.marketSize.som },
            { label: "Growth", value: caseData.marketSize.growth },
          ].map(item => (
            <div key={item.label} className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.04]">
              <p className="text-[10px] text-[#475569] uppercase tracking-wider">{item.label}</p>
              <p className="text-[15px] font-bold text-white mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Revenue Projections */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={14} className="text-[#10B981]" />
          <h3 className="text-[13px] font-semibold text-white">Revenue Projections</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Model", value: caseData.revenue.model },
            { label: "ARPU", value: caseData.revenue.arpu },
            { label: "LTV", value: caseData.revenue.ltv },
            { label: "Payback", value: caseData.revenue.payback },
          ].map(item => (
            <div key={item.label} className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.04]">
              <p className="text-[10px] text-[#475569] uppercase tracking-wider">{item.label}</p>
              <p className="text-[14px] font-semibold text-white mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Risk Register */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <ShieldAlert size={14} className="text-[#F43F5E]" />
          <h3 className="text-[13px] font-semibold text-white">Risk Register</h3>
        </div>
        <div className="space-y-2">
          {caseData.risks.map((risk, i) => (
            <div key={i} className="flex items-start gap-3 py-2 border-b border-white/[0.03] last:border-0">
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded mt-0.5 shrink-0"
                style={{
                  color: risk.severity === "High" ? "#F43F5E" : risk.severity === "Medium" ? "#F59E0B" : "#10B981",
                  backgroundColor: risk.severity === "High" ? "#F43F5E10" : risk.severity === "Medium" ? "#F59E0B10" : "#10B98110",
                }}>
                {risk.severity}
              </span>
              <p className="text-[12px] text-[#94a3b8] flex-1">{risk.text}</p>
              {risk.mitigated && <CheckCircle2 size={14} className="text-[#10B981] shrink-0 mt-0.5" />}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Decision Actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex flex-wrap gap-3"
      >
        <Link
          to={`/projects/${pid}/build`}
          className="flex items-center gap-1.5 bg-[#10B981] hover:bg-[#059669] text-white text-[12px] font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          <CheckCircle2 size={14} /> Approve & Build
        </Link>
        <button
          onClick={() => setDecision("changes")}
          className="flex items-center gap-1.5 bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.08] text-white text-[12px] font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          <AlertTriangle size={14} /> Request Changes
        </button>
        <button
          onClick={() => setDecision("rejected")}
          className="flex items-center gap-1.5 bg-white/[0.04] hover:bg-[#F43F5E]/10 border border-white/[0.08] hover:border-[#F43F5E]/30 text-[#F43F5E] text-[12px] font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          <XCircle size={14} /> Reject
        </button>
      </motion.div>

      {decision && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[12px] text-[#475569] bg-white/[0.02] border border-white/[0.06] rounded-lg p-3"
        >
          Decision recorded: <span className="text-white font-medium capitalize">{decision.replace("_", " ")}</span>
        </motion.div>
      )}
    </div>
  )
}
