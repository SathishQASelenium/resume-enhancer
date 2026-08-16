"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  "Extracting content",
  "Identifying QA skills",
  "Detecting gaps",
  "Applying RICE-POT",
  "Validating AI output",
  "Calculating scores",
  "Preparing resume",
];

export function ProcessingView({ done }: { done: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (done) return;
    const interval = setInterval(() => {
      setActiveIndex((i) => (i < STEPS.length - 1 ? i + 1 : i));
    }, 1100);
    return () => clearInterval(interval);
  }, [done]);

  const displayIndex = done ? STEPS.length : activeIndex;

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-8 py-16 text-center">
      <div>
        <h2 className="text-xl font-semibold">Analyzing your resume…</h2>
        <p className="mt-1 text-sm text-muted-foreground">This usually takes under a minute.</p>
      </div>
      <ul className="w-full space-y-3 text-left">
        {STEPS.map((step, i) => {
          const isDone = i < displayIndex;
          const isActive = i === displayIndex;
          return (
            <li
              key={step}
              className={cn(
                "flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5 text-sm transition-colors",
                isDone && "text-foreground",
                isActive && "border-primary/50 bg-accent/40",
                !isDone && !isActive && "text-muted-foreground",
              )}
            >
              {isDone ? (
                <CheckCircle2 className="size-4 shrink-0 text-primary" aria-hidden="true" />
              ) : isActive ? (
                <LoaderCircle className="size-4 shrink-0 animate-spin text-primary" aria-hidden="true" />
              ) : (
                <span className="size-4 shrink-0 rounded-full border border-border" aria-hidden="true" />
              )}
              {step}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
