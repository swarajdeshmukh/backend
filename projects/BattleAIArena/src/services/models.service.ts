import config from "../config/config.js";
import { ChatOpenAI } from "@langchain/openai";
import { MistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";

export const openAIModel = new ChatOpenAI({
  model: "gpt-4o-mini",
  apiKey: config.OPENAI_API_KEY,
  temperature: 0.7,
  maxTokens: 500,
});

export const MistralAIModel = new MistralAI({
  model: "mistral-medium-latest",
  apiKey: config.MISTRAL_API_KEY,
  temperature: 0.7,
  maxTokens: 500,
});

export const cohereAIModel = new ChatCohere({
  model: "command-a-03-2025",
  apiKey: config.COHERE_API_KEY,
});
