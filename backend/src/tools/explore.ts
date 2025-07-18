import { z } from "zod";

export const exploreTool = {
    name: "explore",
    description: "Explore the the workflow",
    parameters: z.object({
        url: z.string(),
    }),
}