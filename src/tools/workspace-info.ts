import path from "node:path";
import { z } from "zod";
import type { AgentTool } from "./types";

const workspaceInfoInput = z.object({});

export const workspaceInfoTool: AgentTool<typeof workspaceInfoInput> = {
  name: "workspace_info",

  description:
    "Get information about the current workspace, including its absolute path.",

  inputSchema: workspaceInfoInput,

  async execute() {
    const workspace = process.cwd();

    return {
      success: true,
      workspace,
      name: path.basename(workspace),
    };
  },
};
