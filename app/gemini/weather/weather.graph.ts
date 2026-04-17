import {
  StateGraph,
  MessagesAnnotation,
  Annotation,
} from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { model } from "../lib/chat-google";
import { WEATHER_AGENT_PROMPT } from "../prompts";
import { logger } from "../lib/logger";
import { weatherTools } from "./weather.tools";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";

/**
 * LangGraph Weather Agent Graph Definition
 * ReAct Agent with Region-Based Tool Selection
 */

// Extend state for human approval
const WeatherAgentState = Annotation.Root({
  ...MessagesAnnotation.spec,
  humanApproved: Annotation<boolean>({
    default: () => false,
    reducer: (existing, update) => update ?? existing,
  }),
  humanMessage: Annotation<string | null>({
    default: () => null,
    reducer: (existing, update) => update ?? existing,
  }),
});

// Initialize tool node
const toolNode = new ToolNode(weatherTools);

/**
 * Agent node - calls LLM with prompt
 */
const callModel = async (state: typeof WeatherAgentState.State) => {
  logger.info(`Weather agent invoked with messages: ${state.messages.length}`);

  // If human provided a message, add it to the conversation
  const conversationMessages = state.humanMessage
    ? [
        ...state.messages,
        new HumanMessage(state.humanMessage),
      ]
    : state.messages;

  const messages = [
    new SystemMessage(WEATHER_AGENT_PROMPT.content),
    ...conversationMessages,
  ];

  const response = await model.invoke(messages);
  return { messages: [response], humanMessage: null };
};

/**
 * Conditional router - decides if we need to call tools or end
 */
const shouldContinue = (state: typeof WeatherAgentState.State) => {
  const lastMessage = state.messages[state.messages.length - 1] as AIMessage;

  // If the LLM wants to call tools, go to tool node
  if (lastMessage.tool_calls && lastMessage.tool_calls.length > 0) {
    logger.info(`Agent requested tool calls: ${lastMessage.tool_calls.map(tc => tc.name).join(', ')}`);
    return "tools";
  }

  // Otherwise end
  logger.info("Agent finished processing, no more tools to call");
  return "__end__";
};

// Build the graph with ReAct pattern
const workflow = new StateGraph(WeatherAgentState)
  .addNode("agent", callModel)
  .addNode("tools", toolNode)
  .addEdge("__start__", "agent")
  .addConditionalEdges("agent", shouldContinue, {
    tools: "tools",
    __end__: "__end__",
  })
  .addEdge("tools", "agent");

// Compile the graph
export const weatherAgentGraph = workflow.compile();

// Default export for langgraph.json
export default weatherAgentGraph;