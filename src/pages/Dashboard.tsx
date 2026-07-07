import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FolderOpen,
  Bot,
  TrendingUp,
  CheckCircle,
  Plus,
  Bell,
  Search,
  LayoutDashboard,
  Settings,
  BarChart3,
  ChevronRight,
  Circle,
} from "lucide-react";
import GlassCard from "../components/GlassCard";
import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";
import { trpc } from "@/providers/trpc";
import { MOCK_PROJECTS, MOCK_AGENT_LOGS } from "@/lib/mock-data";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface FeedEntry {
  time: string;
  agent: string;
  color: string;
  action: string;
}

interface Project {
  name: string;
  status: string;
  statusColor: string;
  updated: string;
}

interface Decision {
  action: string;
  dotColor: string;
  meta: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
const STATUS_COLOR_MAP: Record<string, string> = {
  IDEA_SCOUTED: "#F59E0B",
  CASE_BUILT: "#3B82F6",
  IN_BUILD: "#A78BFA",
  QA_REVIEW: "#F59E0B",
  LIVE: "#10B981",
  REJECTED: "#F43F5E",
};

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

function timeStr(date: Date): string {
  const d = new Date(date);
  return d.toTimeString().slice(0, 8);
}

/* ------------------------------------------------------------------ */
/*  Mock Data (fallback)                                               */
/* ------------------------------------------------------------------ */
const DECISIONS: Decision[] = [
  { action: "Approved 'AI Tax Assistant' business case", dotColor: "#10B981", meta: "You • 2 hours ago" },
  { action: "Requested changes for 'Fitness App' scope", dotColor: "#F59E0B", meta: "You • 5 hours ago" },
  { action: "Rejected 'Crypto Wallet' — risk too high", dotColor: "#F43F5E", meta: "You • 1 day ago" },
];

/* ------------------------------------------------------------------ */
/*  Sidebar                                                            */
/* ------------------------------------------------------------------ */
const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", route: "/dashboard", active: true },
  { icon: FolderOpen, label: "Projects", route: "/projects", active: false },
  { icon: BarChart3, label: "Analytics", route: "/analytics", active: false },
  { icon: Bot, label: "Agent Swarm", route: "/agents", active: false },
  { icon: Settings, label: "Settings", route: "/settings", active: false },
];

function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -256 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" as const }}
      className="fixed left-0 top-0 h-full w-64 bg-[#0B1120] border-r border-[rgba(100,116,139,0.1)] flex flex-col z-40 hidden lg:flex"
    >
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center">
          <span className="text-white font-bold text-sm">F</span>
        </div>
        <span className="text-[#F8FAFC] font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          FORGE
        </span>
      </div>

      {/* Nav */}
      <nav className="mt-6 space-y-1 px-3 flex-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.route}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 ${
                item.active
                  ? "bg-[rgba(59,130,246,0.1)] text-[#3B82F6] border-l-[3px] border-[#3B82F6]"
                  : "text-[#94A3B8] hover:bg-[rgba(100,116,139,0.1)] hover:text-[#F8FAFC]"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* User */}
      <div className="mt-auto p-4 border-t border-[rgba(100,116,139,0.1)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#334155] flex items-center justify-center text-[#F8FAFC] text-sm font-medium">
            A
          </div>
          <span className="text-[#F8FAFC] text-sm font-medium flex-1" style={{ fontFamily: "'Inter', sans-serif" }}>
            Alex Chen
          </span>
          <span className="bg-[rgba(59,130,246,0.15)] text-[#3B82F6] text-xs px-2 py-0.5 rounded-full font-medium">
            PRO
          </span>
        </div>
      </div>
    </motion.aside>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats Card                                                         */
