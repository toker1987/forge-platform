import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  MoreVertical,
  FolderOpen,
  X,
  Loader2,
} from "lucide-react";
import GlassCard from "../components/GlassCard";
import { Link } from "react-router-dom";
import { trpc } from "@/providers/trpc";
import { MOCK_PROJECTS } from "@/lib/mock-data";

// ─── Types ───────────────────────────────────────────────────────────
type ProjectStatus =
  | "IDEA_SCOUTED"
  | "CASE_BUILT"
  | "IN_BUILD"
  | "QA_REVIEW"
  | "LIVE"
  | "REJECTED";

type SignalStrength = "Strong" | "Medium" | "Weak";

// ─── Status Config ───────────────────────────────────────────────────
const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; color: string; bg: string; border: string; pulse?: boolean }
> = {
  IDEA_SCOUTED: {
    label: "Idea Scouted",
    color: "text-[#F59E0B]",
    bg: "bg-[rgba(245,158,11,0.1)]",
    border: "border-[#F59E0B]",
    pulse: true,
  },
  CASE_BUILT: {
    label: "Case Built",
    color: "text-[#3B82F6]",
    bg: "bg-[rgba(59,130,246,0.1)]",
    border: "border-[#3B82F6]",
  },
  IN_BUILD: {
    label: "In Build",
    color: "text-[#A78BFA]",
    bg: "bg-[rgba(167,139,250,0.1)]",
    border: "border-[#A78BFA]",
    pulse: true,
  },
  QA_REVIEW: {
    label: "QA Review",
    color: "text-[#F59E0B]",
    bg: "bg-[rgba(245,158,11,0.1)]",
    border: "border-[#F59E0B]",
    pulse: true,
  },
  LIVE: {
    label: "Live",
    color: "text-[#10B981]",
    bg: "bg-[rgba(16,185,129,0.1)]",
    border: "border-[#10B981]",
  },
  REJECTED: {
    label: "Rejected",
    color: "text-[#F43F5E]",
    bg: "bg-[rgba(244,63,94,0.1)]",
    border: "border-[#F43F5E]",
  },
};

const SIGNAL_CONFIG: Record<SignalStrength, string> = {
  Strong: "bg-[#10B981]",
  Medium: "bg-[#F59E0B]",
  Weak: "bg-[#F43F5E]",
};

const STAGE_MAP: Record<ProjectStatus, string> = {
  IDEA_SCOUTED: "Research",
  CASE_BUILT: "Analysis Complete",
  IN_BUILD: "Building",
  QA_REVIEW: "Testing",
  LIVE: "Deployed",
  REJECTED: "Rejected",
};

// ─── Status Badge Component ──────────────────────────────────────────
function StatusBadge({ status }: { status: ProjectStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${cfg.color} ${cfg.bg} ${cfg.border} ${
        cfg.pulse ? "animate-pulse" : ""
      }`}
    >
      {cfg.label}
    </span>
  );
}

// ─── Signal Dots ─────────────────────────────────────────────────────
function SignalDots({ strength }: { strength: SignalStrength }) {
  const count = strength === "Strong" ? 3 : strength === "Medium" ? 2 : 1;
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i < count ? SIGNAL_CONFIG[strength] : "bg-[#334155]"
          }`}
        />
      ))}
      <span className="ml-1.5 text-xs text-[#94A3B8]">{strength}</span>
    </div>
  );
}

// ─── Animation Helpers ───────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const rowVariant = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

