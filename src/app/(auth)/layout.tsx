"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

const quotes = [
  { text: '"Where your agents think together."', author: "Nexus tagline" },
  { text: '"Context is the new code."', author: "Team Nexus" },
  { text: '"One platform. Every agent."', author: "Nexus" },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const quote = quotes[quoteIndex];

  return (
    <div className="flex min-h-screen">
      {/* Left panel — branding */}
      <div
        className="hidden flex-col justify-between p-12 lg:flex lg:w-1/2"
        style={{
          background: "var(--landing-bg-2)",
          borderRight: "1px solid var(--landing-border)",
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-xl"
        >
          ⬡ Nexus
        </Link>

        <div className="max-w-sm">
          <AnimatePresence mode="wait">
            {quote && (
              <motion.blockquote
                key={quoteIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <p
                  className="mb-3 text-2xl font-medium leading-snug"
                  style={{ color: "var(--landing-text-1)" }}
                >
                  {quote.text}
                </p>
                <footer
                  className="text-sm"
                  style={{ color: "var(--landing-text-3)" }}
                >
                  — {quote.author}
                </footer>
              </motion.blockquote>
            )}
          </AnimatePresence>
        </div>

        <p className="text-xs" style={{ color: "var(--landing-text-3)" }}>
          © 2026 Nexus
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 items-center justify-center p-6">
        {children}
      </div>
    </div>
  );
}
