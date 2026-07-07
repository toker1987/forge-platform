import { eq, inArray } from "drizzle-orm";
import { getDb } from "./connection";
import { builds, buildSteps } from "@db/schema";

export async function findBuildsByProject(projectId: number) {
  const db = getDb();
  return db
    .select()
    .from(builds)
    .where(eq(builds.projectId, projectId))
    .orderBy(builds.startedAt);
}

export async function findBuildSteps(buildIds: number[]) {
  if (buildIds.length === 0) return [];
  const db = getDb();
  return db
    .select()
    .from(buildSteps)
    .where(inArray(buildSteps.buildId, buildIds))
    .orderBy(buildSteps.id);
}

export async function createBuild(projectId: number) {
  const db = getDb();
  const result = await db.insert(builds).values({
    projectId,
    stage: "ARCHITECT",
    status: "running",
  });
  const id = Number(result[0].insertId);
  const rows = await db.select().from(builds).where(eq(builds.id, id)).limit(1);
  return rows[0];
}

export async function createBuildStep(buildId: number, name: string) {
  const db = getDb();
  await db.insert(buildSteps).values({
    buildId,
    name,
    status: "pending",
  });
}

export async function updateBuildStep(
  stepId: number,
  status: "pending" | "running" | "completed" | "failed",
  logOutput?: string
) {
  const db = getDb();
  const updates: Record<string, unknown> = { status };
  if (status === "running" && !logOutput) {
    updates.startedAt = new Date();
  }
  if ((status === "completed" || status === "failed") && !logOutput) {
    updates.completedAt = new Date();
  }
  if (logOutput) {
    updates.logOutput = logOutput;
  }
  await db
    .update(buildSteps)
    .set(updates)
    .where(eq(buildSteps.id, stepId));
}
