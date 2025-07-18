import { z } from "zod";

export const genTestSuiteTool = {
    name: "gen-test-suite",
    description: "Generate a test suite for a given scenario",
    parameters: z.object({
        scenario: z.string(),
    }),
}