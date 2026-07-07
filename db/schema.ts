import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  bigint,
  int,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const projects = mysqlTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  status: mysqlEnum("status", [
    "IDEA_SCOUTED", "CASE_BUILT", "IN_BUILD", "QA_REVIEW", "LIVE", "REJECTED"
  ])
    .default("IDEA_SCOUTED")
    .notNull(),
  signalStrength: mysqlEnum("signal_strength", ["Strong", "Medium", "Weak"])
    .default("Medium")
    .notNull(),
  recommendation: mysqlEnum("recommendation", [
    "go",
    "go_with_conditions",
    "no_go",
  ]),
  tam: varchar("tam", { length: 50 }),
  sam: varchar("sam", { length: 50 }),
  som: varchar("som", { length: 50 }),
  painScore: int("pain_score").default(0),
  confidenceScore: int("confidence_score").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

export const builds = mysqlTable("builds", {
  id: serial("id").primaryKey(),
  projectId: bigint("project_id", { mode: "number", unsigned: true }).notNull(),
  stage: mysqlEnum("stage", ["ARCHITECT", "FRONTEND", "BACKEND", "QA"])
    .default("ARCHITECT")
    .notNull(),
  status: mysqlEnum("status", ["pending", "running", "completed", "failed"])
    .default("pending")
    .notNull(),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export type Build = typeof builds.$inferSelect;
export type InsertBuild = typeof builds.$inferInsert;

export const buildSteps = mysqlTable("build_steps", {
  id: serial("id").primaryKey(),
  buildId: bigint("build_id", { mode: "number", unsigned: true }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["pending", "running", "completed", "failed"])
    .default("pending")
    .notNull(),
  logOutput: text("log_output"),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
});

export type BuildStep = typeof buildSteps.$inferSelect;
export type InsertBuildStep = typeof buildSteps.$inferInsert;

export const agentLogs = mysqlTable("agent_logs", {
  id: serial("id").primaryKey(),
  projectId: bigint("project_id", { mode: "number", unsigned: true }).notNull(),
  agentName: varchar("agent_name", { length: 100 }).notNull(),
  message: text("message").notNull(),
  type: mysqlEnum("type", ["info", "success", "warning", "error"])
    .default("info")
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AgentLog = typeof agentLogs.$inferSelect;
export type InsertAgentLog = typeof agentLogs.$inferInsert;
