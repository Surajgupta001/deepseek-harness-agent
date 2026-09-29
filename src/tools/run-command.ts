import { exec } from "node:child_process";
import { promisify } from "node:util";
import { z } from "zod";
import { resolveWorkspacePath } from "@/permissions/workspace";
import type { AgentTool } from "./types";

const execAsync = promisify(exec);

const runCommandInput = z.object({
  command: z.string().min(1),
});

export const runCommandTool: AgentTool<typeof runCommandInput> = {
  name: "run_command",

  description: "Run a shell command inside the current workspace.",

  inputSchema: runCommandInput,

  async execute({ command }) {
    try {
      const cwd = resolveWorkspacePath(".");

      const { stdout, stderr } = await execAsync(command, {
        cwd,
      });

      return {
        success: true,
        command,
        stdout,
        stderr,
      };
    } catch (error) {
      return {
        success: false,
        command,
        error:
          error instanceof Error ? error.message : "Failed to execute command",
      };
    }
  },
};
