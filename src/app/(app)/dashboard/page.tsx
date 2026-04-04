import { FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

const placeholderStats = [
  { label: "Your Projects", value: "0" },
  { label: "Active Sessions", value: "0" },
  { label: "Context Nodes", value: "0" },
];

export default async function DashboardPage() {
  const session = await auth();
  const name = session?.user?.name ?? session?.user?.email ?? "there";

  return (
    <div className="max-w-4xl">
      <h1
        className="mb-2 text-2xl font-semibold"
        style={{ color: "var(--landing-text-1)" }}
      >
        Welcome back, {name}
      </h1>
      <p className="mb-8 text-sm" style={{ color: "var(--landing-text-2)" }}>
        Here&apos;s your Nexus overview
      </p>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {placeholderStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border p-5"
            style={{
              background: "var(--landing-card)",
              borderColor: "var(--landing-border)",
            }}
          >
            <p
              className="text-2xl font-semibold"
              style={{ color: "var(--landing-text-1)" }}
            >
              {stat.value}
            </p>
            <p
              className="mt-1 text-sm"
              style={{ color: "var(--landing-text-2)" }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        className="rounded-xl border p-6"
        style={{
          background: "var(--landing-card)",
          borderColor: "var(--landing-border)",
        }}
      >
        <h2
          className="mb-2 font-semibold"
          style={{ color: "var(--landing-text-1)" }}
        >
          Create your first project
        </h2>
        <p className="mb-4 text-sm" style={{ color: "var(--landing-text-2)" }}>
          Projects group your agent sessions and knowledge graph. Start here.
        </p>
        <Button disabled>
          <FolderPlus className="mr-2 h-4 w-4" />
          New project — coming in Phase 1
        </Button>
      </div>

      {/* Phase roadmap */}
      <div
        className="mt-6 rounded-xl border p-6"
        style={{ borderColor: "var(--landing-border)" }}
      >
        <h2
          className="mb-4 font-semibold"
          style={{ color: "var(--landing-text-1)" }}
        >
          What&apos;s coming
        </h2>
        <ul
          className="flex flex-col gap-2 text-sm"
          style={{ color: "var(--landing-text-2)" }}
        >
          <li>Phase 1 — PTY terminal sessions via WebSocket server</li>
          <li>Phase 2 — Knowledge graph builder and context extraction</li>
          <li>Phase 3 — Automatic context injection with Anthropic API</li>
          <li>Phase 4 — Multi-agent orchestration and conflict resolution</li>
        </ul>
      </div>
    </div>
  );
}
