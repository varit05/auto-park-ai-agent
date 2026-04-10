import { ChatGoogle } from "@langchain/google";

async function main() {
  const model = new ChatGoogle("gemini-2.5-flash");

  const res = await model.invoke([["human", "What's the weather in London?"]]);

  console.log(res.content);
}

main().catch(console.error);
