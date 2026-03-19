import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";


const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7, // controls randomness (0 = deterministic, 1 = creative)
  maxTokens: 500,
});

export async function testAi() {
  const response = await model.invoke("What is AI explain under 100 words?");
  console.log(response.text);
}

export async function genrateResponse(messages) {
  const response = await model.invoke(messages.map(msg => {
    if (msg.role == "user") {
      return new HumanMessage(msg.content)
    } else if(msg.role == "ai") {
      return new AIMessage(msg.content);
    }
  }));
  return response.text;
}

export async function genrateChatTitle(message) {

  const response = await model.invoke([
      new SystemMessage(`You are a helpful assistant that generates concise and descriptive titles for chat conversations.
    
    User will provide you with the first message of chat conversation, and you will generate a title that captures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging, giving user a quick understanding of the chat's topic.

    `),
  new HumanMessage(`Generate a title for a chat conversation based on the following first message: 
    "${message}"
    `)
  ])

  return response.text;
}
