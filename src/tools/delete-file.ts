import { unlink } from "node:fs/promises";
import { z } from "zod";
import { resolveWorkspacePath } from "@/permissions/workspace";
import type { AgentTool } from "./types";

const deleteFileInput = z.object({
  path: z.string().min(1),
});

export const deleteFileTool: AgentTool<typeof deleteFileInput> = {
  name: "delete_file",

  description: "Delete a file from the current workspace.",

  inputSchema: deleteFileInput,

  async execute({ path }) {
    try {
      const safePath = resolveWorkspacePath(path);

      await unlink(safePath);

      return {
        success: true,
        path,
        message: "File deleted successfully.",
      };
    } catch (error) {
      return {
        success: false,
        path,
        error: error instanceof Error ? error.message : "Failed to delete file",
      };
    }
  },
};
