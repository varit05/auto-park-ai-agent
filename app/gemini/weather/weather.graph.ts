import {
  StateGraph,
  MessagesAnnotation,
  Annotation,
} from "@langchain/langgraph";
import { model } from "../lib/chat-google";
import { WEATHER_AGENT_PROMPT } from "../prompts";
import { logger } from "../lib/logger";

/**
 * LangGraph Weather Agent Graph Definition
 * With Human-In-The-Loop Message Capabilities
 * This will be visible and testable in LangStudio
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

// Define agent node
const callModel = async (state: typeof WeatherAgentState.State) => {
  logger.info(`Weather agent invoked with messages: ${state.messages.length}`);

  // If human provided a message, add it to the conversation
  const conversationMessages = state.humanMessage
    ? [...state.messages, { role: "user", content: state.humanMessage }]
    : state.messages;

  const messages = [
    { role: "system", content: WEATHER_AGENT_PROMPT.content },
    ...conversationMessages,
  ];

  const response = await model.invoke(messages);
  return { messages: [response], humanMessage: null };
};

// Build the graph with human message support
const workflow = new StateGraph(WeatherAgentState)
  .addNode("agent", callModel)
  .addEdge("__start__", "agent");

// Compile the graph - THIS IS REQUIRED FOR LANGSTUDIO DETECTION
export const weatherAgentGraph = workflow.compile();

// Default export for langgraph.json
export default weatherAgentGraph;
