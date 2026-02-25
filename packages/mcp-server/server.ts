import { z } from "zod";
import {
  Server,
  StdioServerTransport
} from "@modelcontextprotocol/server";
import {
  createFileTool
} from "./tools/create_file.js";
import {
  updateFileTool
} from "./tools/update_file.js";
import {
  generateComponentTool
} from "./tools/generate_component.js";
import {
  moveTicketTool
} from "./tools/move_ticket.js";

async function main() {
  const server = new Server(
    {
      name: "myagent-builder-mcp-server",
      version: "0.1.0"
    },
    {
      capabilities: {
        tools: {}
      }
    }
  );

  server.tool(
    "createFile",
    {
      path: z.string(),
      content: z.string()
    },
    async ({ path, content }) => {
      const fullPath = await createFileTool(path, content);
      return { path: fullPath };
    }
  );

  server.tool(
    "updateFile",
    {
      path: z.string(),
      content: z.string()
    },
    async ({ path, content }) => {
      const fullPath = await updateFileTool(path, content);
      return { path: fullPath };
    }
  );

  server.tool(
    "generateComponent",
    {
      name: z.string()
    },
    async ({ name }) => {
      const code = await generateComponentTool(name);
      return { code };
    }
  );

  server.tool(
    "moveTicket",
    {
      ticketId: z.string(),
      status: z.string()
    },
    async ({ ticketId, status }) => {
      const record = await moveTicketTool(ticketId, status);
      return record;
    }
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(err => {
  console.error("MCP server failed:", err);
  process.exit(1);
});

