import type { z } from "zod";

export type AgentTool<TInput extends z.ZodTypeAny = z.ZodTypeAny> = {
  name: string;
  description: string;
  inputSchema: TInput;
  execute: (input: z.infer<TInput>) => Promise<unknown>;
};
