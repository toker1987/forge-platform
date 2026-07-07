import { getDb } from "./queries/connection";
import { projects, agentLogs, builds, buildSteps } from "./schema";

async function seed() {
  const db = getDb();

  // Seed projects
  const projectData = [
    {
      name: "AI Code Review Agent",
      description: "An AI-powered code review tool that automatically reviews pull requests and suggests improvements.",
      status: "CASE_BUILT" as const,
      signalStrength: "Strong" as const,
      recommendation: "go_with_conditions" as const,
      tam: "$2.4B",
      sam: "$480M",
      som: "$24M",
      painScore: 78,
      confidenceScore: 72,
    },
    {
      name: "Micro-SaaS Boilerplate",
      description: "A production-ready boilerplate for building micro-SaaS products with authentication, billing, and deployment.",
      status: "IN_BUILD" as const,
      signalStrength: "Medium" as const,
      recommendation: "go" as const,
      tam: "$1.8B",
      sam: "$360M",
      som: "$18M",
      painScore: 65,
      confidenceScore: 85,
    },
    {
      name: "Developer Onboarding Kit",
      description: "A comprehensive onboarding toolkit for engineering teams to streamline new hire integration.",
      status: "LIVE" as const,
      signalStrength: "Strong" as const,
      recommendation: "go" as const,
      tam: "$3.2B",
      sam: "$640M",
      som: "$32M",
      painScore: 82,
      confidenceScore: 91,
    },
    {
      name: "API Analytics Dashboard",
      description: "Real-time analytics dashboard for API monitoring, usage tracking, and performance optimization.",
      status: "IDEA_SCOUTED" as const,
      signalStrength: "Weak" as const,
      recommendation: "go_with_conditions" as const,
      tam: "$5.1B",
      sam: "$1.2B",
      som: "$60M",
      painScore: 45,
      confidenceScore: 58,
    },
    {
      name: "Team Standup Bot",
      description: "An intelligent Slack bot that automates daily standups and generates progress reports.",
      status: "REJECTED" as const,
      signalStrength: "Weak" as const,
      recommendation: "no_go" as const,
      tam: "$900M",
      sam: "$180M",
      som: "$9M",
      painScore: 30,
      confidenceScore: 25,
    },
  ];

  for (const data of projectData) {
    const result = await db.insert(projects).values(data);
    const projectId = Number(result[0].insertId);

    // Seed agent logs
    const logs = [
      { projectId, agentName: "TrendScout", message: `Discovered trend signal for "${data.name}"`, type: "info" as const },
      { projectId, agentName: "BusinessAnalyst", message: `Market analysis complete for "${data.name}"`, type: "success" as const },
      { projectId, agentName: "PMOrchestrator", message: `Project plan created for "${data.name}"`, type: data.status === "REJECTED" ? "error" as const : "info" as const },
    ];
    await db.insert(agentLogs).values(logs);

    // Seed builds for IN_BUILD projects
    if (data.status === "IN_BUILD") {
      const buildResult = await db.insert(builds).values({
        projectId,
        stage: "ARCHITECT",
        status: "running",
      });
      const buildId = Number(buildResult[0].insertId);

      await db.insert(buildSteps).values([
        { buildId, name: "Define system architecture", status: "completed" },
        { buildId, name: "Design database schema", status: "completed" },
        { buildId, name: "Set up CI/CD pipeline", status: "running" },
      ]);
    }
  }

  console.log("Seed complete!");
}

seed().catch(console.error);
