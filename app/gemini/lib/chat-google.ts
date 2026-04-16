import { ChatGoogle } from "@langchain/google";
import { getWeatherAgent } from "../weather/weather.service";

/**
 * Configured ChatGoogle Generative AI model instance
 * Exported singleton for consistent usage across the application
 */
export const model = new ChatGoogle({
  model: "gemini-3-flash-preview",
  temperature: 0.7,
  maxOutputTokens: 8192,
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
  tools: [getWeatherAgent],
});

export default model;
