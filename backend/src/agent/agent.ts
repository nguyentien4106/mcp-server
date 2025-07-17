import { MCPAgent } from "mcp-use";
import { llm } from "./google-llm";
import { client } from "./mcp-client";

export const agent = new MCPAgent({
    llm,
    client,
    maxSteps: 50
});