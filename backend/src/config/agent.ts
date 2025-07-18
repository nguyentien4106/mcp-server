import { MCPAgent } from "mcp-use";
import { llm } from "./google-llm.js";
import { googleSheetsClient, playWrightClient } from "./mcp-client.js";

export const playWrightAgent = new MCPAgent({
    llm,
    client: playWrightClient,
    maxSteps: 50
});

export const googleSheetsAgent = new MCPAgent({
    llm,
    client: googleSheetsClient,
    maxSteps: 50
});