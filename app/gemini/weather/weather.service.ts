import { Request, Response } from "express";
import { ChatGoogle } from "@langchain/google";

export const getWeather = async (req: Request, res: Response) => {
  try {
    const model = new ChatGoogle("gemini-2.5-flash");

    const res = await model.invoke([
      ["human", "What's the weather in London?"],
    ]);

    console.log(res.content);
    return res.content;
  } catch (error) {
    console.error(error);
  }
};
