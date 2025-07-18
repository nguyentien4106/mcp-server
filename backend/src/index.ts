import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import cors from "cors";
import { SERVER_CONFIG, CORS_CONFIG } from "./config/server.config.js";
import { testSuiteToolSchema, testSuiteToolHandler } from "./tools/test-suite.tool.js";
import infoRouter from "./routes/info.route.js";
import { TransportService } from "./services/transport.service.js";
import { z } from "zod";

// Initialize MCP Server
const server = new McpServer({
    name: SERVER_CONFIG.name,
    version: SERVER_CONFIG.version,
});

// Register tools
server.tool(
    "generate-test-suite",
    "Generate a test suite for a given scenario",
    testSuiteToolSchema,
    async (args) => {
        return testSuiteToolHandler(args);
    }
);

server.tool(
    "explore",
    "Explore the workflow",
    {
        name: z.string(),
        description: z.string(),
        scenarios: z.array(z.string()),
        url: z.string(),
    },
    async (args) => {
        return {
            content: [{ type: "text" as const, text: "Explore the workflow" }],
        };
    }
);

// Initialize Express app
const app = express();

// Configure CORS
app.use(cors(CORS_CONFIG));

// Initialize transport service
const transportService = new TransportService(server);

// Register routes
app.use("/", infoRouter);
app.get("/sse", (req, res) => transportService.handleSSEConnection(req, res));
app.post("/messages", (req, res) => transportService.handlePostMessage(req, res));

// Start server
app.listen(SERVER_CONFIG.port, () => {
    console.log(`MCP SSE Server running on port ${SERVER_CONFIG.port}`);
});
