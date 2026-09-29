export type AgentMessage = {
  role: "user" | "assistant" | "system" | "tool";
  content: string;
};

export type AgentContext = {
  messages: AgentMessage[];
  workspace: string;
};
