import "server-only";
import { generateStructuredJSON } from "./json-completion";
import { FACT_EXTRACTION_SYSTEM } from "./prompts";
import { categorizeSkillList } from "@/lib/qa-taxonomy";
import { ExtractedFactsSchema, type ExtractedFacts } from "@/schemas/resume";

const FALLBACK_SHAPE = {
  personal: {},
  summary: "",
  skills: {},
  experience: [],
  projects: [],
  certifications: [],
  education: [],
  awards: [],
  verifiedFacts: [],
  unknownInformation: [],
};

function str(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function arr(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

/** Splits a free-text description into bullet-like sentences, for models that return prose instead of arrays. */
function toSentences(text: unknown): string[] {
  if (Array.isArray(text)) return text.filter((t): t is string => typeof t === "string");
  if (typeof text !== "string" || !text.trim()) return [];
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Defensive fixups for common shape drift in LLM output: flat contact fields
 * instead of a nested "personal" object, a flat "skills" array instead of
 * categorized buckets, "experiences"/"title"/"description" instead of
 * "experience"/"role"/"responsibilities", and "graduationYear" instead of
 * "date". This only relabels data the model already extracted — it never
 * invents new facts.
 */
function normalizeExtractedFacts(raw: Record<string, unknown>): Record<string, unknown> {
  const personalSource = (raw.personal as Record<string, unknown> | undefined) ?? {};
  const personal = {
    name: str(personalSource.name) || str(raw.name),
    email: str(personalSource.email) || str(raw.email),
    phone: str(personalSource.phone) || str(raw.phone),
    location: str(personalSource.location) || str(raw.location),
    linkedin: str(personalSource.linkedin) || str(raw.linkedin),
    github: str(personalSource.github) || str(raw.github),
  };

  const skills = Array.isArray(raw.skills)
    ? categorizeSkillList(raw.skills.filter((s): s is string => typeof s === "string"))
    : ((raw.skills as Record<string, unknown> | undefined) ?? {});

  const rawExperience = arr(raw.experience).length > 0 ? arr(raw.experience) : arr(raw.experiences);
  const experience = rawExperience.map((entry) => {
    const e = (entry as Record<string, unknown>) ?? {};
    return {
      company: str(e.company),
      role: str(e.role) || str(e.title) || str(e.jobTitle),
      location: str(e.location),
      startDate: str(e.startDate) || str(e.start),
      endDate: str(e.endDate) || str(e.end),
      responsibilities: arr(e.responsibilities).length > 0 ? e.responsibilities : toSentences(e.description),
      achievements: arr(e.achievements),
      technologies: arr(e.technologies),
    };
  });

  const education = arr(raw.education).map((entry) => {
    const e = (entry as Record<string, unknown>) ?? {};
    return {
      institution: str(e.institution) || str(e.school),
      degree: str(e.degree),
      field: str(e.field) || str(e.major),
      date: str(e.date) || str(e.graduationYear) || str(e.year),
    };
  });

  return { ...raw, personal, skills, experience, education };
}

/** Pipeline stage 1: Fact Extraction. Pulls only verified facts from the source resume text. */
export async function extractFacts(resumeText: string): Promise<ExtractedFacts> {
  return generateStructuredJSON({
    system: FACT_EXTRACTION_SYSTEM,
    prompt: `RAW RESUME TEXT:\n"""\n${resumeText}\n"""`,
    schema: ExtractedFactsSchema,
    fallbackShape: FALLBACK_SHAPE,
    normalize: normalizeExtractedFacts,
  });
}
