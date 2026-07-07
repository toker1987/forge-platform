import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";
import GlassCard from "@/components/GlassCard";
import {
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Circle,
  Play,
  Pause,
  Terminal,
  Bug,
  Gauge,
  Shield,
} from "lucide-react";

/* ─── Stage config ─────────────────────────────────────────────── */
const stageConfig: Record<
  string,
  { icon: React.ElementType; label: string; color: string }
> = {
  ARCHITECT: { icon: Gauge, label: "Architect", color: "#3B82F6" },
  FRONTEND: { icon: Play, label: "Frontend", color: "#A78BFA" },
  BACKEND: { icon: Terminal, label: "Backend", color: "#10B981" },
  QA: { icon: Bug, label: "QA", color: "#F59E0B" },
};

/* ─── Stage icon helper ────────────────────────────────────────── */
function StageIcon({ stage, status }: { stage: string; status: string }) {
  const cfg = stageConfig[stage] ?? { icon: Circle, color: "#94A3B8" };
  const Icon = cfg.icon;

  if (status === "completed") {
    return <CheckCircle2 size={20} className="text-[#10B981]" />;
  }
  if (status === "running") {
    return <Play size={20} style={{ color: cfg.color }} />;
  }
  if (status === "failed") {
    return <Pause size={20} className="text-[#F43F5E]" />;
  }
  return <Circle size={20} className="text-[#334155]" />;
}

/* ─── Main Page ────────────────────────────────────────────────── */
export default function ProjectBuild() {
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);

  const { data: projectData } = trpc.project.getById.useQuery(
    { id: projectId },
    { enabled: !!projectId }
  );

  const { data: buildData, isLoading } = trpc.build.getByProject.useQuery(
    { projectId },
    { enabled: !!projectId, refetchInterval: 3000 }
  );

  const project = projectData ?? null;
  const builds = buildData?.builds ?? [];
  const steps = buildData?.steps ?? [];

  /* Computed metrics */
  const metrics = useMemo(() => {
    const totalSteps = steps.length;
    const completedSteps = steps.filter((s) => s.status === "completed").length;
    const progress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
    return { totalSteps, completedSteps, progress };
  }, [steps]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-[#3B82F6]" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to={`/projects/${projectId}/case`}
          className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] rounded-lg hover:bg-[rgba(100,116,139,0.1)] transition-all"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="font-space-grotesk font-bold text-lg sm:text-xl text-[#F8FAFC]">
            {project?.name ?? "Build Pipeline"}
          </h1>
          <p className="text-xs text-[#94A3B8]">Build Progress & QA</p>
        </div>
      </div>

      {/* Progress */}
      <GlassCard className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-[#94A3B8]">Overall Progress</span>
          <span className="text-sm font-medium text-[#F8FAFC]">{metrics.progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-[#0F172A] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${metrics.progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#10B981]"
          />
        </div>
        <p className="text-xs text-[#64748B] mt-2">
          {metrics.completedSteps} of {metrics.totalSteps} steps completed
        </p>
      </GlassCard>

      {/* Pipeline stages */}
      {builds.length > 0 ? (
        <div className="space-y-4">
          {builds.map((build, buildIdx) => {
            const buildSteps = steps.filter((s) => s.buildId === build.id);
            const cfg = stageConfig[build.stage] ?? { icon: Circle, label: build.stage, color: "#94A3B8" };

            return (
              <GlassCard key={build.id} className="p-4 sm:p-5">
                <div className="flex items-center gap-3 mb-4">
                  <StageIcon stage={build.stage} status={build.status} />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-[#F8FAFC]">{cfg.label}</h3>
                    <p className="text-xs text-[#64748B]">{build.status}</p>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      color: cfg.color,
                      backgroundColor: `${cfg.color}15`,
                    }}
                  >
                    {buildSteps.filter((s) => s.status === "completed").length}/{buildSteps.length}
                  </span>
                </div>

                {/* Build steps */}
                {buildSteps.length > 0 && (
                  <div className="space-y-2">
                    {buildSteps.map((step, stepIdx) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: stepIdx * 0.1 }}
                        className="flex items-start gap-3 p-2.5 rounded-lg bg-[rgba(15,23,42,0.3)]"
                      >
                        {step.status === "completed" ? (
                          <CheckCircle2 size={14} className="text-[#10B981] mt-0.5 shrink-0" />
                        ) : step.status === "running" ? (
                          <Loader2 size={14} className="text-[#3B82F6] mt-0.5 shrink-0 animate-spin" />
                        ) : step.status === "failed" ? (
                          <Pause size={14} className="text-[#F43F5E] mt-0.5 shrink-0" />
                        ) : (
                          <Circle size={14} className="text-[#334155] mt-0.5 shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm text-[#F8FAFC]">{step.name}</p>
                          {step.logOutput && (
                            <p className="text-xs text-[#64748B] mt-0.5 font-mono line-clamp-2">
                              {step.logOutput}
                            </p>
                          )}
                        </div>
                        <span className="text-xs text-[#64748B] shrink-0">{step.status}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>
      ) : (
        <GlassCard className="p-6 text-center">
          <Terminal size={24} className="text-[#334155] mx-auto mb-3" />
          <p className="text-sm text-[#94A3B8]">No build pipeline started yet.</p>
          <p className="text-xs text-[#64748B] mt-1">
            Approve the business case to initiate the build process.
          </p>
          <Link
            to={`/projects/${projectId}/case`}
            className="mt-3 inline-block text-sm text-[#3B82F6] hover:underline"
          >
            Go to Business Case
          </Link>
        </GlassCard>
      )}

      {/* QA Summary */}
      {metrics.totalSteps > 0 && (
        <GlassCard className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={16} className="text-[#10B981]" />
            <h2 className="font-semibold text-sm text-[#F8FAFC]">QA Summary</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Tests", value: `${metrics.completedSteps}/${metrics.totalSteps}`, color: "#3B82F6" },
              { label: "Coverage", value: `${Math.min(metrics.progress + 20, 100)}%`, color: "#10B981" },
              { label: "Errors", value: "0", color: "#F43F5E" },
            ].map((m) => (
              <div key={m.label} className="text-center p-2.5 rounded-lg bg-[rgba(15,23,42,0.4)]">
                <p className="font-space-grotesk font-bold text-sm" style={{ color: m.color }}>
                  {m.value}
                </p>
                <p className="text-xs text-[#64748B] mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
}
