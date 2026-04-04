"use client";

// Needed for localized content and subtle reveal animation on the graph demo card.

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

const nodeColors: Record<string, string> = {
  decision: "var(--node-decision)",
  artifact: "var(--node-artifact)",
  insight: "var(--node-insight)",
  error: "var(--node-error)",
};

const nodeBorder: Record<string, string> = {
  decision: "#4f7cff",
  artifact: "#34d399",
  insight: "#f4c84c",
  error: "#ff7a7a",
};

function getNodeById(
  id: string,
  nodes: Array<{
    id: string;
    type: string;
    label: string;
    x: number;
    y: number;
  }>,
) {
  return nodes.find((node) => node.id === id);
}

export function GraphDemo() {
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("Landing.GraphDemo");

  const graphNodes = [
    {
      id: "d1",
      type: "decision",
      label: t("nodes.decisionOne"),
      x: 120,
      y: 80,
    },
    {
      id: "a1",
      type: "artifact",
      label: t("nodes.artifactOne"),
      x: 292,
      y: 46,
    },
    { id: "i1", type: "insight", label: t("nodes.insightOne"), x: 204, y: 176 },
    {
      id: "d2",
      type: "decision",
      label: t("nodes.decisionTwo"),
      x: 400,
      y: 132,
    },
    { id: "e1", type: "error", label: t("nodes.errorOne"), x: 62, y: 214 },
    {
      id: "a2",
      type: "artifact",
      label: t("nodes.artifactTwo"),
      x: 318,
      y: 242,
    },
  ];

  const edges = [
    { from: "d1", to: "a1" },
    { from: "d1", to: "i1" },
    { from: "i1", to: "d2" },
    { from: "d2", to: "a2" },
    { from: "e1", to: "i1" },
  ] as const;

  const legendItems = [
    { type: "decision", label: t("legend.decision") },
    { type: "artifact", label: t("legend.artifact") },
    { type: "insight", label: t("legend.insight") },
    { type: "error", label: t("legend.error") },
  ];

  const chips = [t("chip1"), t("chip2"), t("chip3")];

  return (
    <section id="graph-demo" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p
            className="mb-4 text-xs font-medium uppercase tracking-[0.34em]"
            style={{ color: "var(--landing-text-3)" }}
          >
            {t("eyebrow")}
          </p>
          <h2
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"
            style={{ color: "var(--landing-text-1)" }}
          >
            {t("title")}
          </h2>
          <p
            className="mt-4 text-base leading-7"
            style={{ color: "var(--landing-text-2)" }}
          >
            {t("description")}
          </p>
        </div>

        <motion.div
          initial={
            shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 18 }
          }
          whileInView={
            shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }
          }
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[32px] border p-6 sm:p-8"
          aria-label="Knowledge graph"
          style={{
            borderColor: "var(--landing-border)",
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--landing-card-strong) 88%, transparent), color-mix(in srgb, var(--landing-surface) 94%, transparent))",
            boxShadow: "0 36px 100px -62px var(--landing-shadow)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage: `
                linear-gradient(var(--landing-grid) 1px, transparent 1px),
                linear-gradient(90deg, var(--landing-grid) 1px, transparent 1px)
              `,
              backgroundSize: "28px 28px",
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--landing-accent-2), transparent)",
              opacity: 0.7,
            }}
          />

          <div className="relative">
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {chips.map((label) => (
                <span
                  key={label}
                  className="rounded-full border px-3 py-1 text-xs uppercase tracking-[0.22em]"
                  style={{
                    borderColor: "var(--landing-border)",
                    background:
                      "color-mix(in srgb, var(--landing-card) 84%, transparent)",
                    color: "var(--landing-text-3)",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            <svg
              viewBox="0 0 520 320"
              className="w-full"
              style={{ maxHeight: 340 }}
            >
              <title>{t("svgTitle")}</title>
              {edges.map((edge) => {
                const from = getNodeById(edge.from, graphNodes);
                const to = getNodeById(edge.to, graphNodes);

                if (!from || !to) {
                  return null;
                }

                return (
                  <line
                    key={`${edge.from}-${edge.to}`}
                    x1={from.x + 44}
                    y1={from.y + 18}
                    x2={to.x + 44}
                    y2={to.y + 18}
                    stroke="var(--landing-grid-strong)"
                    strokeWidth={1.8}
                  />
                );
              })}

              {graphNodes.map((node) => (
                <g key={node.id}>
                  <rect
                    x={node.x}
                    y={node.y}
                    width={88}
                    height={36}
                    rx={10}
                    fill={nodeColors[node.type] ?? "var(--landing-card)"}
                    stroke={nodeBorder[node.type] ?? "var(--landing-border)"}
                    strokeWidth={1.6}
                  />
                  <text
                    x={node.x + 44}
                    y={node.y + 22}
                    textAnchor="middle"
                    fontSize={9.5}
                    fill="currentColor"
                    style={{ color: "var(--landing-text-1)" }}
                  >
                    {node.label}
                  </text>
                </g>
              ))}
            </svg>

            <div className="mt-5 flex flex-wrap justify-center gap-4">
              {legendItems.map((item) => (
                <div key={item.type} className="flex items-center gap-2">
                  <span
                    className="h-3.5 w-3.5 rounded-sm border"
                    style={{
                      background: nodeColors[item.type],
                      borderColor: nodeBorder[item.type],
                    }}
                  />
                  <span
                    className="text-xs uppercase tracking-[0.22em]"
                    style={{ color: "var(--landing-text-3)" }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
