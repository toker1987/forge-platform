import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/providers/trpc";
import GlassCard from "@/components/GlassCard";
import {
  Search,
  PlusCircle,
  Filter,
  FolderKanban,
  ChevronRight,
  X,
  Loader2,
} from "lucide-react";

/* ─── Status badge colours ─────────────────────────────────────── */
const statusConfig: Record<
  string,
  { color: string; bg: string; label: string }
> = {
  IDEA_SCOUTED: { color: "#F59E0B", bg: "rgba(245,158,11,0.1)", label: "Idea" },
  CASE_BUILT: { color: "#3B82F6", bg: "rgba(59,130,246,0.1)", label: "Case Built" },
  IN_BUILD: { color: "#A78BFA", bg: "rgba(167,139,250,0.1)", label: "In Build" },
  QA_REVIEW: { color: "#F59E0B", bg: "rgba(245,158,11,0.1)", label: "QA" },
  LIVE: { color: "#10B981", bg: "rgba(16,185,129,0.1)", label: "Live" },
  REJECTED: { color: "#F43F5E", bg: "rgba(244,63,94,0.1)", label: "Rejected" },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] ?? { color: "#94A3B8", bg: "rgba(148,163,184,0.1)", label: status };
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border"
      style={{ color: cfg.color, backgroundColor: cfg.bg, borderColor: cfg.color }}
    >
      {cfg.label}
    </span>
  );
}

/* ─── Signal dots ──────────────────────────────────────────────── */
function SignalDots({ strength }: { strength: string }) {
  const dots = strength === "Strong" ? 3 : strength === "Medium" ? 2 : 1;
  return (
    <div className="flex gap-1">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: i <= dots ? "#3B82F6" : "#334155",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Create Project Modal ────────────────────────────────────── */
function CreateProjectModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const utils = trpc.useUtils();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const create = trpc.project.create.useMutation({
    onSuccess: () => {
      utils.project.list.invalidate();
      setName("");
      setDescription("");
      onClose();
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-5 sm:p-6 w-full max-w-md"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-lg text-[#F8FAFC]">
            Create New Project
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-[#94A3B8] hover:text-[#F8FAFC]"
          >
            <X size={18} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#94A3B8] mb-1.5">
              Project Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., AI Code Review Agent"
              className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-3 py-2.5 text-sm text-[#F8FAFC] placeholder-[#64748B] focus:border-[#3B82F6] focus:ring-2 focus:ring-[rgba(59,130,246,0.2)] outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm text-[#94A3B8] mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the project idea..."
              rows={3}
              className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-3 py-2.5 text-sm text-[#F8FAFC] placeholder-[#64748B] focus:border-[#3B82F6] focus:ring-2 focus:ring-[rgba(59,130,246,0.2)] outline-none transition-all resize-none"
            />
          </div>
          <button
            onClick={() => name.trim() && create.mutate({ name: name.trim(), description: description || undefined })}
            disabled={!name.trim() || create.isPending}
            className="w-full flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-all active:scale-[0.98]"
          >
            {create.isPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <PlusCircle size={16} />
            )}
            Create Project
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Main Page ────────────────────────────────────────────────── */
export default function Projects() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [showCreate, setShowCreate] = useState(false);

  const { data, isLoading } = trpc.project.list.useQuery(
    statusFilter ? { status: statusFilter as "IDEA_SCOUTED" } : {}
  );
  const projects = data?.projects ?? [];

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-space-grotesk font-bold text-xl sm:text-2xl text-[#F8FAFC]">
            Projects
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Manage and track your autonomous product builds
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium px-4 py-2.5 rounded-lg transition-all active:scale-[0.98]"
        >
          <PlusCircle size={16} />
          New Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-[#0F172A] border border-[#334155] rounded-lg pl-9 pr-3 py-2 text-sm text-[#F8FAFC] placeholder-[#64748B] focus:border-[#3B82F6] focus:ring-2 focus:ring-[rgba(59,130,246,0.2)] outline-none transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#0F172A] border border-[#334155] rounded-lg px-3 py-2 text-sm text-[#F8FAFC] outline-none focus:border-[#3B82F6]"
          >
            <option value="">All Status</option>
            <option value="IDEA_SCOUTED">Idea</option>
            <option value="CASE_BUILT">Case Built</option>
            <option value="IN_BUILD">In Build</option>
            <option value="QA_REVIEW">QA</option>
            <option value="LIVE">Live</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="text-center py-12">
          <Loader2 size={24} className="animate-spin text-[#3B82F6] mx-auto mb-2" />
          <p className="text-sm text-[#94A3B8]">Loading projects...</p>
        </div>
      )}

      {/* Desktop Table */}
      {!isLoading && filtered.length > 0 && (
        <div className="hidden sm:block">
          <GlassCard className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(100,116,139,0.1)]">
                  <th className="text-left text-xs font-medium text-[#94A3B8] uppercase px-4 py-3">
                    Project
                  </th>
                  <th className="text-left text-xs font-medium text-[#94A3B8] uppercase px-4 py-3">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-[#94A3B8] uppercase px-4 py-3">
                    Signal
                  </th>
                  <th className="text-left text-xs font-medium text-[#94A3B8] uppercase px-4 py-3">
                    Created
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-[rgba(100,116,139,0.05)] hover:bg-[rgba(15,23,42,0.4)] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-sm text-[#F8FAFC]">
                        {project.name}
                      </div>
                      <div className="text-xs text-[#64748B] truncate max-w-[200px]">
                        {project.description}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={project.status} />
                    </td>
                    <td className="px-4 py-3">
                      <SignalDots strength={project.signalStrength} />
                    </td>
                    <td className="px-4 py-3 text-xs text-[#64748B]">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/projects/${project.id}/case`}
                        className="p-1.5 text-[#94A3B8] hover:text-[#3B82F6] rounded-lg hover:bg-[rgba(59,130,246,0.1)] transition-all"
                      >
                        <ChevronRight size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </div>
      )}

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-3">
        {filtered.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}/case`}
            className="block glass-card p-4 hover:border-[rgba(59,130,246,0.3)] transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-sm text-[#F8FAFC]">
                {project.name}
              </h3>
              <StatusBadge status={project.status} />
            </div>
            <p className="text-xs text-[#94A3B8] mb-2 line-clamp-2">
              {project.description}
            </p>
            <div className="flex items-center justify-between">
              <SignalDots strength={project.signalStrength} />
              <span className="text-xs text-[#64748B]">
                {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {!isLoading && filtered.length === 0 && (
        <div className="text-center py-12">
          <FolderKanban size={32} className="text-[#334155] mx-auto mb-3" />
          <p className="text-sm text-[#94A3B8]">No projects found</p>
          <button
            onClick={() => setShowCreate(true)}
            className="mt-3 text-sm text-[#3B82F6] hover:underline"
          >
            Create your first project
          </button>
        </div>
      )}

      {/* Create modal */}
      <CreateProjectModal open={showCreate} onClose={() => setShowCreate(false)} />
    </div>
  );
}
