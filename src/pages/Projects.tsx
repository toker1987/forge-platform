import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { trpc } from "@/providers/trpc"
import { MOCK_PROJECTS } from "@/lib/mock-data"
import {
  Search, Plus, X, Loader2, FolderOpen,
  ChevronRight, Filter,
} from "lucide-react"

/* ─── Status Config ─────────────────────────────────────────────── */
const STATUS_CFG: Record<string, { label: string; color: string }> = {
  IDEA_SCOUTED: { label: "Idea", color: "#F59E0B" },
  CASE_BUILT: { label: "Case", color: "#3B82F6" },
  IN_BUILD: { label: "Build", color: "#8B5CF6" },
  QA_REVIEW: { label: "QA", color: "#F59E0B" },
  LIVE: { label: "Live", color: "#10B981" },
  REJECTED: { label: "Dead", color: "#F43F5E" },
}

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CFG[status] || { label: status, color: "#64748B" }
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
      style={{ color: cfg.color, backgroundColor: `${cfg.color}18` }}
    >
      {cfg.label}
    </span>
  )
}

function SignalDots({ strength }: { strength: string }) {
  const n = strength === "Strong" ? 3 : strength === "Medium" ? 2 : 1
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map(i => (
        <span key={i} className={`w-1 h-1 rounded-full ${i < n ? "bg-[#3B82F6]" : "bg-[#1e293b]"}`} />
      ))}
      <span className="text-[10px] text-[#475569] ml-1">{strength}</span>
    </div>
  )
}

function timeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  const s = Math.floor((Date.now() - d.getTime()) / 1000)
  if (s < 60) return "now"
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h`
  return `${Math.floor(h / 24)}d`
}

/* ─── Create Modal ──────────────────────────────────────────────── */
function CreateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const utils = trpc.useUtils()
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")

  const create = trpc.project.create.useMutation({
    onSuccess: () => {
      utils.project.list.invalidate()
      setName("")
      setDesc("")
      onClose()
    },
  })

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#0c111b] border border-white/[0.08] rounded-xl p-6 w-full max-w-md"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-semibold text-white">New Project</h3>
              <button onClick={onClose} className="p-1 text-[#475569] hover:text-white"><X size={16} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] text-[#475569] mb-1.5">Project Name</label>
                <input
                  type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="e.g. AI Code Review Agent"
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] text-white placeholder-[#334155] focus:border-[#3B82F6]/50 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#475569] mb-1.5">Description</label>
                <textarea
                  value={desc} onChange={e => setDesc(e.target.value)}
                  placeholder="Brief description..."
                  rows={3}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] text-white placeholder-[#334155] focus:border-[#3B82F6]/50 focus:outline-none transition-colors resize-none"
                />
              </div>
              <button
                onClick={() => name.trim() && create.mutate({ name: name.trim(), description: desc.trim() || undefined })}
                disabled={!name.trim() || create.isPending}
                className="w-full flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-40 text-white text-[13px] font-medium py-2.5 rounded-lg transition-colors"
              >
                {create.isPending ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                Create Project
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── MAIN PAGE ─────────────────────────────────────────────────── */
export default function Projects() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [showCreate, setShowCreate] = useState(false)

  const { data, isLoading } = trpc.project.list.useQuery(undefined, { staleTime: Infinity })
  const rawProjects = data?.projects?.length ? data.projects : MOCK_PROJECTS

  const filtered = rawProjects.filter(p => {
    const q = search.toLowerCase()
    const matchSearch = !q || p.name.toLowerCase().includes(q) || (p.description || "").toLowerCase().includes(q)
    const matchStatus = statusFilter === "ALL" || p.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-5 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Projects</h1>
          <p className="text-[12px] text-[#475569] mt-0.5">{rawProjects.length} projects total</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-[12px] font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={14} /> New Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#334155]" />
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-white/[0.02] border border-white/[0.06] rounded-lg pl-9 pr-3 py-2 text-[13px] text-white placeholder-[#334155] focus:border-[#3B82F6]/50 focus:outline-none transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="bg-white/[0.02] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none"
          >
            <option value="ALL">All Status</option>
            {Object.entries(STATUS_CFG).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-3 px-5 py-3 border-b border-white/[0.06] text-[10px] text-[#475569] uppercase tracking-wider font-medium">
          <div className="col-span-4">Project</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Signal</div>
          <div className="col-span-2 hidden sm:block">Updated</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Rows */}
        {isLoading ? (
          <div className="px-5 py-8 text-center text-[#475569] text-[13px]">
            <Loader2 size={18} className="animate-spin mx-auto mb-2 text-[#3B82F6]" /> Loading...
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <FolderOpen size={24} className="text-[#1e293b] mx-auto mb-2" />
            <p className="text-[13px] text-[#475569]">No projects found</p>
          </div>
        ) : (
          filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
              className="grid grid-cols-12 gap-3 px-5 py-3 border-b border-white/[0.03] last:border-0 items-center hover:bg-white/[0.015] transition-colors group"
            >
              <div className="col-span-4 min-w-0">
                <Link to={`/projects/${project.id}/case`} className="text-[13px] font-medium text-white truncate hover:text-[#3B82F6] transition-colors block">
                  {project.name}
                </Link>
                <p className="text-[10px] text-[#475569] truncate">{project.description}</p>
              </div>
              <div className="col-span-2"><StatusBadge status={project.status} /></div>
              <div className="col-span-2"><SignalDots strength={project.signalStrength} /></div>
              <div className="col-span-2 hidden sm:block text-[11px] text-[#475569]">{timeAgo(project.updatedAt)}</div>
              <div className="col-span-2 flex justify-end">
                <Link
                  to={`/projects/${project.id}/case`}
                  className="p-1.5 text-[#334155] hover:text-[#3B82F6] rounded-md hover:bg-white/[0.04] transition-colors"
                >
                  <ChevronRight size={15} />
                </Link>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <CreateModal open={showCreate} onClose={() => setShowCreate(false)} />
    </div>
  )
}
