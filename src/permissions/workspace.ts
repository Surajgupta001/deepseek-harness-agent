import path from "node:path";

const workspaceRoot = process.cwd();

export function resolveWorkspacePath(targetPath: string) {
  const resolvedPath = path.resolve(workspaceRoot, targetPath);

  const relativePath = path.relative(workspaceRoot, resolvedPath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    throw new Error("Access denied: path is outside the workspace.");
  }

  return resolvedPath;
}
