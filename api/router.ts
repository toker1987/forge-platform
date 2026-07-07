import { authRouter } from "./auth-router";
import { projectRouter } from "./project-router";
import { buildRouter } from "./build-router";
import { agentLogRouter } from "./agent-log-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  project: projectRouter,
  build: buildRouter,
  agentLog: agentLogRouter,
});

export type AppRouter = typeof appRouter;
