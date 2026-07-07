import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import {
  findBuildsByProject,
  findBuildSteps,
  updateBuildStep,
} from "./queries/builds";

export const buildRouter = createRouter({
  getByProject: publicQuery
    .input(z.object({ projectId: z.number() }))
    .query(async ({ input }) => {
      const builds = await findBuildsByProject(input.projectId);
      const steps = await findBuildSteps(builds.map((b) => b.id));
      return { builds, steps };
    }),

  updateStep: publicQuery
    .input(
      z.object({
        stepId: z.number(),
        status: z.enum(["pending", "running", "completed", "failed"]),
        logOutput: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await updateBuildStep(input.stepId, input.status, input.logOutput);
      return { success: true };
    }),
});
