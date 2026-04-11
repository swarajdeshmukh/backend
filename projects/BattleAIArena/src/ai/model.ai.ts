import { ChatOpenAI } from "@langchain/openai";
import { ChatCohere } from "@langchain/cohere";
import { ChatGoogle } from "@langchain/google";

import App_Config from "../config/config.js";

export const geminiModel = new ChatGoogle({
  model: "gemini-2.5-flash",
  apiKey: App_Config.GIMINI_API_KEY
});

export const openAiModel = new ChatOpenAI({
    model: "gpt-4o-mini",
    apiKey: App_Config.OPENAI_API_KEY,
    temperature: 0.7,
    maxTokens: 500,
})

export const cohereModel = new ChatCohere({
  model: "command-a-03-2025",
  apiKey: App_Config.COHERE_API_KEY,
});