import { Request, Response, NextFunction } from "express";
import { weatherAgentGraph } from "./weather.graph";
import { logger } from "../lib/logger";

interface WeatherData {
  highTemperature: string | null;
  lowTemperature: string | null;
  averageTemperature: string | null;
  humidity: number | null;
  rawResponse?: string;
}

/**
 * Run LangGraph Weather Agent with human messaging support
 */
export const getWeatherAgent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { message, humanMessage, messages = [] } = req.body;

    // Validate input
    if ((!message || typeof message !== "string") && !Array.isArray(messages)) {
      return res.status(400).json({
        status: "ERROR",
        timestamp: new Date().toISOString(),
        message: "Either 'message' string or 'messages' array is required in request body",
      });
    }

    // Build graph input state
    const inputState: any = {};

    if (Array.isArray(messages) && messages.length > 0) {
      inputState.messages = messages;
    } else if (message) {
      inputState.messages = [{ role: "user", content: message }];
    }

    // Add human message if provided (human-in-the-loop)
    if (humanMessage && typeof humanMessage === "string" && humanMessage.trim().length > 0) {
      inputState.humanMessage = humanMessage;
      logger.info(`Human message provided: ${humanMessage.substring(0, 100)}...`);
    }

    logger.info(`Invoking LangGraph Weather Agent with ${inputState.messages?.length || 0} messages`);

    // Execute the LangGraph agent
    const result = await weatherAgentGraph.invoke(inputState);

    // Extract last agent response
    const lastMessage = result.messages[result.messages.length - 1];

    logger.info(`LangGraph agent completed successfully, returned ${result.messages.length} total messages`);

    return res.status(200).json({
      status: "OK",
      timestamp: new Date().toISOString(),
      data: {
        response: lastMessage.content,
        messages: result.messages,
        humanApproved: result.humanApproved,
      },
    });
  } catch (error) {
    next(error);
  }
};
