import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name"),
  avatarUrl: text("avatar_url"),
  role: text("role", { enum: ["admin", "member"] })
    .notNull()
    .default("member"),
  theme: text("theme", { enum: ["dark", "light", "system"] }).default("dark"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export const projects = sqliteTable("projects", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  rootPath: text("root_path").notNull(),
  color: text("color").default("#6366f1"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export const agentSessions = sqliteTable("agent_sessions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  agentId: text("agent_id").notNull(),
  status: text("status", { enum: ["active", "idle", "terminated"] })
    .notNull()
    .default("idle"),
  pid: integer("pid"),
  startedAt: integer("started_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  endedAt: integer("ended_at", { mode: "timestamp" }),
});

export const contextNodes = sqliteTable("context_nodes", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  sessionId: text("session_id").references(() => agentSessions.id, {
    onDelete: "set null",
  }),
  agentId: text("agent_id").notNull(),
  type: text("type", {
    enum: ["decision", "artifact", "insight", "file-change", "error"],
  }).notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  rawOutput: text("raw_output"),
  tags: text("tags", { mode: "json" }).$type<string[]>().default([]),
  importance: integer("importance").default(1),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export const nodeLinks = sqliteTable("node_links", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  sourceNodeId: text("source_node_id")
    .notNull()
    .references(() => contextNodes.id, { onDelete: "cascade" }),
  targetNodeId: text("target_node_id")
    .notNull()
    .references(() => contextNodes.id, { onDelete: "cascade" }),
  relation: text("relation", {
    enum: ["related", "depends-on", "conflicts-with", "extends", "supersedes"],
  })
    .notNull()
    .default("related"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type AgentSession = typeof agentSessions.$inferSelect;
export type ContextNode = typeof contextNodes.$inferSelect;
export type NodeLink = typeof nodeLinks.$inferSelect;
