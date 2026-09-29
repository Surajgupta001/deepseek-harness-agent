import type { ToolSet } from "ai";
import { tools } from "./index";

export function createToolSet(): ToolSet {
  return Object.fromEntries(
    tools.map((tool) => [
      tool.name,
      {
        description: tool.description,
        inputSchema: tool.inputSchema,
        execute: tool.execute,
      },
    ]),
  );
}
