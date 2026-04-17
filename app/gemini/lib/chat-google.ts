import { ChatGoogle } from "@langchain/google";
import { weatherTools } from "../weather/weather.tools";

/**
 * Configured ChatGoogle Generative AI model instance
 * Exported singleton for consistent usage across the application
 */
const baseModel = new ChatGoogle({
  model: "gemini-3-flash-preview",
  temperature: 0.7,
  maxOutputTokens: 8192,
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});

// Bind weather tools to the model
export const model = baseModel.bindTools(weatherTools);

export default model;
