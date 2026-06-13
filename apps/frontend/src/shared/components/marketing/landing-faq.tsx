"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Search,
  X,
} from "lucide-react";
import {
  FAQS,
  FAQ_CATEGORIES,
  type FaqCategory,
} from "@/shared/lib/marketing-content";
import { cn } from "@/shared/lib/utils";

export function LandingFaq() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FaqCategory>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((faq) => {
      const matchesCategory =
        category === "all" || faq.category === category;
      const matchesQuery =
        !q ||
        faq.q.toLowerCase().includes(q) ||
        faq.a.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  function expandAll() {
    setOpenIndex(filtered.length > 0 ? -1 : null);
  }

  function collapseAll() {
    setOpenIndex(null);
  }

  const allExpanded = openIndex === -1;

  return (
    <section id="faq" className="mt-28 md:mt-32">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="inline-flex items-center gap-1.5 rounded-full border border-accent-muted/30 bg-accent-subtle/50 px-3 py-1 text-xs font-medium text-accent">
            <HelpCircle className="h-3 w-3" />
            Common questions
          </p>
          <h2 className="mt-4 text-2xl font-medium tracking-tight md:text-[2rem]">
            FAQ
          </h2>
          <p className="mt-2 max-w-lg text-sm text-muted">
            Search or filter — each answer links to a live demo when relevant.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={allExpanded ? collapseAll : expandAll}
            className="focus-ring rounded-lg border border-border/80 bg-card/80 px-3 py-1.5 text-xs font-medium text-muted transition-all hover:border-accent-muted/40 hover:text-accent active:scale-95"
          >
            {allExpanded ? "Collapse all" : "Expand all"}
          </button>
          <Link
            href="#contact"
            className="focus-ring inline-flex items-center gap-1.5 rounded-lg border border-accent-muted/30 bg-accent-subtle/40 px-3 py-1.5 text-xs font-medium text-accent transition-all hover:bg-accent-subtle/70 active:scale-95"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Ask us directly
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(0);
            }}
            placeholder="Search questions…"
            className="focus-ring h-11 w-full rounded-xl border border-border/80 bg-card/65 pl-10 pr-10 text-sm transition-colors placeholder:text-muted/70 hover:border-accent-muted/30 focus:border-accent-muted/50"
          />
          {query ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
              className="focus-ring absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition-colors hover:bg-hover hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setCategory(cat.id);
                setOpenIndex(0);
              }}
              className={cn(
                "focus-ring rounded-full px-3.5 py-1.5 text-xs font-medium transition-all active:scale-95",
                category === cat.id
                  ? "border border-accent-muted/40 bg-accent-subtle/60 text-accent shadow-sm"
                  : "border border-border/80 bg-card/65 text-muted hover:border-accent-muted/30 hover:text-foreground",
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-2.5">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/80 bg-card/40 p-8 text-center">
            <p className="text-sm font-medium">No matches</p>
            <p className="mt-1 text-sm text-muted">
              Try another keyword or{" "}
              <Link href="#contact" className="text-accent hover:underline">
                send us your question
              </Link>
              .
            </p>
          </div>
        ) : (
          filtered.map((faq, index) => {
            const isOpen = openIndex === -1 || openIndex === index;
            return (
              <div
                key={faq.q}
                className={cn(
                  "overflow-hidden rounded-2xl border transition-all duration-300",
                  isOpen
                    ? "border-accent-muted/35 bg-accent-subtle/15 shadow-[0_0_40px_-20px_rgb(var(--accent-strong)/0.25)]"
                    : "border-border/80 bg-card/65 hover:border-accent-muted/25 hover:bg-accent-subtle/10",
                )}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="focus-ring flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-medium tracking-tight"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold transition-colors",
                        isOpen
                          ? "bg-accent/15 text-accent"
                          : "bg-card-secondary text-muted",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted transition-transform duration-300",
                      isOpen && "rotate-180 text-accent",
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-border/50 px-5 pb-5 pt-4 md:pl-[3.75rem]">
                      <p className="max-w-3xl text-sm leading-relaxed text-muted">
                        {faq.a}
                      </p>
                      {faq.related ? (
                        <Link
                          href={faq.related.href}
                          className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent transition-transform hover:translate-x-0.5 hover:underline"
                        >
                          {faq.related.label} →
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
