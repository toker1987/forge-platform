/**
 * FORGE Mock Data Store
 * ======================
 * Offline-first project management with localStorage persistence.
 * All CRUD operations work without a backend.
 */

export type ProjectStatus =
  | "IDEA_SCOUTED"
  | "CASE_BUILT"
  | "IN_BUILD"
  | "QA_REVIEW"
  | "LIVE"
  | "REJECTED";

export type SignalStrength = "Strong" | "Medium" | "Weak";

export interface Project {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  status: ProjectStatus;
  signalStrength: SignalStrength;
  recommendation: "go" | "go_with_conditions" | "no_go" | null;
  tam: string;
  sam: string;
  som: string;
  painScore: number;
  confidenceScore: number;
  marketFit: number;
  techFeasibility: number;
  revenueModel: string;
  arpu: string;
  ltv: string;
  paybackPeriod: string;
  growthRate: string;
  createdAt: string;
  updatedAt: string;
}

export interface AgentLog {
  id: number;
  projectId: number;
  agentName: string;
  message: string;
  createdAt: string;
}

export interface BuildStep {
  id: number;
  buildId: number;
  taskName: string;
  status: "pending" | "in_progress" | "completed" | "failed";
  stage: string;
  createdAt: string;
}

export interface Build {
  id: number;
  projectId: number;
  status: string;
  progress: number;
  createdAt: string;
}

export interface RiskItem {
  severity: "High" | "Medium" | "Low";
  text: string;
  mitigated: boolean;
}

// ─── Seed Data ──────────────────────────────────────────────────────────

