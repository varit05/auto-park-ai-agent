import { Request, Response, NextFunction } from "express";
import model from "../lib/chat-google";

export const getWeather = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await model.invoke([
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
