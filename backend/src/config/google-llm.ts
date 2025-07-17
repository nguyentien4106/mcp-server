import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const apiKey = `AIzaSyCi-vt98XDk1P9wlzjqC_vho8_UGcThGuM`;
const model = "gemini-2.0-flash";

export const llm = new ChatGoogleGenerativeAI({
    model: model,
    temperature: 0,
    apiKey: apiKey
  });