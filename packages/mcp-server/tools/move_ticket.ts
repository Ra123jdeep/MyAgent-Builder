import { promises as fs } from "fs";
import path from "path";

type TicketMoveRecord = {
  ticketId: string;
  status: string;
  movedAt: string;
};

export async function moveTicketTool(ticketId: string, status: string): Promise<TicketMoveRecord> {
  const logPath = path.resolve(process.cwd(), "ticket-moves.log.jsonl");
  const record: TicketMoveRecord = {
    ticketId,
    status,
    movedAt: new Date().toISOString()
  };
  await fs.appendFile(logPath, JSON.stringify(record) + "\n", { encoding: "utf8" });
  return record;
}

