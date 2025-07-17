import express from "express";
import { config } from "dotenv";
import {
  McpServer,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";
import cors from "cors";
import { writeFileSync } from "fs";
import { agent } from "./agent/agent";

// Load environment variables
config();

const server = new McpServer({
  name: "mcp-sse-server",
  version: "1.0.0",
});

const userName = 'aaWalter'
const password = '1234aa'

server.tool("generate-test-suite", {
  name: z.string(),
  description: z.string(),
  scenario: z.string(),
  url: z.string(),
}, async ({ name, description, scenario, url }) => {

    const result = await agent.run(`Generate a test suite for ${scenario} using typescript in this url: ${url}. In login page, the userName is ${userName} and the password is ${password} `);
    const writeToFile = () => {
        const codeMatch = result.match(/```typescript\s+([\s\S]*?)```/);
        const tsCode = codeMatch ? codeMatch[1].trim() : '';
            
        writeFileSync('test-suite.ts', tsCode);
    }
    
    writeToFile();
    return {
        content: [{ type: "text", text: result }],
    };

});

const app = express();

// Configure CORS middleware to allow all origins
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: false,
  })
);

// Add a simple root route handler
app.get("/", (req, res) => {
  res.json({
    name: "MCP SSE Server",
    version: "1.0.0",
    status: "running",
    endpoints: {
      "/": "Server information (this response)",
      "/sse": "Server-Sent Events endpoint for MCP connection",
      "/messages": "POST endpoint for MCP messages",
    },
    tools: [
      { name: "add", description: "Add two numbers together" },
      { name: "search", description: "Search the web using Brave Search API" },
    ],
  });
});

let transport: SSEServerTransport;

app.get("/sse", async (req, res) => {
  transport = new SSEServerTransport("/messages", res);
  await server.connect(transport);
});

app.post("/messages", async (req, res) => {
  // Note: to support multiple simultaneous connections, these messages will
  // need to be routed to a specific matching transport. (This logic isn't
  // implemented here, for simplicity.)
  await transport.handlePostMessage(req, res);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`MCP SSE Server running on port ${PORT}`);
});
