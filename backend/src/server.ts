import express from "express";
import { config } from "dotenv";
import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";
import cors from "cors";
import { MCPAgent, MCPClient } from 'mcp-use';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { writeFileSync } from "fs";

// Load environment variables
config();

const server = new McpServer({
  name: "mcp-sse-server",
  version: "1.0.0",
});

// Add an addition tool
server.tool("add", { a: z.number(), b: z.number() }, async ({ a, b }) => ({
  content: [{ type: "text", text: String(a + b) }],
}));

server.tool(
  "search",
  { query: z.string(), count: z.number().optional() },
  async ({ query, count = 5 }: { query: string; count?: number }) => {
    console.log("query==========>", query, count, process.env.BRAVE_API_KEY);
    if (!process.env.BRAVE_API_KEY) {
      throw new Error("BRAVE_API_KEY environment variable is not set");
    }

    const response = await fetch(
      `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(
        query
      )}&count=${count}`,
      {
        headers: {
          "X-Subscription-Token": process.env.BRAVE_API_KEY,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Brave search failed: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data.web?.results || [], null, 2),
        },
      ],
    };
  }
);

server.tool("subtract", { a: z.number(), b: z.number() }, async ({ a, b }) => ({
  content: [{ type: "text", text: String(a - b) }],
}));

server.tool("multiply", { a: z.number(), b: z.number() }, async ({ a, b }) => ({
  content: [{ type: "text", text: String(a * b) }],
}));

// Add a dynamic greeting resource
server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  async (uri, { name }) => ({
    contents: [
      {
        uri: uri.href,
        text: `Hello, ${name}!`,
      },
    ],
  })
);

const userName = 'aaWalter'
const password = '1234aa'

server.tool("generate-test-suite", {
  name: z.string(),
  description: z.string(),
  scenario: z.string(),
  url: z.string(),
}, async ({ name, description, scenario, url }) => {

    const config = {
        mcpServers: {
          playwright: {
            command: 'npx',
            args: ['@playwright/mcp@latest']
          }
        }
      };
      const client = MCPClient.fromDict(config);
      
      const llm = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        temperature: 0,
        apiKey: `AIzaSyCi-vt98XDk1P9wlzjqC_vho8_UGcThGuM`
      });
      
      const agent = new MCPAgent({
        llm,
        client,
        maxSteps: 50
      });
      const result = await agent.run(`Generate a test suite for ${scenario} using typescript in this url: ${url}. In login page, the userName is ${userName} and the password is ${password} `);
      console.log('result', result);

      const writeToFile = () => {
        const codeMatch = result.match(/```typescript\s+([\s\S]*?)```/);
        const tsCode = codeMatch ? codeMatch[1].trim() : '';
        
        console.log(tsCode);
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
