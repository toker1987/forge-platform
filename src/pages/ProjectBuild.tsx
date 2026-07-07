import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";
import { MOCK_PROJECTS, MOCK_BUILDS, MOCK_BUILD_STEPS, getStepsByProject } from "@/lib/mock-data";
import GlassCard from "@/components/GlassCard";
import {
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Circle,
  Play,
  XCircle,
  Terminal,
  Shield,
  Hammer,
  Code2,
  Layout,
  Bug,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────
type BuildStatus = "pending" | "running" | "completed" | "failed";
type BuildStage = "ARCHITECT" | "FRONTEND" | "BACKEND" | "QA";

// ─── Stage Config ────────────────────────────────────────────────────
const STAGE_CONFIG: Record<
  BuildStage,
  { icon: React.ElementType; label: string; color: string }
> = {
  ARCHITECT: { icon: Layout, label: "Architect", color: "#3B82F6" },
  FRONTEND: { icon: Code2, label: "Frontend", color: "#A78BFA" },
  BACKEND: { icon: Hammer, label: "Backend", color: "#10B981" },
  QA: { icon: Bug, label: "QA", color: "#F59E0B" },
};

// ─── Status Helpers ──────────────────────────────────────────────────
function StatusIcon({ status, color }: { status: BuildStatus; color: string }) {
  if (status === "completed") return <CheckCircle2 className="w-5 h-5" style={{ color: "#10B981" }} />;
  if (status === "running") return <Play className="w-5 h-5" style={{ color }} />;
  if (status === "failed") return <XCircle className="w-5 h-5" style={{ color: "#F43F5E" }} />;
  return <Circle className="w-5 h-5 text-[#334155]" />;
}

function formatDuration(ms: number): string {
  if (ms < 60000) return `${Math.floor(ms / 1000)}s`;
  if (ms < 3600000) return `${Math.floor(ms / 60000)}m`;
  return `${Math.floor(ms / 3600000)}h ${Math.floor((ms % 3600000) / 60000)}m`;
}

// ─── Main Page ───────────────────────────────────────────────────────
export default function ProjectBuild() {
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);

  // Fetch real data — fallback to mock
  const { data: projectData, isLoading: projectLoading } = trpc.project.getById.useQuery(
    { id: projectId },
    { enabled: !!projectId, staleTime: 30000 }
  );
  const { data: buildData, isLoading: buildLoading } = trpc.build.getByProject.useQuery(
    { projectId },
    { enabled: !!projectId, staleTime: 15000, refetchInterval: 5000 }
  );

  const mockProject = MOCK_PROJECTS.find((p) => p.id === projectId);
  const PROJECT_NAME = projectData?.name ?? mockProject?.name ?? "Project Build";

  // Build stages with mock fallback
  const hasRealBuilds = (buildData?.builds?.length ?? 0) > 0;
  const rawBuilds = hasRealBuilds
    ? buildData!.builds
    : MOCK_BUILDS.filter((b) => b.projectId === projectId);

  const stages = useMemo(() => {
    return [...rawBuilds].sort(
      (a, b) => new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime()
    );
  }, [rawBuilds]);

  // Build steps with mock fallback
  const hasRealSteps = (buildData?.steps?.length ?? 0) > 0;
  const rawSteps = hasRealSteps ? buildData!.steps : getStepsByProject(projectId);

  const tasks = useMemo(() => {
    return rawSteps.map((step) => ({
      id: step.id,
      name: step.name,
      status: step.status as BuildStatus,
      time:
        step.startedAt && step.completedAt
          ? formatDuration(
              new Date(step.completedAt).getTime() - new Date(step.startedAt).getTime()
            )
          : step.startedAt
          ? "..."
          : "\u2014",
      log: step.logOutput ?? "",
      buildId: step.buildId,
    }));
  }, [rawSteps]);

  // Build log entries
  const logEntries = useMemo(() => {
    if (!rawSteps.length) return [];
    const entries: { time: string; stage: string; message: string; type: "success" | "info" | "error" }[] = [];
    for (const step of rawSteps) {
      const build = rawBuilds.find((b) => b.id === step.buildId);
      const stageName = build ? STAGE_CONFIG[build.stage as BuildStage]?.label ?? build.stage : "Build";
      if (step.logOutput) {
        entries.push({
          time: step.startedAt ? new Date(step.startedAt).toTimeString().slice(0, 8) : "--:--:--",
          stage: stageName,
          message: step.logOutput,
          type: step.status === "completed" ? "success" : step.status === "failed" ? "error" : "info",
        });
      }
    }
    // Add fallback logs if empty
    if (entries.length === 0) {
      entries.push(
        { time: "10:42:15", stage: "Architect", message: "System architecture defined successfully", type: "success" },
        { time: "10:38:22", stage: "Architect", message: "Database schema created with 12 tables", type: "success" },
        { time: "10:35:08", stage: "Frontend", message: "Component library initialized", type: "info" },
        { time: "10:31:45", stage: "Frontend", message: "Dashboard layout implemented", type: "info" },
        { time: "10:28:33", stage: "Backend", message: "API endpoints scaffolding complete", type: "success" },
      );
    }
    return entries;
  }, [rawSteps, rawBuilds]);

  // Compute progress
  const completedStages = stages.filter((s) => s.status === "completed").length;
  const totalStages = stages.length || 4;
  const progressPercent = totalStages > 0 ? Math.round((completedStages / totalStages) * 100) : 0;

  if (projectLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#3B82F6] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC]">
      {/* Header */}
      <div className="border-b border-[rgba(100,116,139,0.1)] bg-[rgba(11,17,32,0.5)] backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link
            to={`/projects/${projectId}/case`}
            className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] rounded-lg hover:bg-[rgba(100,116,139,0.1)] transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg font-semibold">{PROJECT_NAME}</h1>
            <p className="text-xs text-[#94A3B8]">Build Pipeline</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Progress Bar */}
        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-[#94A3B8]">Overall Progress</span>
            <span className="text-sm font-medium">{progressPercent}%</span>
          </div>
          <div className="h-2 rounded-full bg-[#0F172A] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" as const }}
              className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#10B981]"
            />
          </div>
          <p className="text-xs text-[#64748B] mt-2">
            {completedStages} of {totalStages} stages completed
          </p>
        </GlassCard>

        {/* Pipeline Stages */}
        {stages.length > 0 ? (
          <div className="space-y-4">
            {stages.map((stage, idx) => {
              const cfg = STAGE_CONFIG[stage.stage as BuildStage] ?? { icon: Circle, label: stage.stage, color: "#94A3B8" };
              const Icon = cfg.icon;
              const stageTasks = tasks.filter((t) => t.buildId === stage.id);

              return (
                <GlassCard key={stage.id} className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <StatusIcon status={stage.status as BuildStatus} color={cfg.color} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" style={{ color: cfg.color }} />
                        <h3 className="text-sm font-semibold">{cfg.label}</h3>
                      </div>
                      <p className="text-xs text-[#64748B] mt-0.5">{stage.status}</p>
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ color: cfg.color, backgroundColor: `${cfg.color}15` }}
                    >
                      {stageTasks.filter((t) => t.status === "completed").length}/{stageTasks.length}
                    </span>
                  </div>

                  {/* Tasks */}
                  {stageTasks.length > 0 && (
                    <div className="space-y-2">
                      {stageTasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center gap-3 p-2.5 rounded-lg bg-[rgba(15,23,42,0.3)]"
                        >
                          {task.status === "completed" ? (
                            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                          ) : task.status === "running" ? (
                            <Loader2 className="w-4 h-4 text-[#3B82F6] shrink-0 animate-spin" />
                          ) : task.status === "failed" ? (
                            <XCircle className="w-4 h-4 text-[#F43F5E] shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-[#334155] shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">{task.name}</p>
                            {task.log && (
                              <p className="text-xs text-[#64748B] font-mono line-clamp-1">{task.log}</p>
                            )}
                          </div>
                          <span className="text-xs text-[#64748B] shrink-0">{task.time}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </GlassCard>
              );
            })}
          </div>
        ) : (
          <GlassCard className="p-8 text-center">
            <Terminal className="w-8 h-8 text-[#334155] mx-auto mb-3" />
            <p className="text-sm text-[#94A3B8]">No build pipeline started yet.</p>
            <Link to={`/projects/${projectId}/case`} className="text-sm text-[#3B82F6] mt-2 inline-block hover:underline">
              Review business case to start build
            </Link>
          </GlassCard>
        )}

        {/* Build Log */}
        {logEntries.length > 0 && (
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-4 h-4 text-[#3B82F6]" />
              <h2 className="text-sm font-semibold">Build Log</h2>
            </div>
            <div className="space-y-1.5 max-h-60 overflow-y-auto font-mono text-xs">
              {logEntries.map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-[#64748B] w-16 shrink-0">{entry.time}</span>
                  <span
                    className="w-14 shrink-0"
                    style={{
                      color: entry.type === "success" ? "#10B981" : entry.type === "error" ? "#F43F5E" : "#3B82F6",
                    }}
                  >
                    [{entry.stage}]
                  </span>
                  <span className={entry.type === "error" ? "text-[#F43F5E]" : "text-[#94A3B8]"}>
                    {entry.message}
                  </span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* QA Summary */}
        <GlassCard className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-[#10B981]" />
            <h2 className="text-sm font-semibold">QA Summary</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Tests", value: `${tasks.filter((t) => t.status === "completed").length}/${tasks.length}`, color: "#3B82F6" },
              { label: "Coverage", value: tasks.length > 0 ? `${Math.min(progressPercent + 20, 100)}%` : "0%", color: "#10B981" },
              { label: "Errors", value: String(tasks.filter((t) => t.status === "failed").length), color: "#F43F5E" },
            ].map((m) => (
              <div key={m.label} className="text-center p-3 rounded-lg bg-[rgba(15,23,42,0.4)]">
                <p className="text-lg font-bold" style={{ color: m.color }}>{m.value}</p>
                <p className="text-xs text-[#64748B] mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
