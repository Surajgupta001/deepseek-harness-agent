import { writeFile } from "node:fs/promises";
import { z } from "zod";
import { resolveWorkspacePath } from "@/permissions/workspace";
import type { AgentTool } from "./types";

const writeFileInput = z.object({
  path: z.string().min(1),
  content: z.string(),
});

export const writeFileTool: AgentTool<typeof writeFileInput> = {
  name: "write_file",

  description:
    "Create or overwrite a file with the provided content inside the workspace.",

  inputSchema: writeFileInput,

  async execute({ path, content }) {
    try {
      const safePath = resolveWorkspacePath(path);

      await writeFile(safePath, content, "utf-8");

      return {
        success: true,
        path,
        message: "File written successfully.",
      };
    } catch (error) {
      return {
        success: false,
        path,
        error: error instanceof Error ? error.message : "Failed to write file",
      };
    }
  },
};
