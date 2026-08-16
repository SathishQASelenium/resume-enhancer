import { AlertTriangle, CheckCircle2, ShieldCheck, ShieldAlert } from "lucide-react";
import { ScoreCard } from "@/components/score-card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Resume } from "@/schemas/resume";

export function DashboardView({ resume, onContinue }: { resume: Resume; onContinue: () => void }) {
  const { analysis, verification } = resume;
  const isPass = verification.validationStatus === "PASS";

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 py-10">
      <div>
        <h2 className="text-xl font-semibold">QA Resume Health</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {resume.personal.name ? `Analysis for ${resume.personal.name}.` : "Analysis complete."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <ScoreCard label="ATS Score" score={analysis.atsScore} />
        <ScoreCard label="QA Coverage" score={analysis.qaCoverageScore} />
        <ScoreCard label="Impact Score" score={analysis.impactScore} />
        <ScoreCard label="Content Quality" score={analysis.contentQualityScore} />
      </div>

      <Alert variant={isPass ? "default" : "destructive"} className={isPass ? "border-primary/40" : undefined}>
        {isPass ? <ShieldCheck className="size-4" /> : <ShieldAlert className="size-4" />}
        <AlertTitle>Anti-Hallucination Check: {isPass ? "PASS" : "CLAIMS REJECTED"}</AlertTitle>
        <AlertDescription>
          {isPass
            ? "Every generated statement was traced back to your original resume."
            : `${verification.unsupportedClaims.length} unsupported claim(s) were detected and automatically rejected — your resume was never allowed to show them.`}
        </AlertDescription>
      </Alert>

      {verification.unsupportedClaims.length > 0 ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <p className="mb-2 text-sm font-medium text-destructive">Rejected claims</p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {verification.unsupportedClaims.map((claim) => (
              <li key={claim} className="flex gap-2">
                <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-destructive" aria-hidden="true" />
                <span>{claim}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-semibold">AI Findings</h3>
          <ul className="space-y-2 text-sm">
            {analysis.strengths.map((s) => (
              <li key={s} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{s}</span>
              </li>
            ))}
            {analysis.gaps.map((g) => (
              <li key={g} className="flex gap-2 text-muted-foreground">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-chart-4" aria-hidden="true" />
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold">Recommendations</h3>
          {analysis.recommendations.length > 0 ? (
            <ul className="space-y-2 text-sm text-muted-foreground">
              {analysis.recommendations.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No further recommendations — strong QA coverage.</p>
          )}

          {verification.unknownInformation.length > 0 ? (
            <div className="mt-4">
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Not available in the provided resume
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {verification.unknownInformation.map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex justify-end">
        <Button size="lg" onClick={onContinue}>
          View Resume Preview
        </Button>
      </div>
    </div>
  );
}
