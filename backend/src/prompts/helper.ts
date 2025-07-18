import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getPrompt = (fileName: string, params: Record<string, string>) => {
    const promptPath = path.join(__dirname, fileName);
    const prompt = fs.readFileSync(promptPath, "utf8");
    return prompt.replace(/<<([^>]+)>>/g, (match, p1) => params[p1] || match).trim();
}
