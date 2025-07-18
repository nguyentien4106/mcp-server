import { Router } from 'express';
import { SERVER_CONFIG } from '../config/server.config.js';

const router = Router();

router.get("/", (req, res) => {
    res.json({
        name: SERVER_CONFIG.name,
        version: SERVER_CONFIG.version,
        status: "running",
        endpoints: {
            "/": "Server information (this response)",
            "/sse": "Server-Sent Events endpoint for MCP connection",
            "/messages": "POST endpoint for MCP messages",
        },
        tools: [
            { name: "generate-test-suite", description: "Generate test suite based on scenarios" },
        ],
    });
});

export default router; 