import { QA_TAXONOMY } from "./qa-taxonomy";

export type QAFinding = {
  category: string;
  status: "strong" | "weak" | "missing";
  text: string;
};

export type QAAnalysisResult = {
  qaCoverageScore: number;
  strengths: string[];
  gaps: string[];
  recommendations: string[];
  findings: QAFinding[];
};

function countMentions(sourceText: string, skill: string): number {
  const pattern = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
  return (sourceText.match(pattern) ?? []).length;
}

/**
 * QA-specific gap detection (blueprint §24–25).
 * The taxonomy is ANALYSIS ONLY — nothing here ever gets written back into
 * the candidate's resume. A missing skill stays missing.
 */
export function analyzeQAProfile(sourceText: string): QAAnalysisResult {
  const findings: QAFinding[] = [];

  for (const category of QA_TAXONOMY) {
    const matched = category.skills.filter((s) => countMentions(sourceText, s) > 0);
    const strong = category.skills.filter((s) => countMentions(sourceText, s) >= 2);

    if (strong.length > 0) {
      findings.push({
        category: category.label,
        status: "strong",
        text: `${strong.join(", ")} — ${category.label} is strongly represented.`,
      });
    } else if (matched.length > 0) {
      findings.push({
        category: category.label,
        status: "weak",
        text: `${category.label} (${matched.join(", ")}) is mentioned but lacks supporting detail.`,
      });
    } else {
      findings.push({
        category: category.label,
        status: "missing",
        text: `${category.label} experience was not identified in the provided resume.`,
      });
    }
  }

  const strengths = findings.filter((f) => f.status === "strong").map((f) => f.text);
  const gaps = findings.filter((f) => f.status !== "strong").map((f) => f.text);

  const recommendations: string[] = [];
  const weak = findings.filter((f) => f.status === "weak");
  const missing = findings.filter((f) => f.status === "missing");

  if (weak.length > 0) {
    recommendations.push(
      `Add concrete, factual detail (tools used, scale, outcomes already documented) to strengthen: ${weak
        .map((f) => f.category)
        .join(", ")}.`,
    );
  }
  if (missing.length > 0) {
    recommendations.push(
      `If you have real experience in ${missing.map((f) => f.category).join(", ")}, add it to your resume yourself — QA Resume AI will not add it for you.`,
    );
  }
  if (findings.some((f) => f.category === "Modern QA" && f.status === "missing")) {
    recommendations.push(
      "AI/LLM testing experience is increasingly valued in QA roles — consider documenting any exposure you have to it.",
    );
  }

  const total = findings.length;
  const score = Math.round(
    (findings.reduce((sum, f) => sum + (f.status === "strong" ? 1 : f.status === "weak" ? 0.5 : 0), 0) / total) *
      100,
  );

  return { qaCoverageScore: score, strengths, gaps, recommendations, findings };
}
