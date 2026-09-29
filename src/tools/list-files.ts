import { readdir } from "node:fs/promises";
import { z } from "zod";
import { resolveWorkspacePath } from "@/permissions/workspace";
import type { AgentTool } from "./types";

const listFilesInput = z.object({
  path: z.string().default("."),
});

export const listFilesTool: AgentTool<typeof listFilesInput> = {
  name: "list_files",

  description: "List files and directories inside a workspace directory.",

  inputSchema: listFilesInput,

  async execute({ path }) {
    try {
      const safePath = resolveWorkspacePath(path);

      const entries = await readdir(safePath, {
        withFileTypes: true,
      });

      return {
        success: true,
        path,
        entries: entries.map((entry) => ({
          name: entry.name,
          type: entry.isDirectory() ? "directory" : "file",
        })),
      };
    } catch (error) {
      return {
        success: false,
        path,
        error: error instanceof Error ? error.message : "Failed to list files",
      };
    }
  },
};
