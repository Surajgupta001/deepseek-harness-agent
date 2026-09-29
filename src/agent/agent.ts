import { generateText, stepCountIs } from "ai";
import { aiModel } from "@/ai/config";
import { createAgentContext } from "@/context/context";
import { createToolSet } from "@/tools/executor";

export async function runAgent(prompt: string) {
  const context = createAgentContext(prompt);

  const result = await generateText({
    model: aiModel,

    system: `
You are a personal AI coding agent.

Your job is to help the user understand, create, modify,
debug, and improve software projects.

You have access to tools that can interact with the workspace.

Use tools when they are necessary to complete the user's request.

Be precise, practical, and concise.

Current workspace:
${context.workspace}
    `,

    prompt: context.messages
      .map((message) => `${message.role}: ${message.content}`)
      .join("\n"),

    maxOutputTokens: 1024,

    stopWhen: stepCountIs(5),

    tools: createToolSet(),
  });

  return result.text;
}
