import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";
import GlassCard from "@/components/GlassCard";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
  Target,
  TrendingUp,
  ShieldAlert,
  Zap,
  FileText,
} from "lucide-react";

/* ─── Status helpers ───────────────────────────────────────────── */
const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  IDEA_SCOUTED: { color: "#F59E0B", bg: "rgba(245,158,11,0.1)", label: "Idea Scouted" },
  CASE_BUILT: { color: "#3B82F6", bg: "rgba(59,130,246,0.1)", label: "Case Built" },
  IN_BUILD: { color: "#A78BFA", bg: "rgba(167,139,250,0.1)", label: "In Build" },
  QA_REVIEW: { color: "#F59E0B", bg: "rgba(245,158,11,0.1)", label: "QA Review" },
  LIVE: { color: "#10B981", bg: "rgba(16,185,129,0.1)", label: "Live" },
  REJECTED: { color: "#F43F5E", bg: "rgba(244,63,94,0.1)", label: "Rejected" },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] ?? { color: "#94A3B8", bg: "rgba(148,163,184,0.1)", label: status };
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border"
      style={{ color: cfg.color, backgroundColor: cfg.bg, borderColor: cfg.color }}
    >
      {cfg.label}
    </span>
  );
}

/* ─── Confidence banner ────────────────────────────────────────── */
function ConfidenceBanner({
  recommendation,
}: {
  recommendation: string | null;
}) {
  if (recommendation === "go") {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-[rgba(16,185,129,0.1)] border border-[#10B981]">
        <CheckCircle2 size={20} className="text-[#10B981] shrink-0" />
        <div>
          <p className="font-semibold text-sm text-[#10B981]">GO — Strong Case</p>
          <p className="text-xs text-[#94A3B8]">
            Business case validated. Ready for build.
          </p>
        </div>
      </div>
    );
  }
  if (recommendation === "go_with_conditions") {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-[rgba(245,158,11,0.1)] border border-[#F59E0B]">
        <AlertTriangle size={20} className="text-[#F59E0B] shrink-0" />
        <div>
          <p className="font-semibold text-sm text-[#F59E0B]">
            GO WITH CONDITIONS — Proceed with Caution
          </p>
          <p className="text-xs text-[#94A3B8]">
            Address flagged items before full commitment.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-[rgba(244,63,94,0.1)] border border-[#F43F5E]">
      <XCircle size={20} className="text-[#F43F5E] shrink-0" />
      <div>
        <p className="font-semibold text-sm text-[#F43F5E]">NO-GO — Not Recommended</p>
        <p className="text-xs text-[#94A3B8]">
          Risk factors exceed acceptable thresholds.
        </p>
      </div>
    </div>
  );
}

/* ─── Pain score bar ───────────────────────────────────────────── */
function PainScoreBar({ score }: { score: number }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#94A3B8]">Problem Severity</span>
        <span className="text-xs font-medium text-[#F8FAFC]">{score}/100</span>
      </div>
      <div className="h-2 rounded-full bg-[#0F172A] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" as const }}
          className="h-full rounded-full"
          style={{
            backgroundColor: score > 70 ? "#F43F5E" : score > 40 ? "#F59E0B" : "#10B981",
          }}
        />
      </div>
    </div>
  );
}

