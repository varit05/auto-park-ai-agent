import { ChatGoogle } from "@langchain/google";

/**
 * Configured ChatGoogle Generative AI model instance
 * Exported singleton for consistent usage across the application
 */
export const model = new ChatGoogle({
  model: "gemini-2.5-flash",
  temperature: 0.7,
  maxOutputTokens: 8192,
});

export default model;
