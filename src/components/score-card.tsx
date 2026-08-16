import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

function scoreTone(score: number): string {
  if (score >= 80) return "text-primary";
  if (score >= 60) return "text-foreground";
  return "text-destructive";
}

export function ScoreCard({ label, score }: { label: string; score: number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={cn("mt-1 text-3xl font-semibold tabular-nums", scoreTone(score))}>
        {score}
        <span className="text-base font-normal text-muted-foreground"> / 100</span>
      </p>
      <Progress value={score} className="mt-3" />
    </div>
  );
}
