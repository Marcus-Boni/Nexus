const graphNodes = [
  { id: "d1", type: "decision", label: "Use Drizzle ORM", x: 120, y: 80 },
  { id: "a1", type: "artifact", label: "schema.ts", x: 280, y: 50 },
  { id: "i1", type: "insight", label: "libSQL faster locally", x: 200, y: 180 },
  { id: "d2", type: "decision", label: "SQLite in dev", x: 380, y: 140 },
  { id: "e1", type: "error", label: "Migration failed", x: 60, y: 200 },
  { id: "a2", type: "artifact", label: "db/index.ts", x: 320, y: 230 },
];

const edges = [
  { from: "d1", to: "a1" },
  { from: "d1", to: "i1" },
  { from: "i1", to: "d2" },
  { from: "d2", to: "a2" },
  { from: "e1", to: "i1" },
];

const nodeColors: Record<string, string> = {
  decision: "var(--node-decision)",
  artifact: "var(--node-artifact)",
  insight: "var(--node-insight)",
  error: "var(--node-error)",
};

const nodeBorder: Record<string, string> = {
  decision: "#3b82f6",
  artifact: "#22c55e",
  insight: "#eab308",
  error: "#ef4444",
};

const legendItems = [
  { type: "decision", label: "Decision" },
  { type: "artifact", label: "Artifact" },
  { type: "insight", label: "Insight" },
  { type: "error", label: "Error" },
];

function getNodeById(id: string) {
  return graphNodes.find((n) => n.id === id);
}

export function GraphDemo() {
  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-4xl text-center">
        <h2
          className="mb-4 text-3xl font-semibold tracking-tight"
          style={{ color: "var(--landing-text-1)" }}
        >
          The knowledge graph
        </h2>
        <p
          className="mx-auto mb-12 max-w-lg text-base"
          style={{ color: "var(--landing-text-2)" }}
        >
          Every decision and artifact from every agent, connected and queryable.
          Context that compounds over time.
        </p>

        {/* Graph card */}
        <div
          className="relative rounded-2xl border p-6"
          style={{
            background: "var(--landing-card)",
            borderColor: "var(--landing-border)",
          }}
        >
          <svg
            viewBox="0 0 460 280"
            className="w-full"
            style={{ maxHeight: 280 }}
          >
            {/* Edges */}
            {edges.map((edge) => {
              const from = getNodeById(edge.from);
              const to = getNodeById(edge.to);
              if (!from || !to) return null;
              return (
                <line
                  key={`${edge.from}-${edge.to}`}
                  x1={from.x + 40}
                  y1={from.y + 14}
                  x2={to.x + 40}
                  y2={to.y + 14}
                  stroke="var(--landing-border-hover)"
                  strokeWidth={1.5}
                />
              );
            })}
            {/* Nodes */}
            {graphNodes.map((node) => (
              <g key={node.id}>
                <rect
                  x={node.x}
                  y={node.y}
                  width={80}
                  height={28}
                  rx={6}
                  fill={nodeColors[node.type] ?? "var(--landing-card)"}
                  stroke={nodeBorder[node.type] ?? "var(--landing-border)"}
                  strokeWidth={1}
                />
                <text
                  x={node.x + 40}
                  y={node.y + 18}
                  textAnchor="middle"
                  fontSize={9}
                  fill="currentColor"
                  style={{ color: "var(--landing-text-1)" }}
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {legendItems.map((item) => (
              <div key={item.type} className="flex items-center gap-1.5">
                <span
                  className="h-3 w-3 rounded-sm border"
                  style={{
                    background: nodeColors[item.type],
                    borderColor: nodeBorder[item.type],
                  }}
                />
                <span
                  className="text-xs"
                  style={{ color: "var(--landing-text-2)" }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
