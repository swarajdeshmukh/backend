import { config } from "dotenv";
config();

type CONFIG = {
  // readonly MISTRAL_API_KEY: string;
  readonly OPENAI_API_KEY: string;
  readonly COHERE_API_KEY: string;
  readonly GIMINI_API_KEY: string;
};


const App_Config: CONFIG = {
  // MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  COHERE_API_KEY: process.env.COHERE_API_KEY || "",
  GIMINI_API_KEY: process.env.GIMINI_API_KEY || "",
};


export default App_Config;