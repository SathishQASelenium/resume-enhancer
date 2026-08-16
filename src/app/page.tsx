import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Anti-Hallucination Validated",
    description:
      "Every AI-generated line is checked against your original resume. Unsupported claims are rejected, not shipped.",
  },
  {
    icon: Target,
    title: "QA-Specific Gap Detection",
    description:
      "Automation, API, performance, CI/CD and modern AI-testing coverage analyzed against a real QA skill taxonomy.",
  },
  {
    icon: Sparkles,
    title: "RICE-POT Controlled AI",
    description:
      "Role, Instructions, Context, Examples, Parameters, Output and Tone constrain every enhancement the AI makes.",
  },
];

export default function Home() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header className="flex items-center justify-between px-6 py-3">
        <span className="text-sm font-semibold tracking-tight">QA Resume AI</span>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 min-h-0 flex-col items-center justify-center px-6 py-2 text-center">
        <p className="mb-3 inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          Evidence-grounded resume intelligence for QA professionals
        </p>
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Your QA Experience Deserves a Better Resume.
        </h1>
        <p className="mt-3 max-w-xl text-balance text-sm text-muted-foreground sm:text-base">
          Upload your PDF or DOCX resume. QA Resume AI analyzes your testing experience, detects gaps, enhances your
          content and generates a professional HTML resume — without inventing your experience.
        </p>
        <Button render={<Link href="/app" />} nativeButton={false} size="lg" className="mt-5">
          Analyze My Resume <ArrowRight className="size-4" />
        </Button>

        <div className="mt-8 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-4 text-left">
              <div className="flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Icon className="size-4.5" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-sm font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-border px-6 py-2 text-center text-xs text-muted-foreground">
        AI can enhance the candidate&apos;s story, but it cannot create the candidate&apos;s story.
      </footer>
    </div>
  );
}
