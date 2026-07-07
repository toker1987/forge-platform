/**
 * FORGE Mock Data — Offline Fallback
 *
 * These realistic datasets are used when the tRPC backend is unavailable
 * (e.g., static deployment). Every page imports what it needs and falls
 * back automatically.
 */

/* ─── Projects ──────────────────────────────────────────────────── */
export interface MockProject {
  id: number;
  name: string;
  description: string | null;
  status: "IDEA_SCOUTED" | "CASE_BUILT" | "IN_BUILD" | "QA_REVIEW" | "LIVE" | "REJECTED";
  signalStrength: "Strong" | "Medium" | "Weak";
  recommendation: "go" | "go_with_conditions" | "no_go" | null;
  tam: string | null;
  sam: string | null;
  som: string | null;
  painScore: number | null;
  confidenceScore: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export const MOCK_PROJECTS: MockProject[] = [
  {
    id: 1,
    name: "AI Code Review Agent",
    description: "An AI-powered code review tool that automatically reviews pull requests and suggests improvements.",
    status: "CASE_BUILT",
    signalStrength: "Strong",
    recommendation: "go_with_conditions",
    tam: "$2.4B",
    sam: "$480M",
    som: "$24M",
    painScore: 78,
    confidenceScore: 72,
    createdAt: new Date(Date.now() - 86400000 * 2),
    updatedAt: new Date(Date.now() - 3600000 * 4),
  },
  {
    id: 2,
    name: "Micro-SaaS Boilerplate",
    description: "A production-ready boilerplate for building micro-SaaS products with authentication, billing, and deployment.",
    status: "IN_BUILD",
    signalStrength: "Medium",
    recommendation: "go",
    tam: "$1.8B",
    sam: "$360M",
    som: "$18M",
    painScore: 65,
    confidenceScore: 85,
    createdAt: new Date(Date.now() - 86400000 * 5),
    updatedAt: new Date(Date.now() - 3600000 * 8),
  },
  {
    id: 3,
    name: "Developer Onboarding Kit",
    description: "A comprehensive onboarding toolkit for engineering teams to streamline new hire integration.",
    status: "LIVE",
    signalStrength: "Strong",
    recommendation: "go",
    tam: "$3.2B",
    sam: "$640M",
    som: "$32M",
    painScore: 82,
    confidenceScore: 91,
    createdAt: new Date(Date.now() - 86400000 * 14),
    updatedAt: new Date(Date.now() - 3600000 * 2),
  },
  {
    id: 4,
    name: "API Analytics Dashboard",
    description: "Real-time analytics dashboard for API monitoring, usage tracking, and performance optimization.",
    status: "IDEA_SCOUTED",
    signalStrength: "Weak",
    recommendation: "go_with_conditions",
    tam: "$5.1B",
    sam: "$1.2B",
    som: "$60M",
    painScore: 45,
    confidenceScore: 58,
    createdAt: new Date(Date.now() - 86400000 * 1),
    updatedAt: new Date(Date.now() - 3600000 * 1),
  },
  {
    id: 5,
    name: "Open Source Funding Platform",
    description: "A platform that connects open source projects with corporate sponsors and individual donors.",
    status: "CASE_BUILT",
    signalStrength: "Strong",
    recommendation: "go",
    tam: "$1.5B",
    sam: "$300M",
    som: "$15M",
    painScore: 70,
    confidenceScore: 80,
    createdAt: new Date(Date.now() - 86400000 * 3),
    updatedAt: new Date(Date.now() - 3600000 * 6),
  },
  {
    id: 6,
    name: "Team Standup Bot",
    description: "An intelligent Slack bot that automates daily standups and generates progress reports.",
    status: "REJECTED",
    signalStrength: "Weak",
    recommendation: "no_go",
    tam: "$900M",
    sam: "$180M",
    som: "$9M",
    painScore: 30,
    confidenceScore: 25,
    createdAt: new Date(Date.now() - 86400000 * 7),
    updatedAt: new Date(Date.now() - 86400000 * 6),
  },
  {
    id: 7,
    name: "Documentation Generator",
    description: "AI-powered tool that generates comprehensive documentation from code comments and README files.",
    status: "IN_BUILD",
    signalStrength: "Strong",
    recommendation: "go",
    tam: "$2.8B",
    sam: "$560M",
    som: "$28M",
    painScore: 75,
    confidenceScore: 88,
    createdAt: new Date(Date.now() - 86400000 * 4),
    updatedAt: new Date(Date.now() - 3600000 * 3),
  },
  {
    id: 8,
    name: "Remote Pair Programming",
    description: "A browser-based pair programming tool with real-time collaboration and voice chat.",
    status: "QA_REVIEW",
    signalStrength: "Medium",
    recommendation: "go",
    tam: "$4.2B",
    sam: "$840M",
    som: "$42M",
    painScore: 68,
    confidenceScore: 76,
    createdAt: new Date(Date.now() - 86400000 * 10),
    updatedAt: new Date(Date.now() - 3600000 * 5),
  },
];

/* ─── Builds ────────────────────────────────────────────────────── */
export interface MockBuild {
  id: number;
  projectId: number;
  stage: "ARCHITECT" | "FRONTEND" | "BACKEND" | "QA";
  status: "pending" | "running" | "completed" | "failed";
  startedAt: Date;
  completedAt: Date | null;
}

export const MOCK_BUILDS: MockBuild[] = [
  { id: 1, projectId: 2, stage: "ARCHITECT", status: "completed", startedAt: new Date(Date.now() - 86400000), completedAt: new Date(Date.now() - 72000000) },
  { id: 2, projectId: 2, stage: "FRONTEND", status: "completed", startedAt: new Date(Date.now() - 70000000), completedAt: new Date(Date.now() - 50000000) },
  { id: 3, projectId: 2, stage: "BACKEND", status: "running", startedAt: new Date(Date.now() - 48000000), completedAt: null },
  { id: 4, projectId: 2, stage: "QA", status: "pending", startedAt: new Date(Date.now() - 0), completedAt: null },
  { id: 5, projectId: 7, stage: "ARCHITECT", status: "completed", startedAt: new Date(Date.now() - 86400000), completedAt: new Date(Date.now() - 70000000) },
  { id: 6, projectId: 7, stage: "FRONTEND", status: "running", startedAt: new Date(Date.now() - 65000000), completedAt: null },
  { id: 7, projectId: 8, stage: "ARCHITECT", status: "completed", startedAt: new Date(Date.now() - 172800000), completedAt: new Date(Date.now() - 150000000) },
  { id: 8, projectId: 8, stage: "FRONTEND", status: "completed", startedAt: new Date(Date.now() - 140000000), completedAt: new Date(Date.now() - 110000000) },
  { id: 9, projectId: 8, stage: "BACKEND", status: "completed", startedAt: new Date(Date.now() - 100000000), completedAt: new Date(Date.now() - 70000000) },
  { id: 10, projectId: 8, stage: "QA", status: "running", startedAt: new Date(Date.now() - 60000000), completedAt: null },
];

/* ─── Build Steps ───────────────────────────────────────────────── */
export interface MockBuildStep {
  id: number;
  buildId: number;
  name: string;
  status: "pending" | "running" | "completed" | "failed";
  logOutput: string | null;
  startedAt: Date | null;
  completedAt: Date | null;
}

export const MOCK_BUILD_STEPS: MockBuildStep[] = [
  // Build 1 (Project 2, ARCHITECT) — completed
  { id: 1, buildId: 1, name: "Define system architecture", status: "completed", logOutput: "Architecture defined: microservices with event-driven communication", startedAt: new Date(Date.now() - 86400000), completedAt: new Date(Date.now() - 80000000) },
  { id: 2, buildId: 1, name: "Design database schema", status: "completed", logOutput: "Schema created: 12 tables, 8 relationships", startedAt: new Date(Date.now() - 79000000), completedAt: new Date(Date.now() - 72000000) },
  { id: 3, buildId: 1, name: "Set up CI/CD pipeline", status: "completed", logOutput: "GitHub Actions configured with 3-stage pipeline", startedAt: new Date(Date.now() - 71000000), completedAt: new Date(Date.now() - 70000000) },

  // Build 2 (Project 2, FRONTEND) — completed
  { id: 4, buildId: 2, name: "Create component library", status: "completed", logOutput: "24 components created with Storybook documentation", startedAt: new Date(Date.now() - 69000000), completedAt: new Date(Date.now() - 60000000) },
  { id: 5, buildId: 2, name: "Implement dashboard UI", status: "completed", logOutput: "Dashboard with 6 widget types implemented", startedAt: new Date(Date.now() - 59000000), completedAt: new Date(Date.now() - 50000000) },
  { id: 6, buildId: 2, name: "Build settings pages", status: "completed", logOutput: "Settings with 4 tabs: Profile, Billing, API Keys, Security", startedAt: new Date(Date.now() - 49000000), completedAt: new Date(Date.now() - 48000000) },

  // Build 3 (Project 2, BACKEND) — running
  { id: 7, buildId: 3, name: "Implement REST API endpoints", status: "completed", logOutput: "42 endpoints implemented with OpenAPI spec", startedAt: new Date(Date.now() - 47000000), completedAt: new Date(Date.now() - 36000000) },
  { id: 8, buildId: 3, name: "Set up authentication", status: "completed", logOutput: "OAuth 2.0 + JWT sessions configured", startedAt: new Date(Date.now() - 35000000), completedAt: new Date(Date.now() - 28000000) },
  { id: 9, buildId: 3, name: "Configure database migrations", status: "running", logOutput: "Running migration batch 3 of 5...", startedAt: new Date(Date.now() - 27000000), completedAt: null },

  // Build 4 (Project 2, QA) — pending
  { id: 10, buildId: 4, name: "Unit test suite", status: "pending", logOutput: null, startedAt: null, completedAt: null },
  { id: 11, buildId: 4, name: "Integration tests", status: "pending", logOutput: null, startedAt: null, completedAt: null },
  { id: 12, buildId: 4, name: "Performance benchmarks", status: "pending", logOutput: null, startedAt: null, completedAt: null },

  // Build 5 (Project 7, ARCHITECT) — completed
  { id: 13, buildId: 5, name: "Define module structure", status: "completed", logOutput: "Modular architecture with plugin system", startedAt: new Date(Date.now() - 86400000), completedAt: new Date(Date.now() - 75000000) },
  { id: 14, buildId: 5, name: "API contract design", status: "completed", logOutput: "14 REST endpoints + 3 WebSocket channels", startedAt: new Date(Date.now() - 74000000), completedAt: new Date(Date.now() - 70000000) },

  // Build 6 (Project 7, FRONTEND) — running
  { id: 15, buildId: 6, name: "Markdown editor component", status: "completed", logOutput: "Rich text editor with 20+ formatting options", startedAt: new Date(Date.now() - 65000000), completedAt: new Date(Date.now() - 50000000) },
  { id: 16, buildId: 6, name: "Documentation templates", status: "running", logOutput: "Generating template engine with Handlebars... 67%", startedAt: new Date(Date.now() - 49000000), completedAt: null },

  // Build 7-10 (Project 8, QA_REVIEW) — mostly completed
  { id: 17, buildId: 7, name: "Server architecture", status: "completed", logOutput: "Load-balanced 3-node cluster configured", startedAt: new Date(Date.now() - 172800000), completedAt: new Date(Date.now() - 150000000) },
  { id: 18, buildId: 8, name: "React component library", status: "completed", logOutput: "32 components with dark mode support", startedAt: new Date(Date.now() - 140000000), completedAt: new Date(Date.now() - 110000000) },
  { id: 19, buildId: 9, name: "WebSocket server", status: "completed", logOutput: "Real-time sync with 50ms latency target", startedAt: new Date(Date.now() - 100000000), completedAt: new Date(Date.now() - 70000000) },
  { id: 20, buildId: 10, name: "End-to-end testing", status: "running", logOutput: "Running Cypress suite... 34/42 tests passed", startedAt: new Date(Date.now() - 60000000), completedAt: null },
  { id: 21, buildId: 10, name: "Load testing", status: "pending", logOutput: null, startedAt: null, completedAt: null },
];

/* ─── Agent Logs ────────────────────────────────────────────────── */
export interface MockAgentLog {
  id: number;
  projectId: number;
  agentName: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  createdAt: Date;
}

export const MOCK_AGENT_LOGS: MockAgentLog[] = [
  { id: 1, projectId: 1, agentName: "TrendScout", message: "Discovered: AI code review tools trending +340% on GitHub", type: "info", createdAt: new Date(Date.now() - 300000) },
  { id: 2, projectId: 1, agentName: "BusinessAnalyst", message: "TAM analysis complete: $2.4B addressable market", type: "success", createdAt: new Date(Date.now() - 280000) },
  { id: 3, projectId: 1, agentName: "BusinessAnalyst", message: "Identified 7 competitors in the code review space", type: "info", createdAt: new Date(Date.now() - 260000) },
  { id: 4, projectId: 1, agentName: "PMOrchestrator", message: "Generated 23 user stories from business case", type: "success", createdAt: new Date(Date.now() - 240000) },
  { id: 5, projectId: 2, agentName: "TrendScout", message: "Micro-SaaS boilerplate demand rising: +180% search volume", type: "info", createdAt: new Date(Date.now() - 220000) },
  { id: 6, projectId: 2, agentName: "BusinessAnalyst", message: "Revenue model validated: $480K projected ARR", type: "success", createdAt: new Date(Date.now() - 200000) },
  { id: 7, projectId: 2, agentName: "BuilderGuild", message: "Frontend build complete: 24 components, 0 errors", type: "success", createdAt: new Date(Date.now() - 180000) },
  { id: 8, projectId: 2, agentName: "BuilderGuild", message: "Backend migration in progress: batch 3 of 5", type: "info", createdAt: new Date(Date.now() - 160000) },
  { id: 9, projectId: 3, agentName: "QADeploy", message: "Deployment successful: v1.0.0 live on production", type: "success", createdAt: new Date(Date.now() - 140000) },
  { id: 10, projectId: 3, agentName: "TrendScout", message: "Post-launch monitoring: 99.97% uptime achieved", type: "success", createdAt: new Date(Date.now() - 120000) },
  { id: 11, projectId: 4, agentName: "TrendScout", message: "Weak signal detected: API analytics space is crowded", type: "warning", createdAt: new Date(Date.now() - 100000) },
  { id: 12, projectId: 4, agentName: "BusinessAnalyst", message: "Recommendation: proceed with niche differentiation strategy", type: "info", createdAt: new Date(Date.now() - 80000) },
  { id: 13, projectId: 5, agentName: "TrendScout", message: "Open source funding: GitHub Sponsors growth +95% YoY", type: "info", createdAt: new Date(Date.now() - 60000) },
  { id: 14, projectId: 5, agentName: "BusinessAnalyst", message: "Strong market fit: 4.8/5 developer satisfaction score", type: "success", createdAt: new Date(Date.now() - 40000) },
  { id: 15, projectId: 6, agentName: "BusinessAnalyst", message: "Project rejected: risk factors exceed thresholds", type: "error", createdAt: new Date(Date.now() - 86400000) },
  { id: 16, projectId: 7, agentName: "BuilderGuild", message: "Documentation templates: 67% generation complete", type: "info", createdAt: new Date(Date.now() - 50000) },
  { id: 17, projectId: 8, agentName: "QADeploy", message: "Cypress E2E: 34/42 tests passed, 8 flaky tests identified", type: "warning", createdAt: new Date(Date.now() - 30000) },
  { id: 18, projectId: 1, agentName: "TrendScout", message: "Competitor movement: GitHub Copilot adding review features", type: "warning", createdAt: new Date(Date.now() - 15000) },
];

/* ─── Helpers ───────────────────────────────────────────────────── */
export function getProjectById(id: number): MockProject | undefined {
  return MOCK_PROJECTS.find((p) => p.id === id);
}

export function getBuildsByProject(projectId: number): MockBuild[] {
  return MOCK_BUILDS.filter((b) => b.projectId === projectId);
}

export function getStepsByBuild(buildId: number): MockBuildStep[] {
  return MOCK_BUILD_STEPS.filter((s) => s.buildId === buildId);
}

export function getStepsByProject(projectId: number): MockBuildStep[] {
  const buildIds = MOCK_BUILDS.filter((b) => b.projectId === projectId).map((b) => b.id);
  return MOCK_BUILD_STEPS.filter((s) => buildIds.includes(s.buildId));
}

export function getLogsByProject(projectId: number): MockAgentLog[] {
  return MOCK_AGENT_LOGS.filter((l) => l.projectId === projectId);
}

export function getAllLogs(): MockAgentLog[] {
  return MOCK_AGENT_LOGS;
}

export function formatTimeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
