import { MCPClient } from "mcp-use";

const config = {
    mcpServers: {
        playwright: {
            command: 'npx',
            args: ['@playwright/mcp@latest']
        }
    }
}

export const client = MCPClient.fromDict(config);