/* ─── Market sizing bar ────────────────────────────────────────── */
function MarketBar({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-[#94A3B8] w-12 shrink-0">{label}</span>
      <div className="flex-1 h-6 rounded-md overflow-hidden" style={{ backgroundColor: `${color}20` }}>
        <div className="h-full flex items-center px-2" style={{ backgroundColor: `${color}30`, width: "100%" }}>
          <span className="text-xs font-medium" style={{ color }}>{value}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ────────────────────────────────────────────────── */
export default function ProjectCase() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projectId = Number(id);

  const { data: project, isLoading } = trpc.project.getById.useQuery(
    { id: projectId },
    { enabled: !!projectId }
  );

  const utils = trpc.useUtils();

  const approveMutation = trpc.project.approveCase.useMutation({
    onSuccess: () => {
      utils.project.getById.invalidate({ id: projectId });
      navigate(`/projects/${projectId}/build`);
    },
  });

  const rejectMutation = trpc.project.rejectCase.useMutation({
    onSuccess: () => {
      utils.project.getById.invalidate({ id: projectId });
      navigate("/projects");
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-[#3B82F6]" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-20">
        <p className="text-[#94A3B8]">Project not found</p>
        <Link to="/projects" className="text-[#3B82F6] text-sm mt-2 inline-block">
          Back to projects
        </Link>
      </div>
    );
  }

  const recommendation = project.recommendation ?? "go_with_conditions";

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/projects"
          className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] rounded-lg hover:bg-[rgba(100,116,139,0.1)] transition-all"
        >
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-space-grotesk font-bold text-lg sm:text-xl text-[#F8FAFC] truncate">
              {project.name}
            </h1>
            <StatusBadge status={project.status} />
          </div>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Business Case Review
          </p>
        </div>
      </div>

      {/* Confidence Banner */}
      <ConfidenceBanner recommendation={recommendation} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {/* Executive Summary */}
        <GlassCard className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={16} className="text-[#3B82F6]" />
            <h2 className="font-semibold text-sm text-[#F8FAFC]">Executive Summary</h2>
          </div>
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            {project.description ?? "No description provided."}
          </p>
        </GlassCard>

        {/* Problem Statement */}
        <GlassCard className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert size={16} className="text-[#F59E0B]" />
            <h2 className="font-semibold text-sm text-[#F8FAFC]">Problem Statement</h2>
          </div>
          <PainScoreBar score={project.painScore ?? 0} />
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#94A3B8]">Confidence Score</span>
              <span className="text-[#F8FAFC] font-medium">{project.confidenceScore}%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#94A3B8]">Signal Strength</span>
              <span className="text-[#F8FAFC] font-medium">{project.signalStrength}</span>
            </div>
          </div>
        </GlassCard>

        {/* Market Sizing */}
        <GlassCard className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-4">
            <Target size={16} className="text-[#10B981]" />
            <h2 className="font-semibold text-sm text-[#F8FAFC]">Market Opportunity</h2>
          </div>
          <div className="space-y-3">
            <MarketBar label="TAM" value={project.tam ?? "—"} color="#3B82F6" />
            <MarketBar label="SAM" value={project.sam ?? "—"} color="#A78BFA" />
            <MarketBar label="SOM" value={project.som ?? "—"} color="#10B981" />
          </div>
        </GlassCard>

        {/* Competitive Scan */}
        <GlassCard className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-[#F43F5E]" />
            <h2 className="font-semibold text-sm text-[#F8FAFC]">Competitive Scan</h2>
          </div>
          <div className="space-y-2">
            {["Direct: Feature overlap with existing tools", "Indirect: Manual workflows and spreadsheets", "Emerging: Low-code automation platforms"].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] mt-1.5 shrink-0" />
                <span className="text-[#94A3B8]">{item}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Revenue Projections */}
      <GlassCard className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-[#F59E0B]" />
          <h2 className="font-semibold text-sm text-[#F8FAFC]">Revenue Projections (Year 1)</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Conservative", value: "$120K", color: "#F59E0B" },
            { label: "Base Case", value: "$480K", color: "#3B82F6" },
            { label: "Optimistic", value: "$1.2M", color: "#10B981" },
          ].map((s) => (
            <div
              key={s.label}
              className="text-center p-3 rounded-lg"
              style={{ backgroundColor: `${s.color}10`, border: `1px solid ${s.color}30` }}
            >
              <p className="font-space-grotesk font-bold text-sm sm:text-base" style={{ color: s.color }}>
                {s.value}
              </p>
              <p className="text-xs text-[#94A3B8] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Decision Actions */}
      {project.status === "CASE_BUILT" && (
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => approveMutation.mutate({ id: projectId })}
            disabled={approveMutation.isPending}
            className="flex-1 flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-all active:scale-[0.98]"
          >
            {approveMutation.isPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <CheckCircle2 size={16} />
            )}
            Approve & Build
          </button>
          <button
            onClick={() => alert("Request changes — coming soon")}
            className="flex-1 flex items-center justify-center gap-2 border border-[#F59E0B] text-[#F59E0B] hover:bg-[rgba(245,158,11,0.1)] font-medium py-3 rounded-lg transition-all"
          >
            <AlertTriangle size={16} />
            Request Changes
          </button>
          <button
            onClick={() => rejectMutation.mutate({ id: projectId })}
            disabled={rejectMutation.isPending}
            className="flex-1 flex items-center justify-center gap-2 border border-[#F43F5E] text-[#F43F5E] hover:bg-[rgba(244,63,94,0.1)] disabled:opacity-50 font-medium py-3 rounded-lg transition-all"
          >
            {rejectMutation.isPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <XCircle size={16} />
            )}
            Reject
          </button>
        </div>
      )}
    </div>
  );
}
