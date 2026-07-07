import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import {
  findProjects,
  findProjectById,
  createProject,
  updateProjectStatus,
  deleteProject,
} from "./queries/projects";
import { createBuild, createBuildStep } from "./queries/builds";
import { createAgentLog } from "./queries/agent-logs";

export const projectRouter = createRouter({
  list: publicQuery
    .input(
      z.object({
        status: z
          .enum([
            "IDEA_SCOUTED",
            "CASE_BUILT",
            "IN_BUILD",
            "QA_REVIEW",
            "LIVE",
            "REJECTED",
          ])
          .optional(),
      }).optional()
    )
    .query(async ({ input }) => {
      const projects = await findProjects(input?.status);
      return { projects };
    }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const project = await findProjectById(input.id);
      return project ?? null;
    }),

  create: publicQuery
    .input(
      z.object({
        name: z.string().min(1, "Project name is required"),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const project = await createProject({
        name: input.name,
        description: input.description ?? null,
      });

      await createAgentLog({
        projectId: project.id,
        agentName: "TrendScout",
        message: `Started trend analysis for "${input.name}"...`,
        type: "info",
      });

      await createAgentLog({
        projectId: project.id,
        agentName: "BusinessAnalyst",
        message: `Evaluating market opportunity for "${input.name}"...`,
        type: "info",
      });

      return project;
    }),

  updateStatus: publicQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum([
          "IDEA_SCOUTED",
          "CASE_BUILT",
          "IN_BUILD",
          "QA_REVIEW",
          "LIVE",
          "REJECTED",
        ]),
      })
    )
    .mutation(async ({ input }) => {
      await updateProjectStatus(input.id, input.status);
      return { success: true };
    }),

  approveCase: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await updateProjectStatus(input.id, "IN_BUILD");

      const build = await createBuild(input.id);

      const steps = [
        "Define system architecture",
        "Design database schema",
        "Set up CI/CD pipeline",
      ];
      for (const name of steps) {
        await createBuildStep(build.id, name);
      }

      await createAgentLog({
        projectId: input.id,
        agentName: "PMOrchestrator",
        message: "Project approved. Initiating build pipeline...",
        type: "success",
      });

      return { success: true, buildId: build.id };
    }),

  rejectCase: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await updateProjectStatus(input.id, "REJECTED");

      await createAgentLog({
        projectId: input.id,
        agentName: "BusinessAnalyst",
        message: "Project rejected based on case review.",
        type: "error",
      });

      return { success: true };
    }),
});
