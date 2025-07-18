import { z } from "zod";
import { writeFileSync } from "fs";
import { playWrightAgent } from "../config/agent.js";
import { getPrompt } from "../prompts/helper.js";

export const testSuiteToolSchema = {
    name: z.string(),
    description: z.string(),
    scenarios: z.array(z.string()),
    url: z.string(),
};

export const testSuiteToolHandler = async (args: {
    name: string;
    description: string;
    scenarios: string[];
    url: string;
}) => {
    const { name, description, scenarios, url } = args;
    const userName = process.env.USER_NAME || '';
    const password = process.env.PASSWORD || '';

    const result = await playWrightAgent.run(getPrompt("test-suite.prompt", {
        scenario: scenarios[0] || '',
        url,
        userName,
        password,
    }));
    
    const writeToFile = () => {
        const codeMatch = result.match(/```typescript\s+([\s\S]*?)```/);
        const tsCode = codeMatch ? codeMatch[1].trim() : '';
        writeFileSync(`${name}.ts`, tsCode);
    }
    
    writeToFile();
    return {
        content: [{ type: "text" as const, text: result }],
    };
}; 