const SEED_PROJECTS: Project[] = [
  {
    id: 1,
    name: "AI Code Review Agent",
    description: "An AI-powered code review tool that automatically reviews pull requests, detects bugs, suggests improvements, and enforces coding standards across your engineering team.",
    longDescription: "This product deploys as a GitHub/GitLab app that intercepts pull request events, runs static analysis + LLM-powered review, and posts structured feedback as PR comments. Revenue model: freemium SaaS charging $12/seat/month for teams. Target market: engineering teams at Series A-C startups who need consistent code quality without senior dev overhead.",
    status: "CASE_BUILT",
    signalStrength: "Strong",
    recommendation: "go_with_conditions",
    tam: "$2.4B",
    sam: "$480M",
    som: "$24M",
    painScore: 78,
    confidenceScore: 72,
    marketFit: 85,
    techFeasibility: 76,
    revenueModel: "Freemium SaaS ($12/seat/mo)",
    arpu: "$49/mo",
    ltv: "$2,450",
    paybackPeriod: "4.2 months",
    growthRate: "+34% YoY",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 2,
    name: "Micro-SaaS Boilerplate",
    description: "A production-ready boilerplate with authentication, Stripe billing, database, email, and deployment — everything needed to launch a micro-SaaS in days, not months.",
    longDescription: "Shipped as a Next.js template with pre-built auth (OAuth + magic links), Stripe subscription billing with webhook handling, PostgreSQL via Prisma, transactional emails, and one-click deploy to Vercel/Railway. Target: indie hackers and technical founders who want to validate ideas fast. One-time purchase + paid updates model.",
    status: "IN_BUILD",
    signalStrength: "Medium",
    recommendation: "go",
    tam: "$1.8B",
    sam: "$360M",
    som: "$18M",
    painScore: 82,
    confidenceScore: 91,
    marketFit: 90,
    techFeasibility: 88,
    revenueModel: "One-time purchase ($299) + Updates",
    arpu: "$299",
    ltv: "$450",
    paybackPeriod: "1.5 months",
    growthRate: "+45% YoY",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: 3,
    name: "Developer Onboarding Kit",
    description: "A comprehensive onboarding toolkit for engineering teams — automated environment setup, interactive tutorials, codebase walkthroughs, and progress tracking for new hires.",
    longDescription: "Replaces chaotic Notion docs and shadowing with structured, interactive onboarding paths. New hires get a personalized dashboard with automated dev environment provisioning, codebase exploration tours, video modules, and milestone tracking. Integrates with Slack, GitHub, and HR systems. Revenue: $8/seat/month for teams 10+.",
    status: "LIVE",
    signalStrength: "Strong",
    recommendation: "go",
    tam: "$3.2B",
    sam: "$640M",
    som: "$32M",
    painScore: 85,
    confidenceScore: 88,
    marketFit: 92,
    techFeasibility: 80,
    revenueModel: "Per-seat SaaS ($8/seat/mo)",
    arpu: "$32/mo",
    ltv: "$1,920",
    paybackPeriod: "3.1 months",
    growthRate: "+28% YoY",
    createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 4,
    name: "API Analytics Dashboard",
    description: "Real-time analytics dashboard for API monitoring — track request volume, latency percentiles, error rates, endpoint popularity, and user behavior without adding overhead.",
    longDescription: "Drop-in SDK (3 lines of code) that captures API traffic and streams it to a real-time dashboard. Features: P50/P95/P99 latency tracking, automatic anomaly detection, endpoint-level breakdown, custom alerts via Slack/PagerDuty, and usage-based billing insights. Competes with Datadog API monitoring at 1/10th the price.",
    status: "IDEA_SCOUTED",
    signalStrength: "Weak",
    recommendation: "go_with_conditions",
    tam: "$5.1B",
    sam: "$1.2B",
    som: "$48M",
    painScore: 62,
    confidenceScore: 58,
    marketFit: 65,
    techFeasibility: 82,
    revenueModel: "Usage-based ($0.001/request)",
    arpu: "$89/mo",
    ltv: "$3,200",
    paybackPeriod: "5.8 months",
    growthRate: "+22% YoY",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
  {
    id: 5,
    name: "Open Source Funding Platform",
    description: "A marketplace connecting open source maintainers with corporate sponsors — automated sponsorship management, compliance docs, impact reporting, and maintainer payouts.",
    longDescription: "Open source sustainability crisis: 46% of maintainers burn out within 2 years. This platform automates the entire corporate sponsorship pipeline: discovery, vetting, contract generation, quarterly impact reports, and direct payouts. Takes 5% of sponsorship value. Target: Fortune 500 CSR budgets + foundation grants.",
    status: "CASE_BUILT",
    signalStrength: "Strong",
    recommendation: "go",
    tam: "$890M",
    sam: "$180M",
    som: "$9M",
    painScore: 88,
    confidenceScore: 75,
    marketFit: 78,
    techFeasibility: 85,
    revenueModel: "5% transaction fee",
    arpu: "$2,400/mo",
    ltv: "$28,800",
    paybackPeriod: "2.1 months",
    growthRate: "+67% YoY",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  {
    id: 6,
    name: "Team Standup Bot",
    description: "An intelligent Slack bot that automates daily standups, collects async updates, generates progress reports, and identifies blockers across distributed engineering teams.",
    longDescription: "Replaces synchronous standups with intelligent async updates. The bot DMs team members at their preferred time, collects structured updates (yesterday/today/blockers), generates team summary reports, and flags blockers to managers. Integrates with Jira, Linear, GitHub to auto-pull ticket progress. $6/user/month.",
    status: "REJECTED",
    signalStrength: "Weak",
    recommendation: "no_go",
    tam: "$1.2B",
    sam: "$240M",
    som: "$12M",
    painScore: 45,
    confidenceScore: 38,
    marketFit: 42,
    techFeasibility: 90,
    revenueModel: "$6/user/month",
    arpu: "$24/mo",
    ltv: "$288",
    paybackPeriod: "8.4 months",
    growthRate: "+12% YoY",
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 7,
    name: "Documentation Generator",
    description: "AI-powered tool that generates comprehensive documentation from code comments, README files, and inline annotations — keeping docs in sync with code automatically.",
    longDescription: "Documentation is always outdated. This tool uses AST parsing + LLMs to generate and maintain API docs, component libraries, and architecture diagrams from your actual codebase. Updates docs on every commit. Supports 12 languages. Deploy as GitHub Action or CI plugin. $15/seat/month for teams.",
    status: "IN_BUILD",
    signalStrength: "Strong",
    recommendation: "go",
    tam: "$1.5B",
    sam: "$300M",
    som: "$15M",
    painScore: 80,
    confidenceScore: 85,
    marketFit: 88,
    techFeasibility: 72,
    revenueModel: "$15/seat/month",
    arpu: "$60/mo",
    ltv: "$2,160",
    paybackPeriod: "3.8 months",
    growthRate: "+41% YoY",
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 8,
    name: "Remote Pair Programming",
    description: "A browser-based pair programming tool with real-time collaborative editing, voice chat, screen sharing, and smart cursor tracking — no IDE plugins required.",
    longDescription: "Works entirely in the browser: paste a repo URL, get a shared VS Code-like environment with real-time sync, voice/video chat, and terminal sharing. Target: bootcamps, coding interviews, and remote teams. Free for 2 hours/month, then $20/seat/month. Key differentiator: zero setup, works on mobile.",
    status: "QA_REVIEW",
    signalStrength: "Medium",
    recommendation: "go_with_conditions",
    tam: "$2.8B",
    sam: "$560M",
    som: "$28M",
    painScore: 72,
    confidenceScore: 68,
    marketFit: 75,
    techFeasibility: 65,
    revenueModel: "$20/seat/month",
    arpu: "$80/mo",
    ltv: "$1,920",
    paybackPeriod: "4.5 months",
    growthRate: "+38% YoY",
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
];

const SEED_LOGS: AgentLog[] = [
  { id: 1, projectId: 1, agentName: "TrendScout", message: "Discovered: AI code review tools trending +340% on GitHub", createdAt: new Date(Date.now() - 3600000 * 8).toISOString() },
  { id: 2, projectId: 1, agentName: "BusinessAnalyst", message: "TAM analysis complete: $2.4B addressable market, 7 competitors identified", createdAt: new Date(Date.now() - 3600000 * 7.5).toISOString() },
  { id: 3, projectId: 1, agentName: "PMOrchestrator", message: "Generated 23 user stories from business case document", createdAt: new Date(Date.now() - 3600000 * 7).toISOString() },
  { id: 4, projectId: 2, agentName: "TrendScout", message: "Micro-SaaS boilerplate demand rising: +180% search volume this quarter", createdAt: new Date(Date.now() - 3600000 * 6).toISOString() },
  { id: 5, projectId: 2, agentName: "BusinessAnalyst", message: "Revenue model validated: $480K projected ARR at 2% market penetration", createdAt: new Date(Date.now() - 3600000 * 5.5).toISOString() },
  { id: 6, projectId: 2, agentName: "BuilderGuild", message: "Frontend build complete: 24 components, 0 TypeScript errors", createdAt: new Date(Date.now() - 3600000 * 4).toISOString() },
  { id: 7, projectId: 2, agentName: "BuilderGuild", message: "Backend migration in progress: batch 3 of 5 complete", createdAt: new Date(Date.now() - 3600000 * 3).toISOString() },
  { id: 8, projectId: 3, agentName: "QADeploy", message: "Deployment successful: v1.0.0 live on production", createdAt: new Date(Date.now() - 3600000 * 2).toISOString() },
  { id: 9, projectId: 3, agentName: "TrendScout", message: "Post-launch monitoring: 99.97% uptime, 42 active teams onboarded", createdAt: new Date(Date.now() - 3600000 * 1.5).toISOString() },
  { id: 10, projectId: 4, agentName: "TrendScout", message: "Weak signal: API analytics space crowded with 14+ established players", createdAt: new Date(Date.now() - 3600000 * 1).toISOString() },
  { id: 11, projectId: 4, agentName: "BusinessAnalyst", message: "Recommendation: proceed with niche differentiation strategy", createdAt: new Date(Date.now() - 3600000 * 0.5).toISOString() },
  { id: 12, projectId: 5, agentName: "TrendScout", message: "GitHub Sponsors growth: +95% YoY, corporate OS funding up 3x", createdAt: new Date(Date.now() - 3600000 * 10).toISOString() },
  { id: 13, projectId: 7, agentName: "BuilderGuild", message: "Documentation templates: 67% generation accuracy on test repos", createdAt: new Date(Date.now() - 3600000 * 4).toISOString() },
  { id: 14, projectId: 8, agentName: "QADeploy", message: "Cypress E2E: 34/42 tests passed, 8 flaky tests need fixing", createdAt: new Date(Date.now() - 3600000 * 3).toISOString() },
  { id: 15, projectId: 1, agentName: "BuilderGuild", message: "Architecture decision: microservices over monolith for scalability", createdAt: new Date(Date.now() - 3600000 * 6).toISOString() },
  { id: 16, projectId: 2, agentName: "QADeploy", message: "Performance audit: LCP 1.2s, FID 12ms, CLS 0.02 — all passing", createdAt: new Date(Date.now() - 3600000 * 2).toISOString() },
];

const SEED_BUILDS: Build[] = [
  { id: 1, projectId: 2, status: "in_progress", progress: 67, createdAt: new Date(Date.now() - 3600000 * 8).toISOString() },
  { id: 2, projectId: 7, status: "in_progress", progress: 45, createdAt: new Date(Date.now() - 3600000 * 6).toISOString() },
  { id: 3, projectId: 8, status: "qa_review", progress: 89, createdAt: new Date(Date.now() - 3600000 * 4).toISOString() },
  { id: 4, projectId: 3, status: "completed", progress: 100, createdAt: new Date(Date.now() - 86400000 * 3).toISOString() },
];

const SEED_BUILD_STEPS: BuildStep[] = [
  { id: 1, buildId: 1, taskName: "Database schema design", status: "completed", stage: "Architect", createdAt: new Date(Date.now() - 3600000 * 8).toISOString() },
  { id: 2, buildId: 1, taskName: "API endpoint specification", status: "completed", stage: "Architect", createdAt: new Date(Date.now() - 3600000 * 7.5).toISOString() },
  { id: 3, buildId: 1, taskName: "Auth system (OAuth + Magic Links)", status: "completed", stage: "Backend", createdAt: new Date(Date.now() - 3600000 * 7).toISOString() },
  { id: 4, buildId: 1, taskName: "Stripe billing integration", status: "completed", stage: "Backend", createdAt: new Date(Date.now() - 3600000 * 6).toISOString() },
  { id: 5, buildId: 1, taskName: "Landing page + pricing", status: "completed", stage: "Frontend", createdAt: new Date(Date.now() - 3600000 * 5).toISOString() },
  { id: 6, buildId: 1, taskName: "Dashboard UI components", status: "in_progress", stage: "Frontend", createdAt: new Date(Date.now() - 3600000 * 4).toISOString() },
  { id: 7, buildId: 1, taskName: "Email templates (welcome, receipt)", status: "pending", stage: "Backend", createdAt: new Date(Date.now() - 3600000 * 3).toISOString() },
  { id: 8, buildId: 1, taskName: "E2E test suite", status: "pending", stage: "QA", createdAt: new Date(Date.now() - 3600000 * 2).toISOString() },
  { id: 9, buildId: 2, taskName: "AST parser for TypeScript", status: "completed", stage: "Architect", createdAt: new Date(Date.now() - 3600000 * 6).toISOString() },
  { id: 10, buildId: 2, taskName: "LLM prompt engineering", status: "completed", stage: "Backend", createdAt: new Date(Date.now() - 3600000 * 5).toISOString() },
  { id: 11, buildId: 2, taskName: "GitHub Action integration", status: "in_progress", stage: "Backend", createdAt: new Date(Date.now() - 3600000 * 4).toISOString() },
  { id: 12, buildId: 2, taskName: "Documentation theme system", status: "pending", stage: "Frontend", createdAt: new Date(Date.now() - 3600000 * 3).toISOString() },
  { id: 13, buildId: 3, taskName: "WebRTC connection manager", status: "completed", stage: "Backend", createdAt: new Date(Date.now() - 3600000 * 5).toISOString() },
  { id: 14, buildId: 3, taskName: "Real-time code sync engine", status: "completed", stage: "Backend", createdAt: new Date(Date.now() - 3600000 * 4.5).toISOString() },
  { id: 15, buildId: 3, taskName: "Voice/video chat overlay", status: "completed", stage: "Frontend", createdAt: new Date(Date.now() - 3600000 * 4).toISOString() },
  { id: 16, buildId: 3, taskName: "Terminal sharing component", status: "completed", stage: "Frontend", createdAt: new Date(Date.now() - 3600000 * 3).toISOString() },
  { id: 17, buildId: 3, taskName: "Fix flaky Cypress tests", status: "in_progress", stage: "QA", createdAt: new Date(Date.now() - 3600000 * 2).toISOString() },
  { id: 18, buildId: 3, taskName: "Load testing (100 concurrent rooms)", status: "pending", stage: "QA", createdAt: new Date(Date.now() - 3600000 * 1).toISOString() },
];

const SEED_RISKS: Record<number, RiskItem[]> = {
  1: [
    { severity: "High", text: "12+ competitors including GitHub Copilot adding review features", mitigated: false },
    { severity: "Medium", text: "Customer acquisition cost may exceed projections in Q2-Q3", mitigated: false },
    { severity: "Low", text: "Technical complexity of real-time analysis engine", mitigated: true },
    { severity: "Medium", text: "Regulatory compliance for code access permissions", mitigated: true },
  ],
  2: [
    { severity: "Low", text: "Template market becoming saturated with free alternatives", mitigated: true },
    { severity: "Medium", text: "Need continuous updates to stay relevant with framework changes", mitigated: false },
    { severity: "Low", text: "One-time purchase model limits recurring revenue", mitigated: true },
  ],
  3: [
    { severity: "Low", text: "Market education required — many teams don't see onboarding as a product", mitigated: true },
    { severity: "Medium", text: "Integration maintenance with third-party tools", mitigated: false },
  ],
  4: [
    { severity: "High", text: "14+ established competitors including Datadog and New Relic", mitigated: false },
    { severity: "High", text: "Enterprise sales cycle 6-12 months", mitigated: false },
    { severity: "Medium", text: "Usage-based pricing creates revenue unpredictability", mitigated: false },
  ],
  5: [
    { severity: "Medium", text: "Dependent on corporate budget cycles and CSR trends", mitigated: false },
    { severity: "Low", text: "Maintainer adoption requires cultural shift in open source", mitigated: true },
  ],
  6: [
    { severity: "High", text: "Market size too small, weak demand signal", mitigated: false },
    { severity: "High", text: "Competing with free Slack workflows and Notion templates", mitigated: false },
  ],
  7: [
    { severity: "Medium", text: "LLM hallucination can produce incorrect documentation", mitigated: false },
    { severity: "Low", text: "Need support for 12+ programming languages", mitigated: true },
  ],
  8: [
    { severity: "Medium", text: "WebRTC reliability issues on corporate networks", mitigated: false },
    { severity: "Medium", text: "High infrastructure cost for real-time sync", mitigated: false },
    { severity: "Low", text: "Mobile browser compatibility gaps", mitigated: true },
  ],
};

// ─── LocalStorage Store ─────────────────────────────────────────────────

const STORAGE_KEY = "forge_projects";
const LOGS_STORAGE_KEY = "forge_logs";
let nextId = 100;

function loadProjects(): Project[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Project[];
      nextId = Math.max(...parsed.map((p) => p.id), 99) + 1;
      return parsed;
    }
  } catch { /* ignore */ }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PROJECTS));
  return [...SEED_PROJECTS];
}

