"use client";

import { useMemo } from "react";
import { Download, FileArchive, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { renderResumeHtml } from "@/lib/render/resume-html";
import type { Resume } from "@/schemas/resume";

const UTF8_BOM = "﻿";

function download(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function ResumePreview({ resume, onStartOver }: { resume: Resume; onStartOver: () => void }) {
  const html = useMemo(() => renderResumeHtml(resume), [resume]);
  const baseName = (resume.personal.name || "resume").trim().replace(/\s+/g, "-").toLowerCase();

  async function handleDownloadHtml() {
    download(new Blob([UTF8_BOM + html], { type: "text/html;charset=utf-8" }), `${baseName}.html`);
  }

  async function handleDownloadZip() {
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    zip.file(`${baseName}.html`, UTF8_BOM + html);
    zip.file(`${baseName}.json`, JSON.stringify(resume, null, 2));
    const blob = await zip.generateAsync({ type: "blob" });
    download(blob, `${baseName}.zip`);
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Your Resume Is Ready</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Preview the generated HTML resume below, then download it.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={onStartOver}>
            <RotateCcw className="size-4" /> Start Over
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadZip}>
            <FileArchive className="size-4" /> Download ZIP
          </Button>
          <Button size="sm" onClick={handleDownloadHtml}>
            <Download className="size-4" /> Download HTML
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
        <iframe srcDoc={html} title="Resume preview" className="h-[75vh] w-full" />
      </div>
    </div>
  );
}