/* ------------------------------------------------------------------ */
function StatsCard({
  label,
  value,
  change,
  icon: Icon,
  iconColor,
  delay,
}: {
  label: string;
  value: number;
  change: string;
  icon: React.ElementType;
  iconColor: string;
  delay: number;
}) {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const count = useCountUp({ end: value, duration: 1200, isInView });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" as const }}
      whileHover={{ y: -2 }}
      className="will-change-transform"
    >
      <GlassCard className="p-5">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5" style={{ color: iconColor }} />
          <span
            className="text-xs font-medium uppercase text-[#64748B]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {label}
          </span>
        </div>
        <div
          className="text-3xl font-bold text-[#F8FAFC] mt-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {count.toLocaleString()}
        </div>
        <div
          className="text-xs text-[#64748B] mt-1"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {change}
        </div>
      </GlassCard>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Status Badge                                                       */
/* ------------------------------------------------------------------ */
function StatusBadge({ status, color }: { status: string; color: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
      style={{
        borderColor: color,
        backgroundColor: `${color}1A`,
        color,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Circle className="w-1.5 h-1.5 mr-1.5" style={{ fill: color }} />
      {status}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Dashboard Page                                                */
/* ------------------------------------------------------------------ */
export default function Dashboard() {
  const feedRef = useRef<HTMLDivElement>(null);

  // Fetch real projects — fallback to mock data when API unavailable
  const { data: projectsData, isLoading: projectsLoading } =
    trpc.project.list.useQuery(undefined, { staleTime: 30000 });

  const projects = projectsData?.projects?.length
    ? projectsData.projects
    : MOCK_PROJECTS;

  // Pick the most recent project for agent logs
  const recentProjectId = useMemo(() => {
    if (projects.length === 0) return 1;
    const sorted = [...projects].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return sorted[0].id;
  }, [projects]);

  // Fetch agent logs for the most recent project
  const { data: logsData } = trpc.agentLog.list.useQuery(
    { projectId: recentProjectId },
    { enabled: recentProjectId > 0, staleTime: 15000 }
  );

  // Compute stats from real data
  const activeProjects = projects.filter(
    (p) => p.status !== "REJECTED" && p.status !== "LIVE"
  ).length;
  const liveProjects = projects.filter((p) => p.status === "LIVE").length;
  const totalProjects = projects.length;
  const successRate = totalProjects > 0 ? Math.round((liveProjects / totalProjects) * 100) : 94;
  const agentsOnline = 5;
  const signalsToday = Math.floor(1240 + Math.random() * 14);

  // Map projects to active projects list
  const activeProjectsList: Project[] = useMemo(() => {
    return projects
      .filter((p) => p.status !== "REJECTED")
      .slice(0, 5)
      .map((p) => ({
        name: p.name,
        status: p.status,
        statusColor: STATUS_COLOR_MAP[p.status] ?? "#94A3B8",
        updated: formatTimeAgo(p.updatedAt),
      }));
  }, [projects]);

  // Map agent logs to feed entries
  const feed: FeedEntry[] = useMemo(() => {
    if (!logsData?.logs || logsData.logs.length === 0) {
      return [
        { time: "10:42:03", agent: "Trend Scout", color: "#F59E0B", action: "3 new signals found in fintech vertical" },
        { time: "10:41:17", agent: "Business Analyst", color: "#3B82F6", action: "TAM analysis complete for 'AI Tax Assistant'" },
        { time: "10:38:55", agent: "PM Orchestrator", color: "#A78BFA", action: "User stories generated (23 items)" },
        { time: "10:35:21", agent: "Builder Guild", color: "#10B981", action: "Frontend build complete — awaiting QA" },
        { time: "10:32:08", agent: "QA & Deploy", color: "#10B981", action: "All 47 tests passed — ready for deploy" },
        { time: "10:28:44", agent: "Trend Scout", color: "#F59E0B", action: "Monitoring #SaaS trends on X..." },
        { time: "10:25:12", agent: "Business Analyst", color: "#3B82F6", action: "Competitive analysis: 7 competitors mapped" },
        { time: "10:21:39", agent: "Builder Guild", color: "#10B981", action: "API schema defined — 14 endpoints" },
        { time: "10:18:05", agent: "PM Orchestrator", color: "#A78BFA", action: "Sprint plan created — 2 week cycle" },
        { time: "10:14:52", agent: "QA & Deploy", color: "#10B981", action: "Regression suite updated" },
        { time: "10:11:28", agent: "Trend Scout", color: "#F59E0B", action: "Emerging trend: AI voice agents +210%" },
        { time: "10:08:15", agent: "Business Analyst", color: "#3B82F6", action: "Revenue model projection: $2.4M ARR" },
      ];
    }
    const agentColorMap: Record<string, string> = {
      "Trend Scout": "#F59E0B",
      "Business Analyst": "#3B82F6",
      "PM Orchestrator": "#A78BFA",
      "Builder Guild": "#10B981",
      "QA & Deploy": "#10B981",
    };
    return logsData.logs
      .slice()
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .slice(-12)
      .map((log) => ({
        time: timeStr(log.createdAt),
        agent: log.agentName,
        color: agentColorMap[log.agentName] ?? "#94A3B8",
        action: log.message,
      }));
  }, [logsData]);

  // Auto-scroll to bottom of feed
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [feed]);

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Sidebar />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="h-16 bg-[rgba(15,23,42,0.9)] backdrop-blur-md border-b border-[rgba(100,116,139,0.1)] flex items-center justify-between px-4 md:px-6"
        >
          <div>
            <div
              className="text-xs text-[#94A3B8] font-medium"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Dashboard
            </div>
            <div
              className="text-lg md:text-xl text-[#F8FAFC] font-semibold"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Command Center
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-64 bg-[#0F172A] border border-[#334155] rounded-lg pl-9 pr-4 py-2 text-sm text-[#F8FAFC] placeholder-[#64748B] focus:border-[#3B82F6] focus:ring-2 focus:ring-[rgba(59,130,246,0.2)] outline-none transition-all"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>

            {/* Notification */}
            <button className="relative p-2 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#F43F5E] rounded-full animate-pulse" />
            </button>

            {/* New Project */}
            <a href="/projects">
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="hidden sm:flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Plus className="w-4 h-4" />
                <span className="hidden md:inline">New Project</span>
              </motion.button>
            </a>
          </div>
        </motion.header>

        {/* Page Content */}
        <div className="p-4 md:p-6 lg:p-8">
          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
            <StatsCard
              label="Active Projects"
              value={projectsLoading ? 12 : activeProjects}
              change="+3 vs last month"
              icon={FolderOpen}
              iconColor="#3B82F6"
              delay={0}
            />
            <StatsCard
              label="Agents Online"
              value={agentsOnline}
              change="All operational"
              icon={Bot}
              iconColor="#10B981"
              delay={0.08}
            />
            <StatsCard
              label="Signals Today"
              value={signalsToday}
              change="+156 this week"
              icon={TrendingUp}
              iconColor="#F59E0B"
              delay={0.16}
            />
            <StatsCard
              label="Success Rate"
              value={successRate}
              change="99.2% success"
              icon={CheckCircle}
              iconColor="#10B981"
              delay={0.24}
            />
          </div>

          {/* Middle Section: Agent Feed + Active Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Agent Activity Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" as const }}
              className="lg:col-span-2"
            >
              <GlassCard className="p-0 overflow-hidden">
                {/* Header */}
                <div className="p-4 md:p-5 border-b border-[rgba(100,116,139,0.1)] flex items-center justify-between">
                  <h3
                    className="text-base md:text-lg font-semibold text-[#F8FAFC]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Agent Activity
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
                    <span
                      className="text-xs text-[#64748B]"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      LIVE
                    </span>
                  </div>
                </div>

                {/* Feed */}
                <div
                  ref={feedRef}
                  className="max-h-80 overflow-y-auto p-4 md:p-5 space-y-2 md:space-y-3"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#64748B transparent",
                  }}
                >
                  {feed.map((entry, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: Math.min(i * 0.04, 0.5),
                        ease: "easeOut" as const,
                      }}
                      className="flex items-start gap-2 md:gap-3"
                    >
                      <span
                        className="text-[#64748B] text-[10px] md:text-xs shrink-0 w-14 md:w-16 pt-0.5"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {entry.time}
                      </span>
                      <span
                        className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full shrink-0 mt-1"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span
                        className="text-[10px] md:text-xs shrink-0 w-20 md:w-24 truncate pt-0.5"
                        style={{ fontFamily: "'JetBrains Mono', monospace", color: entry.color }}
                      >
                        {entry.agent}
                      </span>
                      <span
                        className="text-[#64748B] text-xs md:text-sm shrink-0 pt-0.5"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        &rarr;
                      </span>
                      <span
                        className="text-[#94A3B8] text-xs md:text-sm"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {entry.action}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Active Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" as const }}
            >
              <GlassCard className="p-0 overflow-hidden">
                <div className="p-4 md:p-5 border-b border-[rgba(100,116,139,0.1)] flex items-center justify-between">
                  <h3
                    className="text-base md:text-lg font-semibold text-[#F8FAFC]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Active Projects
                  </h3>
                  <span className="text-xs text-[#64748B]">
                    {activeProjectsList.length}
                  </span>
                </div>
                <div className="divide-y divide-[rgba(100,116,139,0.05)]">
                  {activeProjectsList.map((project, i) => (
                    <motion.a
                      key={i}
                      href="/projects"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.15 + Math.min(i * 0.05, 0.3),
                        ease: "easeOut" as const,
                      }}
                      className="flex items-center gap-3 px-4 md:px-5 py-3 hover:bg-[rgba(100,116,139,0.05)] transition-colors cursor-pointer"
                    >
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: project.statusColor }} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-[#F8FAFC] truncate">{project.name}</div>
                        <div className="text-[10px] text-[#64748B] mt-0.5">{project.updated}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#64748B] shrink-0" />
                    </motion.a>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Recent Decisions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" as const }}
            className="mt-6 md:mt-8"
          >
            <GlassCard className="p-0 overflow-hidden">
              <div className="p-4 md:p-5 border-b border-[rgba(100,116,139,0.1)]">
                <h3
                  className="text-base md:text-lg font-semibold text-[#F8FAFC]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Recent Decisions
                </h3>
              </div>
              <div className="divide-y divide-[rgba(100,116,139,0.05)]">
                {DECISIONS.map((d, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.25 + Math.min(i * 0.05, 0.3),
                      ease: "easeOut" as const,
                    }}
                    className="flex items-center gap-3 px-4 md:px-5 py-3"
                  >
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.dotColor }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-[#F8FAFC]">{d.action}</div>
                      <div className="text-[10px] text-[#64748B] mt-0.5">{d.meta}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
