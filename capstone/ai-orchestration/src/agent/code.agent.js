import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { createAgent } from "langchain";
import { listFiles, readFiles, updateFiles } from "./tools.js";

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  apiKey: process.env.OPEN_AI_KEY,
});

const agent = createAgent({
  model,
  tools: [listFiles, readFiles, updateFiles],
});

const result = await agent.invoke(
  {
    messages: [
      {
        role: "user",
        content: "make a simple snake game using react just modify files that are necessary to make the game and list the files you modified or created",
      },
    ],
  },
);

console.log(result);
