import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { trpc } from "@/providers/trpc";
import GlassCard from "@/components/GlassCard";
import {
  FolderKanban,
  Bot,
  Radio,
  TrendingUp,
  Activity,
  PlusCircle,
  ArrowRight,
  Terminal,
} from "lucide-react";

/* ─── Animated Stat Card ──────────────────────────────────────── */
function StatCard({
  label,
  value,
  change,
  icon: Icon,
  iconColor,
  delay,
}: {
  label: string;
  value: string;
  change: string;
  icon: React.ElementType;
  iconColor: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" as const }}
      whileHover={{ y: -2 }}
      className="will-change-transform"
    >
      <GlassCard className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-[#94A3B8] font-medium uppercase tracking-wide">
            {label}
          </span>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${iconColor}15` }}
          >
            <Icon size={16} style={{ color: iconColor }} />
          </div>
        </div>
        <div className="font-space-grotesk font-bold text-xl sm:text-2xl text-[#F8FAFC] mb-1">
          {value}
        </div>
        <div className="text-xs text-[#10B981]">{change}</div>
      </GlassCard>
    </motion.div>
  );
}

/* ─── Format relative time ────────────────────────────────────── */
function formatTimeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

/* ─── Agent colour map ─────────────────────────────────────────── */
const agentColors: Record<string, string> = {
  TrendScout: "#F59E0B",
  BusinessAnalyst: "#3B82F6",
  PMOrchestrator: "#A78BFA",
  BuilderGuild: "#10B981",
  QADeploy: "#F43F5E",
};

export default function Dashboard() {
  const { data, isLoading } = trpc.project.list.useQuery({});
  const projects = data?.projects ?? [];

  /* derive stats from real data */
  const stats = useMemo(() => {
    const active = projects.filter(
      (p) => p.status !== "REJECTED" && p.status !== "LIVE"
    ).length;
    const live = projects.filter((p) => p.status === "LIVE").length;
    const total = projects.length || 1;
    const successRate = Math.round((live / total) * 100);
    return { active, successRate };
  }, [projects]);

  /* grab the most-recent project for its agent logs */
  const recentProject = projects[0];
  const { data: logData } = trpc.agentLog.list.useQuery(
    { projectId: recentProject?.id ?? 0 },
    { enabled: !!recentProject }
  );
  const logs = logData?.logs ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-space-grotesk font-bold text-xl sm:text-2xl text-[#F8FAFC]">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Command center for your autonomous builds
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/projects"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] border border-[#334155] hover:border-[#64748B] px-3 py-2 rounded-lg transition-all"
          >
            <FolderKanban size={14} />
            All Projects
          </Link>
          <Link
            to="/projects"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium bg-[#3B82F6] hover:bg-[#2563EB] text-white px-3 py-2 rounded-lg transition-all active:scale-[0.98]"
          >
            <PlusCircle size={14} />
            New Project
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          label="Active Projects"
          value={isLoading ? "—" : String(stats.active)}
          change="+2 this week"
          icon={FolderKanban}
          iconColor="#3B82F6"
          delay={0}
        />
        <StatCard
          label="Agents Online"
          value="5"
          change="All systems operational"
          icon={Bot}
          iconColor="#10B981"
          delay={0.08}
        />
        <StatCard
          label="Signals Today"
          value="1,247"
          change="+12% from yesterday"
          icon={Radio}
          iconColor="#F59E0B"
          delay={0.16}
        />
        <StatCard
          label="Success Rate"
          value={isLoading ? "—" : `${stats.successRate}%`}
          change="Across all builds"
          icon={TrendingUp}
          iconColor="#A78BFA"
          delay={0.24}
        />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Agent Activity Feed */}
        <GlassCard className="lg:col-span-2 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-4">
            <Terminal size={16} className="text-[#3B82F6]" />
            <h2 className="font-semibold text-sm sm:text-base text-[#F8FAFC]">
              Agent Activity Feed
            </h2>
            <span className="ml-auto flex items-center gap-1 text-xs text-[#10B981]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              Live
            </span>
          </div>

          <div className="space-y-2 max-h-[360px] overflow-y-auto no-scrollbar pr-1">
            {isLoading && (
              <div className="text-sm text-[#64748B] py-4 text-center">
                Loading activity feed...
              </div>
            )}
            {!isLoading && logs.length === 0 && (
              <div className="text-sm text-[#64748B] py-4 text-center">
                No agent activity yet. Create a project to get started.
              </div>
            )}
            {logs.map((log, i) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-start gap-3 p-2.5 rounded-lg bg-[rgba(15,23,42,0.4)] hover:bg-[rgba(15,23,42,0.6)] transition-colors"
              >
                <span
                  className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                  style={{
                    backgroundColor:
                      agentColors[log.agentName] ?? "#94A3B8",
                  }}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-[#F8FAFC] truncate">
                    <span
                      className="font-medium"
                      style={{
                        color: agentColors[log.agentName] ?? "#94A3B8",
                      }}
                    >
                      [{log.agentName}]
                    </span>{" "}
                    {log.message}
                  </p>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    {formatTimeAgo(log.createdAt)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Active Projects sidebar */}
        <GlassCard className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={16} className="text-[#3B82F6]" />
            <h2 className="font-semibold text-sm sm:text-base text-[#F8FAFC]">
              Recent Projects
            </h2>
          </div>

          <div className="space-y-3">
            {isLoading && (
              <div className="text-sm text-[#64748B] py-4 text-center">
                Loading projects...
              </div>
            )}
            {!isLoading && projects.length === 0 && (
              <div className="text-sm text-[#64748B] py-4 text-center">
                No projects yet.
                <Link
                  to="/projects"
                  className="block text-[#3B82F6] mt-1"
                >
                  Create your first project
                </Link>
              </div>
            )}
            {projects.slice(0, 5).map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}/case`}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[rgba(15,23,42,0.5)] transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-[rgba(59,130,246,0.1)] flex items-center justify-center shrink-0">
                  <FolderKanban size={14} className="text-[#3B82F6]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-[#F8FAFC] truncate group-hover:text-[#3B82F6] transition-colors">
                    {project.name}
                  </p>
                  <p className="text-xs text-[#64748B]">{project.status}</p>
                </div>
                <ArrowRight
                  size={14}
                  className="text-[#64748B] group-hover:text-[#3B82F6] transition-colors shrink-0"
                />
              </Link>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
