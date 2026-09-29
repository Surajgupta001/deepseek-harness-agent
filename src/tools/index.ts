import { deleteFileTool } from "./delete-file";
import { listFilesTool } from "./list-files";
import { readFileTool } from "./read-file";
import { runCommandTool } from "./run-command";
import type { AgentTool } from "./types";
import { workspaceInfoTool } from "./workspace-info";
import { writeFileTool } from "./write-file";

export const tools: AgentTool[] = [
  readFileTool,
  listFilesTool,
  writeFileTool,
  deleteFileTool,
  runCommandTool,
  workspaceInfoTool,
];

export const toolMap = Object.fromEntries(
  tools.map((tool) => [tool.name, tool]),
);
