import { MCPAgent } from "mcp-use";
import { llm } from "./google-llm.js";
import { client } from "./mcp-client.js";

export const agent = new MCPAgent({
    llm,
    client,
    maxSteps: 50
});