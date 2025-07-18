import { MCPClient } from "mcp-use";

export const playWrightClient = MCPClient.fromDict({
    mcpServers: {
        playwright: {
            command: 'npx',
            args: ['@playwright/mcp@latest']
        }
    }
});

export const googleSheetsClient = MCPClient.fromDict({
    mcpServers: {
        googleSheets: {
            command: 'npx',
            args: ['@google/sheets-mcp@latest']
        }
    }
})