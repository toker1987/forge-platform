import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import GlassCard from "@/components/GlassCard";
import {
  ArrowLeft,
  TrendingUp,
  ShieldAlert,
  Target,
  BarChart3,
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronRight,
  Loader2,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────
type ProjectStatus =
  | "IDEA_SCOUTED"
  | "CASE_BUILT"
  | "IN_BUILD"
  | "QA_REVIEW"
  | "LIVE"
  | "REJECTED";

// ─── Status Config ───────────────────────────────────────────────────
const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; color: string; bg: string }
> = {
  IDEA_SCOUTED: { label: "Idea Scouted", color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
  CASE_BUILT: { label: "Case Built", color: "#3B82F6", bg: "rgba(59,130,246,0.1)" },
  IN_BUILD: { label: "In Build", color: "#A78BFA", bg: "rgba(167,139,250,0.1)" },
  QA_REVIEW: { label: "QA Review", color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
  LIVE: { label: "Live", color: "#10B981", bg: "rgba(16,185,129,0.1)" },
  REJECTED: { label: "Rejected", color: "#F43F5E", bg: "rgba(244,63,94,0.1)" },
};

// ─── Status Badge ────────────────────────────────────────────────────
function StatusBadge({ status }: { status: ProjectStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
      style={{ color: cfg.color, backgroundColor: cfg.bg }}
    >
      {cfg.label}
    </span>
  );
}

// ─── Decision Banner ─────────────────────────────────────────────────
function DecisionBanner({ recommendation }: { recommendation: string | null }) {
  if (recommendation === "go") {
    return (
      <div className="flex items-center gap-3 p-4 rounded-lg border" style={{ borderColor: "#10B981", backgroundColor: "rgba(16,185,129,0.1)" }}>
        <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
        <div>
          <p className="text-sm font-medium text-[#10B981]">GO — Strong Business Case</p>
          <p className="text-xs text-[#94A3B8]">Market conditions favorable. Proceed with build.</p>
        </div>
      </div>
    );
  }
  if (recommendation === "go_with_conditions") {
    return (
      <div className="flex items-center gap-3 p-4 rounded-lg border" style={{ borderColor: "#F59E0B", backgroundColor: "rgba(245,158,11,0.1)" }}>
        <AlertTriangle className="w-5 h-5 text-[#F59E0B] shrink-0" />
        <div>
          <p className="text-sm font-medium text-[#F59E0B]">GO WITH CONDITIONS — Proceed with Caution</p>
          <p className="text-xs text-[#94A3B8]">Address flagged concerns before full commitment.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg border" style={{ borderColor: "#F43F5E", backgroundColor: "rgba(244,63,94,0.1)" }}>
      <XCircle className="w-5 h-5 text-[#F43F5E] shrink-0" />
      <div>
        <p className="text-sm font-medium text-[#F43F5E]">NO-GO — Not Recommended</p>
        <p className="text-xs text-[#94A3B8]">Risk factors exceed acceptable thresholds.</p>
      </div>
    </div>
  );
}

// ─── Score Bar ───────────────────────────────────────────────────────
function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#94A3B8]">{label}</span>
        <span className="text-xs font-medium" style={{ color }}>{score}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-[#0F172A] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// ─── Market Bar ──────────────────────────────────────────────────────
function MarketBar({ label, value, width, color }: { label: string; value: string; width: string; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#94A3B8]">{label}</span>
        <span className="text-xs font-medium text-[#F8FAFC]">{value}</span>
      </div>
      <div className="h-3 rounded-full bg-[#0F172A] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width }}
          transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.2 }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────
export default function ProjectCase() {
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);

  // Fetch real project — fallback to mock data
  const { data, isLoading } = trpc.project.getById.useQuery(
    { id: projectId },
    { enabled: !!projectId, staleTime: 30000 }
  );

  const mockProject = MOCK_PROJECTS.find((p) => p.id === projectId);
  const project = data ?? mockProject;

  const utils = trpc.useUtils();

  const approveMutation = trpc.project.approveCase.useMutation({
    onSuccess: () => {
      utils.project.getById.invalidate({ id: projectId });
      window.location.href = `/projects/${projectId}/build`;
    },
  });

  const rejectMutation = trpc.project.rejectCase.useMutation({
    onSuccess: () => {
      utils.project.getById.invalidate({ id: projectId });
      window.location.href = "/projects";
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#3B82F6] animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-[#94A3B8]">
        <p>Project not found</p>
        <Link to="/projects" className="text-[#3B82F6] ml-2 hover:underline">Back to Projects</Link>
      </div>
    );
  }

  const recommendation = project.recommendation ?? "go_with_conditions";
  const status = project.status as ProjectStatus;

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC]">
      {/* Header */}
      <div className="border-b border-[rgba(100,116,139,0.1)] bg-[rgba(11,17,32,0.5)] backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link
            to="/projects"
            className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] rounded-lg hover:bg-[rgba(100,116,139,0.1)] transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold truncate">{project.name}</h1>
              <StatusBadge status={status} />
            </div>
          </div>
          <Link
            to={`/projects/${projectId}/build`}
            className="flex items-center gap-1.5 text-sm text-[#3B82F6] hover:text-[#2563EB] transition-colors"
          >
            Build Pipeline
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Decision Banner */}
        <DecisionBanner recommendation={recommendation} />

        {/* Executive Summary */}
        <GlassCard className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-[#3B82F6]" />
            <h2 className="text-sm font-semibold">Executive Summary</h2>
          </div>
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            {project.description ?? "No description provided for this project."}
          </p>
        </GlassCard>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Problem Statement */}
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <ShieldAlert className="w-4 h-4 text-[#F59E0B]" />
              <h2 className="text-sm font-semibold">Problem Statement</h2>
            </div>
            <ScoreBar label="Pain Score" score={project.painScore ?? 50} color="#F59E0B" />
            <div className="mt-4 space-y-3">
              <ScoreBar label="Confidence" score={project.confidenceScore ?? 70} color="#3B82F6" />
              <ScoreBar label="Market Readiness" score={75} color="#10B981" />
            </div>
          </GlassCard>

          {/* Market Sizing */}
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-[#10B981]" />
              <h2 className="text-sm font-semibold">Market Sizing</h2>
            </div>
            <div className="space-y-4">
              <MarketBar label="TAM" value={project.tam ?? "$2.4B"} width="100%" color="#3B82F6" />
              <MarketBar label="SAM" value={project.sam ?? "$480M"} width="40%" color="#A78BFA" />
              <MarketBar label="SOM" value={project.som ?? "$24M"} width="15%" color="#10B981" />
            </div>
          </GlassCard>
        </div>

        {/* Competitive Landscape */}
        <GlassCard className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-[#F43F5E]" />
            <h2 className="text-sm font-semibold">Competitive Landscape</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-[#64748B] border-b border-[rgba(100,116,139,0.1)]">
                  <th className="pb-2 font-medium">Competitor</th>
                  <th className="pb-2 font-medium">Strengths</th>
                  <th className="pb-2 font-medium">Weaknesses</th>
                  <th className="pb-2 font-medium">Threat</th>
                </tr>
              </thead>
              <tbody className="text-[#94A3B8]">
                {[
                  { name: "Competitor A", strengths: "Brand recognition", weaknesses: "Slow innovation", threat: "High" },
                  { name: "Competitor B", strengths: "Low price", weaknesses: "Limited features", threat: "Medium" },
                  { name: "Competitor C", strengths: "Enterprise focus", weaknesses: "Complex UX", threat: "Medium" },
                  { name: "Competitor D", strengths: "AI features", weaknesses: "Small team", threat: "Low" },
                ].map((c, i) => (
                  <tr key={i} className="border-b border-[rgba(100,116,139,0.05)]">
                    <td className="py-2.5 text-[#F8FAFC]">{c.name}</td>
                    <td className="py-2.5">{c.strengths}</td>
                    <td className="py-2.5">{c.weaknesses}</td>
                    <td className="py-2.5">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          color: c.threat === "High" ? "#F43F5E" : c.threat === "Medium" ? "#F59E0B" : "#10B981",
                          backgroundColor: c.threat === "High" ? "rgba(244,63,94,0.1)" : c.threat === "Medium" ? "rgba(245,158,11,0.1)" : "rgba(16,185,129,0.1)",
                        }}
                      >
                        {c.threat}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Revenue Projections */}
        <GlassCard className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-[#3B82F6]" />
            <h2 className="text-sm font-semibold">Revenue Projections (Year 1)</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Conservative", value: "$120K", color: "#F59E0B" },
              { label: "Base Case", value: "$480K", color: "#3B82F6" },
              { label: "Optimistic", value: "$1.2M", color: "#10B981" },
            ].map((s) => (
              <div
                key={s.label}
                className="text-center p-4 rounded-lg"
                style={{ backgroundColor: `${s.color}10`, border: `1px solid ${s.color}30` }}
              >
                <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs text-[#94A3B8] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Risk Register */}
        <GlassCard className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="w-4 h-4 text-[#F59E0B]" />
            <h2 className="text-sm font-semibold">Risk Register</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { severity: "High", color: "#F43F5E", title: "Market saturation in target segment", mitigation: "Focus on underserved niche" },
              { severity: "Medium", color: "#F59E0B", title: "Technical complexity of AI integration", mitigation: "Phased rollout with MVP" },
              { severity: "Medium", color: "#F59E0B", title: "Regulatory compliance requirements", mitigation: "Legal review before launch" },
              { severity: "Low", color: "#10B981", title: "Team scaling challenges", mitigation: "Hire plan in place" },
            ].map((r, i) => (
              <div
                key={i}
                className="p-3 rounded-lg border"
                style={{ borderColor: `${r.color}30`, backgroundColor: `${r.color}08` }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs px-1.5 py-0.5 rounded font-medium"
                    style={{ color: r.color, backgroundColor: `${r.color}20` }}
                  >
                    {r.severity}
                  </span>
                </div>
                <p className="text-sm text-[#F8FAFC]">{r.title}</p>
                <p className="text-xs text-[#64748B] mt-0.5">{r.mitigation}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Decision Actions */}
        {status === "CASE_BUILT" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" as const }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={() => approveMutation.mutate({ id: projectId })}
              disabled={approveMutation.isPending}
              className="flex-1 flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] disabled:opacity-50 text-white rounded-lg px-4 py-3 text-sm font-medium transition-all"
            >
              {approveMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
              Approve & Build
            </button>
            <button
              onClick={() => alert("Request Changes feature coming soon")}
              className="flex-1 flex items-center justify-center gap-2 border border-[#F59E0B] text-[#F59E0B] hover:bg-[rgba(245,158,11,0.1)] rounded-lg px-4 py-3 text-sm font-medium transition-all"
            >
              <AlertTriangle className="w-4 h-4" />
              Request Changes
            </button>
            <button
              onClick={() => rejectMutation.mutate({ id: projectId })}
              disabled={rejectMutation.isPending}
              className="flex-1 flex items-center justify-center gap-2 border border-[#F43F5E] text-[#F43F5E] hover:bg-[rgba(244,63,94,0.1)] disabled:opacity-50 rounded-lg px-4 py-3 text-sm font-medium transition-all"
            >
              {rejectMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <XCircle className="w-4 h-4" />
              )}
              Reject
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
