import { eq, desc } from "drizzle-orm";
import { getDb } from "./connection";
import { agentLogs } from "@db/schema";
import type { InsertAgentLog } from "@db/schema";

export async function findLogsByProject(projectId: number) {
  const db = getDb();
  return db
    .select()
    .from(agentLogs)
    .where(eq(agentLogs.projectId, projectId))
    .orderBy(desc(agentLogs.createdAt))
    .limit(50);
}

export async function createAgentLog(data: InsertAgentLog) {
  const db = getDb();
  await db.insert(agentLogs).values(data);
}
