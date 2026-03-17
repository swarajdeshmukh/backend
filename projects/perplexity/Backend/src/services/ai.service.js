import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7, // controls randomness (0 = deterministic, 1 = creative)
  maxTokens: 500,
});


export async function  testAi() {
    const response = await model.invoke("What is AI explain under 100 words?")
    console.log(response.text)
}