import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Request, Response } from "express";

export class TransportService {
    private transport!: SSEServerTransport;
    private server: McpServer;

    constructor(server: McpServer) {
        this.server = server;
    }

    async handleSSEConnection(req: Request, res: Response): Promise<void> {
        this.transport = new SSEServerTransport("/messages", res);
        await this.server.connect(this.transport);
    }

    async handlePostMessage(req: Request, res: Response): Promise<void> {
        if (!this.transport) {
            res.status(400).json({ error: "No active SSE connection" });
            return;
        }
        await this.transport.handlePostMessage(req, res);
    }
} 