import { eq, desc } from "drizzle-orm";
import { getDb } from "./connection";
import { projects } from "@db/schema";
import type { InsertProject } from "@db/schema";

export async function findProjects(status?: string) {
  const db = getDb();
  if (status) {
    return db
      .select()
      .from(projects)
      .where(eq(projects.status, status as "IDEA_SCOUTED"))
      .orderBy(desc(projects.createdAt));
  }
  return db.select().from(projects).orderBy(desc(projects.createdAt));
}

export async function findProjectById(id: number) {
  const db = getDb();
  const rows = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id))
    .limit(1);
  return rows[0] ?? null;
}

export async function createProject(data: { name: string; description: string | null }) {
  const db = getDb();
  const result = await db.insert(projects).values({
    name: data.name,
    description: data.description,
    status: "IDEA_SCOUTED",
    signalStrength: "Medium",
    recommendation: "go_with_conditions",
    painScore: Math.floor(Math.random() * 40) + 50,
    confidenceScore: Math.floor(Math.random() * 30) + 60,
    tam: `$${(Math.random() * 5 + 1).toFixed(1)}B`,
    sam: `$${(Math.random() * 800 + 200).toFixed(0)}M`,
    som: `$${(Math.random() * 50 + 10).toFixed(0)}M`,
  });
  const id = Number(result[0].insertId);
  const row = await findProjectById(id);
  if (!row) throw new Error("Failed to create project");
  return row;
}

export async function updateProjectStatus(
  id: number,
  status: "IDEA_SCOUTED" | "CASE_BUILT" | "IN_BUILD" | "QA_REVIEW" | "LIVE" | "REJECTED"
) {
  const db = getDb();
  await db
    .update(projects)
    .set({ status })
    .where(eq(projects.id, id));
}

export async function deleteProject(id: number) {
  const db = getDb();
  await db.delete(projects).where(eq(projects.id, id));
}
