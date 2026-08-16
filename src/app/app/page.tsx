"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { UploadZone } from "@/components/upload-zone";
import { ProcessingView } from "@/components/processing-view";
import { DashboardView } from "@/components/dashboard-view";
import { ResumePreview } from "@/components/resume-preview";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Resume } from "@/schemas/resume";

type Step = "upload" | "processing" | "dashboard" | "preview";

export default function AppPage() {
  const [step, setStep] = useState<Step>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [resume, setResume] = useState<Resume | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [requestDone, setRequestDone] = useState(false);

  const runAnalysis = useCallback(async (selected: File) => {
    setFile(selected);
    setError(null);
    setRequestDone(false);
    setStep("processing");

    try {
      const formData = new FormData();
      formData.append("resume", selected);
      const res = await fetch("/api/analyze", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Resume analysis failed.");
      }

      setRequestDone(true);
      setResume(data.resume as Resume);
      setTimeout(() => setStep("dashboard"), 400);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStep("upload");
    }
  }, []);

  function reset() {
    setStep("upload");
    setFile(null);
    setResume(null);
    setError(null);
    setRequestDone(false);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
          <ArrowLeft className="size-4" aria-hidden="true" />
          QA Resume AI
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex-1 px-6">
        {step === "upload" ? (
          <div className="mx-auto max-w-lg py-16">
            <h1 className="text-center text-2xl font-semibold">Analyze My Resume</h1>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Upload your PDF or DOCX resume to get started.
            </p>
            <div className="mt-8">
              <UploadZone onFileSelected={runAnalysis} disabled={step !== "upload"} />
            </div>
            {file ? (
              <p className="mt-4 text-center text-sm text-muted-foreground">Selected: {file.name}</p>
            ) : null}
            {error ? (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="size-4" />
                <AlertTitle>Analysis failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}
          </div>
        ) : null}

        {step === "processing" ? <ProcessingView done={requestDone} /> : null}

        {step === "dashboard" && resume ? (
          <DashboardView resume={resume} onContinue={() => setStep("preview")} />
        ) : null}

        {step === "preview" && resume ? <ResumePreview resume={resume} onStartOver={reset} /> : null}
      </main>

      {step !== "upload" && step !== "processing" ? (
        <footer className="border-t border-border px-6 py-3 text-center text-xs text-muted-foreground">
          {step === "dashboard" ? (
            <Button variant="ghost" size="sm" onClick={reset}>
              Analyze a different resume
            </Button>
          ) : null}
        </footer>
      ) : null}
    </div>
  );
}
