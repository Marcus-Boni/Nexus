import { FolderPlus } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { isValidLocale } from "@/i18n/messages";
import { auth } from "@/lib/auth";

const placeholderValues = ["0", "0", "0"] as const;

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const session = await auth();
  const t = await getTranslations("App.Dashboard");
  const name = session?.user?.name ?? session?.user?.email ?? t("fallbackName");

  const placeholderStats = [
    { label: t("stats.projects"), value: placeholderValues[0] },
    { label: t("stats.sessions"), value: placeholderValues[1] },
    { label: t("stats.nodes"), value: placeholderValues[2] },
  ];

  const roadmapItems = [
    t("roadmap.item1"),
    t("roadmap.item2"),
    t("roadmap.item3"),
    t("roadmap.item4"),
  ];

  return (
    <div className="max-w-4xl">
      <h1
        className="mb-2 text-2xl font-semibold"
        style={{ color: "var(--landing-text-1)" }}
      >
        {t("title", { name })}
      </h1>
      <p className="mb-8 text-sm" style={{ color: "var(--landing-text-2)" }}>
        {t("subtitle")}
      </p>

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
          {t("cta.title")}
        </h2>
        <p className="mb-4 text-sm" style={{ color: "var(--landing-text-2)" }}>
          {t("cta.description")}
        </p>
        <Button disabled>
          <FolderPlus className="mr-2 h-4 w-4" />
          {t("cta.button")}
        </Button>
      </div>

      <div
        className="mt-6 rounded-xl border p-6"
        style={{ borderColor: "var(--landing-border)" }}
      >
        <h2
          className="mb-4 font-semibold"
          style={{ color: "var(--landing-text-1)" }}
        >
          {t("roadmap.title")}
        </h2>
        <ul
          className="flex flex-col gap-2 text-sm"
          style={{ color: "var(--landing-text-2)" }}
        >
          {roadmapItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
