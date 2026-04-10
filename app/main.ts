import { createAgent, tool } from "langchain";
import { HumanMessage } from "@langchain/core/messages";
import * as z from "zod";

const getWeather = tool((input) => `It's always sunny in ${input.city}!`, {
  name: "get_weather",
  description: "Get the weather for a given city",
  schema: z.object({
    city: z.string().describe("The city to get the weather for"),
  }),
});

const agent = createAgent({
  model: "claude-sonnet-4-0",
  tools: [getWeather],
});

async function runAgent() {
  const result = await agent.invoke({
    messages: [new HumanMessage("What's the weather in London?")],
  });

  console.log(result);
}

runAgent().catch(console.error);
