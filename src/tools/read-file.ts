import { readFile } from "node:fs/promises";
import { z } from "zod";
import { resolveWorkspacePath } from "@/permissions/workspace";
import type { AgentTool } from "./types";

const readFileInput = z.object({
  path: z.string().min(1),
});

export const readFileTool: AgentTool<typeof readFileInput> = {
  name: "read_file",

  description: "Read the contents of a file from the current workspace.",

  inputSchema: readFileInput,

  async execute({ path }) {
    try {
      const safePath = resolveWorkspacePath(path);
      const content = await readFile(safePath, "utf-8");

      return {
        success: true,
        path,
        content,
      };
    } catch (error) {
      return {
        success: false,
        path,
        error: error instanceof Error ? error.message : "Failed to read file",
      };
    }
  },
};
