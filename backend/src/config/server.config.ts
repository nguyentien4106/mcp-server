import { config } from "dotenv";

// Load environment variables
config();

export const SERVER_CONFIG = {
    name: "mcp-sse-server",
    version: "1.0.0",
    port: process.env.PORT || 3001,
};

export const CORS_CONFIG = {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: false,
}; 