import type { Experience, Personal, Skills } from "@/schemas/resume";

const ACTION_VERBS = [
  "achieved", "automated", "built", "created", "delivered", "designed", "developed",
  "executed", "identified", "implemented", "improved", "increased", "led", "managed",
  "optimized", "performed", "reduced", "resolved", "streamlined", "tested", "validated",
  "verified", "wrote", "analyzed", "collaborated", "coordinated", "maintained",
];

function clamp(n: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, Math.round(n)));
}

/** ATS Score (blueprint §26) — out of 100 across 8 weighted categories. */
export function scoreATS(params: {
  personal: Personal;
  summary: string;
  experience: Experience[];
  skills: Skills;
  qaCoverageScore: number;
  sourceText: string;
}): number {
  const { personal, summary, experience, skills, qaCoverageScore, sourceText } = params;

  const contactFields = [personal.name, personal.email, personal.phone, personal.location];
  const contactInfo = (contactFields.filter(Boolean).length / contactFields.length) * 10;

  const standardSections = [summary, experience.length > 0, Object.values(skills).some((s) => s.length > 0)];
  const standardSectionsScore = (standardSections.filter(Boolean).length / standardSections.length) * 15;

  const experienceStructure =
    experience.length === 0
      ? 0
      : (experience.reduce((sum, e) => {
          const fields = [e.company, e.role, e.startDate, e.responsibilities.length > 0];
          return sum + fields.filter(Boolean).length / fields.length;
        }, 0) /
          experience.length) *
        20;

  const skillCategoryCount = Object.values(skills).filter((s) => s.length > 0).length;
  const skillsStructure = (skillCategoryCount / 9) * 15;

  const keywordCoverage = (qaCoverageScore / 100) * 15;

  const wordCount = sourceText.split(/\s+/).filter(Boolean).length;
  const formatting = wordCount > 100 && wordCount < 1200 ? 10 : wordCount > 50 ? 6 : 3;

  const sentences = sourceText.split(/[.!?\n]/).filter((s) => s.trim().length > 0);
  const avgWordsPerSentence = sentences.length > 0 ? wordCount / sentences.length : 0;
  const readability = avgWordsPerSentence > 0 && avgWordsPerSentence < 28 ? 10 : 5;

  const consistency = experience.every((e) => (e.startDate ? /\d/.test(e.startDate) : true)) ? 5 : 3;

  return clamp(
    contactInfo + standardSectionsScore + experienceStructure + skillsStructure + keywordCoverage + formatting + readability + consistency,
  );
}

/** Impact Score — action-oriented language, specificity, clarity, supported outcomes. */
export function scoreImpact(experience: Experience[]): number {
  const allBullets = experience.flatMap((e) => [...e.responsibilities, ...e.achievements]);
  if (allBullets.length === 0) return 0;

  const actionOriented = allBullets.filter((b) =>
    ACTION_VERBS.some((v) => b.trim().toLowerCase().startsWith(v)),
  ).length;

  const withMetrics = allBullets.filter((b) => /\d/.test(b)).length;
  const withTechSpecificity = allBullets.filter((b) => /[A-Z][a-zA-Z0-9.+#]{2,}/.test(b)).length;
  const concise = allBullets.filter((b) => b.split(/\s+/).length <= 30).length;

  const total = allBullets.length;
  const score =
    ((actionOriented / total) * 35 +
      (withMetrics / total) * 20 +
      (withTechSpecificity / total) * 25 +
      (concise / total) * 20) *
    1;

  return clamp(score);
}

/** Content Quality Score — grammar, structure, consistency, professional language. */
export function scoreContentQuality(params: { summary: string; experience: Experience[] }): number {
  const { summary, experience } = params;
  let score = 0;

  score += summary.trim().length > 40 ? 25 : summary.trim().length > 0 ? 12 : 0;

  const structured = experience.length > 0 && experience.every((e) => e.responsibilities.length > 0);
  score += structured ? 25 : experience.length > 0 ? 12 : 0;

  const allBullets = experience.flatMap((e) => [...e.responsibilities, ...e.achievements]);
  const properCase = allBullets.filter((b) => /^[A-Z]/.test(b.trim())).length;
  score += allBullets.length > 0 ? (properCase / allBullets.length) * 25 : 0;

  const noDupes = new Set(allBullets.map((b) => b.trim().toLowerCase())).size === allBullets.length;
  score += noDupes ? 25 : 15;

  return clamp(score);
}