function saveProjects(projects: Project[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function getAllProjects(): Project[] {
  return loadProjects();
}

export function getProjectById(id: number): Project | undefined {
  return loadProjects().find((p) => p.id === id);
}

export function createProject(name: string, description: string): Project {
  const projects = loadProjects();
  const newProject: Project = {
    id: nextId++,
    name,
    description,
    longDescription: "A new project created by the user. FORGE agents will research the market opportunity and build a comprehensive business case.",
    status: "IDEA_SCOUTED",
    signalStrength: "Medium",
    recommendation: null,
    tam: "$TBD",
    sam: "$TBD",
    som: "$TBD",
    painScore: 0,
    confidenceScore: 0,
    marketFit: 0,
    techFeasibility: 0,
    revenueModel: "TBD",
    arpu: "TBD",
    ltv: "TBD",
    paybackPeriod: "TBD",
    growthRate: "TBD",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  projects.unshift(newProject);
  saveProjects(projects);

  addLog(newProject.id, "TrendScout", `New project created: ${name}. Beginning market research...`);
  addLog(newProject.id, "PMOrchestrator", `Project registered. Will assign agents based on signal strength.`);

  return newProject;
}

export function updateProjectStatus(id: number, status: ProjectStatus) {
  const projects = loadProjects();
  const idx = projects.findIndex((p) => p.id === id);
  if (idx >= 0) {
    projects[idx] = { ...projects[idx], status, updatedAt: new Date().toISOString() };
    saveProjects(projects);
  }
}

export function deleteProject(id: number) {
  const projects = loadProjects().filter((p) => p.id !== id);
  saveProjects(projects);
}

// ─── Logs ───────────────────────────────────────────────────────────────

function loadLogs(): AgentLog[] {
  try {
    const stored = localStorage.getItem(LOGS_STORAGE_KEY);
    if (stored) return JSON.parse(stored) as AgentLog[];
  } catch { /* ignore */ }
  localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(SEED_LOGS));
  return [...SEED_LOGS];
}

export function getAllLogs(): AgentLog[] {
  return loadLogs();
}

export function getLogsByProject(projectId: number): AgentLog[] {
  return loadLogs().filter((l) => l.projectId === projectId);
}

export function addLog(projectId: number, agentName: string, message: string): AgentLog {
  const logs = loadLogs();
  const newLog: AgentLog = {
    id: Date.now(),
    projectId,
    agentName,
    message,
    createdAt: new Date().toISOString(),
  };
  logs.push(newLog);
  localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(logs));
  return newLog;
}

// ─── Builds ─────────────────────────────────────────────────────────────

export function getBuildsByProject(projectId: number): Build[] {
  return SEED_BUILDS.filter((b) => b.projectId === projectId);
}

export function getDefaultBuild(projectId: number): Build {
  const builds = getBuildsByProject(projectId);
  return builds[0] ?? { id: 0, projectId, status: "pending", progress: 0, createdAt: new Date().toISOString() };
}

// ─── Build Steps ────────────────────────────────────────────────────────

export function getStepsByBuild(buildId: number): BuildStep[] {
  return SEED_BUILD_STEPS.filter((s) => s.buildId === buildId);
}

export function getDefaultSteps(projectId: number): BuildStep[] {
  const build = getDefaultBuild(projectId);
  return getStepsByBuild(build.id);
}

// ─── Risks ──────────────────────────────────────────────────────────────

export function getRisksByProject(projectId: number): RiskItem[] {
  return SEED_RISKS[projectId] ?? [
    { severity: "Medium", text: "Market validation still pending", mitigated: false },
    { severity: "Low", text: "Technical approach to be confirmed", mitigated: false },
  ];
}

// ─── React Hook ─────────────────────────────────────────────────────────

import { useState, useCallback } from "react";

export function useLocalProjects() {
  const [projects, setProjects] = useState<Project[]>(loadProjects);
  const [logs, setLogs] = useState<AgentLog[]>(loadLogs);

  const refresh = useCallback(() => {
    setProjects(loadProjects());
    setLogs(loadLogs());
  }, []);

  const addProject = useCallback((name: string, description: string) => {
    const p = createProject(name, description);
    setProjects(loadProjects());
    setLogs(loadLogs());
    return p;
  }, []);

  const removeProject = useCallback((id: number) => {
    deleteProject(id);
    refresh();
  }, [refresh]);

  return { projects, logs, addProject, removeProject, refresh };
}
