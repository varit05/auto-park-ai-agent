import { Request, Response, NextFunction } from "express";
import model from "../lib/chat-google";
import { WEATHER_AGENT_PROMPT } from "../prompts";

export const getWeather = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await model.invoke([
      ["system", WEATHER_AGENT_PROMPT.content],
      ["human", "What's the weather in London?"],
    ]);

    return res.status(200).json({
      status: "OK",
      timestamp: new Date().toISOString(),
      data: {
        weather: result.content,
      },
    });
  } catch (error) {
    next(error);
  }
};
