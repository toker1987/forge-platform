import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { findLogsByProject, createAgentLog } from "./queries/agent-logs";

export const agentLogRouter = createRouter({
  list: publicQuery
    .input(z.object({ projectId: z.number() }))
    .query(async ({ input }) => {
      const logs = await findLogsByProject(input.projectId);
      return { logs };
    }),

  create: publicQuery
    .input(
      z.object({
        projectId: z.number(),
        agentName: z.string(),
        message: z.string(),
        type: z.enum(["info", "success", "warning", "error"]),
      })
    )
    .mutation(async ({ input }) => {
      await createAgentLog(input);
      return { success: true };
    }),
});
