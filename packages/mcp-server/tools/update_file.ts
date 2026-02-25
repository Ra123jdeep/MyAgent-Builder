import { promises as fs } from "fs";
import path from "path";

export async function updateFileTool(filePath: string, content: string): Promise<string> {
  const fullPath = path.resolve(process.cwd(), filePath);
  await fs.mkdir(path.dirname(fullPath), { recursive: true });
  await fs.writeFile(fullPath, content, { encoding: "utf8" });
  return fullPath;
}

