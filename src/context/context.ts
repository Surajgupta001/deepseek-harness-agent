import type { AgentContext, AgentMessage } from "./types";

export function createAgentContext(
  prompt: string,
  workspace: string = process.cwd(),
): AgentContext {
  const message: AgentMessage = {
    role: "user",
    content: prompt,
  };

  return {
    messages: [message],
    workspace,
  };
}
