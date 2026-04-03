import type { AgentId } from "./agent";

export type WSMessage =
  | {
      type: "spawn";
      sessionId: string;
      agentId: AgentId;
      projectPath: string;
      cols: number;
      rows: number;
    }
  | { type: "input"; sessionId: string; data: string }
  | { type: "resize"; sessionId: string; cols: number; rows: number }
  | { type: "kill"; sessionId: string }
  | { type: "data"; sessionId: string; data: string }
  | { type: "exit"; sessionId: string; code: number }
  | { type: "error"; sessionId: string; message: string };