// ─── Create Project Modal ────────────────────────────────────────────
function CreateProjectModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const utils = trpc.useUtils();

  const createMutation = trpc.project.create.useMutation({
    onSuccess: () => {
      utils.project.list.invalidate();
      setName("");
      setDescription("");
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    createMutation.mutate({ name: name.trim(), description: description.trim() || undefined });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" as const }}
            className="bg-[#0B1120] border border-[rgba(100,116,139,0.2)] rounded-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#F8FAFC]">New Project</h2>
              <button
                onClick={onClose}
                className="p-1 text-[#64748B] hover:text-[#F8FAFC] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-[#94A3B8] font-medium mb-1.5">
                  Project Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. AI Code Review Agent"
                  required
                  className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2.5 text-sm text-[#F8FAFC] placeholder-[#64748B] focus:border-[#3B82F6] focus:ring-2 focus:ring-[rgba(59,130,246,0.2)] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-[#94A3B8] font-medium mb-1.5">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the project..."
                  rows={3}
                  className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2.5 text-sm text-[#F8FAFC] placeholder-[#64748B] focus:border-[#3B82F6] focus:ring-2 focus:ring-[rgba(59,130,246,0.2)] outline-none transition-all resize-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || !name.trim()}
                  className="flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2 text-sm font-medium transition-all"
                >
                  {createMutation.isPending && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  Create Project
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Loading Skeleton ────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center animate-pulse">
      <div className="col-span-4">
        <div className="h-4 bg-[#334155] rounded w-3/4" />
        <div className="h-3 bg-[#334155] rounded w-1/2 mt-2" />
      </div>
      <div className="col-span-2">
        <div className="h-5 bg-[#334155] rounded w-20" />
      </div>
      <div className="col-span-2">
        <div className="h-4 bg-[#334155] rounded w-16" />
      </div>
      <div className="col-span-2">
        <div className="h-4 bg-[#334155] rounded w-20" />
      </div>
      <div className="col-span-2">
        <div className="h-4 bg-[#334155] rounded w-12 ml-auto" />
      </div>
    </div>
  );
}

// ─── Helper ──────────────────────────────────────────────────────────
function formatTimeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

// ─── Main Page ───────────────────────────────────────────────────────
export default function Projects() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<string>("updated");
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch real projects — fallback to mock data when API unavailable
  const { data, isLoading } = trpc.project.list.useQuery(undefined, {
    staleTime: 30000,
  });

  const rawProjects = data?.projects?.length ? data.projects : MOCK_PROJECTS;
  const projects = rawProjects.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description ?? "",
    status: p.status as ProjectStatus,
    signal: (p.signalStrength ?? "Medium") as SignalStrength,
    stage: STAGE_MAP[p.status as ProjectStatus] ?? p.status,
    tenant: "Internal",
    started: formatTimeAgo(p.createdAt),
  }));

  const statusOptions = [
    { value: "ALL", label: "All Statuses" },
    { value: "IDEA_SCOUTED", label: "Idea Scouted" },
    { value: "CASE_BUILT", label: "Case Built" },
    { value: "IN_BUILD", label: "In Build" },
    { value: "QA_REVIEW", label: "QA Review" },
    { value: "LIVE", label: "Live" },
    { value: "REJECTED", label: "Rejected" },
  ];

  const filtered = projects
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "status") return a.status.localeCompare(b.status);
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC]">
      {/* Top Bar */}
      <div className="border-b border-[rgba(100,116,139,0.1)] bg-[rgba(11,17,32,0.5)] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
            <span className="font-medium">Projects</span>
            <span className="text-[#64748B]">/</span>
            <span className="text-[#64748B]">All Projects</span>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg px-4 py-2 text-sm font-medium transition-all"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full bg-[#0F172A] border border-[#334155] rounded-lg pl-9 pr-4 py-2.5 text-sm text-[#F8FAFC] placeholder-[#64748B] focus:border-[#3B82F6] focus:ring-2 focus:ring-[rgba(59,130,246,0.2)] outline-none transition-all"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#0F172A] border border-[#334155] rounded-lg px-3 py-2.5 text-sm text-[#F8FAFC] outline-none"
            >
              {statusOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#0F172A] border border-[#334155] rounded-lg px-3 py-2.5 text-sm text-[#F8FAFC] outline-none"
            >
              <option value="updated">Last Updated</option>
              <option value="name">Name</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>

        {/* Project Table */}
        <GlassCard className="mt-6 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-[rgba(100,116,139,0.1)] text-xs font-medium text-[#64748B] uppercase tracking-wider">
            <div className="col-span-4">Project</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Signal</div>
            <div className="col-span-2">Stage</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Loading */}
          {isLoading && (
            <>
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </>
          )}

          {/* Rows */}
          {!isLoading && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  variants={rowVariant}
                  className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-[rgba(100,116,139,0.05)] hover:bg-[rgba(100,116,139,0.03)] transition-colors"
                >
                  <div className="col-span-4">
                    <Link
                      to={`/projects/${project.id}/case`}
                      className="text-sm font-medium text-[#F8FAFC] hover:text-[#3B82F6] transition-colors"
                    >
                      {project.name}
                    </Link>
                    <p className="text-xs text-[#64748B] mt-0.5 line-clamp-1">
                      {project.description}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <StatusBadge status={project.status} />
                  </div>
                  <div className="col-span-2">
                    <SignalDots strength={project.signal} />
                  </div>
                  <div className="col-span-2">
                    <span className="text-xs text-[#94A3B8]">{project.stage}</span>
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-1">
                    <Link
                      to={`/projects/${project.id}/case`}
                      className="p-1.5 text-[#94A3B8] hover:text-[#3B82F6] rounded-lg hover:bg-[rgba(59,130,246,0.1)] transition-all"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button className="p-1.5 text-[#94A3B8] hover:text-[#F8FAFC] rounded-lg hover:bg-[rgba(100,116,139,0.1)] transition-all">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-[#94A3B8] hover:text-[#F8FAFC] rounded-lg hover:bg-[rgba(100,116,139,0.1)] transition-all">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {!isLoading && filtered.length === 0 && (
            <div className="py-12 text-center">
              <FolderOpen className="w-10 h-10 text-[#334155] mx-auto mb-3" />
              <p className="text-sm text-[#64748B]">No projects found</p>
              <button
                onClick={() => setModalOpen(true)}
                className="mt-2 text-sm text-[#3B82F6] hover:underline"
              >
                Create your first project
              </button>
            </div>
          )}
        </GlassCard>
      </div>

      {/* Create Modal */}
      <CreateProjectModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
