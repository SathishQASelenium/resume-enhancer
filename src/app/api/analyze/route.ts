import { NextResponse } from "next/server";
import { extractDocument, UnsupportedFileError } from "@/lib/parser/extract";
import { extractFacts } from "@/lib/ai/extract-facts";
import { enhanceContent } from "@/lib/ai/enhance";
import { AIConfigError, AIResponseError } from "@/lib/ai/errors";
import { validateAndSanitize } from "@/lib/validation/validate";
import { analyzeQAProfile } from "@/lib/qa-analysis";
import { scoreATS, scoreImpact, scoreContentQuality } from "@/lib/scoring";
import { ResumeSchema, type Resume, type EnhancedContent } from "@/schemas/resume";

export const maxDuration = 120;

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart/form-data with a 'resume' file field." }, { status: 400 });
  }

  const file = formData.get("resume");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No resume file was provided." }, { status: 400 });
  }

  try {
    // Step 1: Document extraction -> raw text (the sole source of truth).
    const { text: sourceText } = await extractDocument(file);
    if (sourceText.trim().length < 30) {
      return NextResponse.json(
        { error: "Could not extract readable text from this file. Please upload a text-based PDF or DOCX." },
        { status: 422 },
      );
    }

    // --- AI Pipeline Stage 1: Fact Extraction ---
    // Resume Text -> Groq -> Structured JSON -> Schema Validation.
    // A failure here is fatal: without verified facts nothing downstream is safe.
    const facts = await extractFacts(sourceText);

    // --- AI Pipeline Stage 2: QA Profile Analysis ---
    // Deterministic taxonomy matching against the source text (blueprint §24: the
    // taxonomy is analysis-only and is never used to add skills to the resume).
    const qaAnalysis = analyzeQAProfile(sourceText);

    // --- AI Pipeline Stage 3: RICE-POT Resume Enhancement ---
    // A failure here is non-fatal: fall back to the verified facts verbatim so
    // the pipeline still completes and produces a safe (if unenhanced) resume.
    let enhanced: EnhancedContent;
    try {
      enhanced = await enhanceContent(facts);
    } catch (enhanceError) {
      console.error("RICE-POT enhancement failed, falling back to verified facts verbatim:", enhanceError);
      enhanced = {
        summary: facts.summary,
        experience: facts.experience.map((e) => ({
          responsibilities: e.responsibilities,
          achievements: e.achievements,
        })),
        generatedClaims: [],
      };
    }

    // --- AI Pipeline Stage 4: Anti-Hallucination Validation ---
    // Every generated claim is checked against the source text; unsupported
    // claims are rejected and replaced with the original verified wording.
    const sanitized = validateAndSanitize(facts, enhanced, sourceText);

    // --- Deterministic scoring ---
    const atsScore = scoreATS({
      personal: facts.personal,
      summary: sanitized.summary,
      experience: sanitized.experience,
      skills: facts.skills,
      qaCoverageScore: qaAnalysis.qaCoverageScore,
      sourceText,
    });
    const impactScore = scoreImpact(sanitized.experience);
    const contentQualityScore = scoreContentQuality({ summary: sanitized.summary, experience: sanitized.experience });

    // --- Deterministic HTML rendering happens client-side from this JSON (see
    // src/lib/render/resume-html.ts) — the LLM never generates HTML directly. ---
    const resume: Resume = ResumeSchema.parse({
      personal: facts.personal,
      summary: sanitized.summary,
      skills: facts.skills,
      experience: sanitized.experience,
      projects: facts.projects,
      certifications: facts.certifications,
      education: facts.education,
      awards: facts.awards,
      analysis: {
        atsScore,
        qaCoverageScore: qaAnalysis.qaCoverageScore,
        impactScore,
        contentQualityScore,
        strengths: qaAnalysis.strengths,
        gaps: qaAnalysis.gaps,
        recommendations: qaAnalysis.recommendations,
      },
      verification: sanitized.verification,
    });

    return NextResponse.json({ resume, fileName: file.name });
  } catch (error) {
    if (error instanceof UnsupportedFileError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof AIConfigError) {
      console.error("AI configuration error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 503 });
    }
    if (error instanceof AIResponseError) {
      console.error("AI response error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 502 });
    }
    console.error("Resume analysis failed:", error);
    return NextResponse.json(
      { error: "Resume analysis failed. Please try again or use a different file." },
      { status: 500 },
    );
  }
}
