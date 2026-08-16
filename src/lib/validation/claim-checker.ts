import { ALL_TAXONOMY_SKILLS } from "@/lib/qa-taxonomy";

export type ClaimCheck = {
  supported: boolean;
  reasons: string[];
};

// Generic QA activity phrases that the RICE-POT enhancer is explicitly allowed to
// reword (e.g. "Test Plan" -> "test planning", "test case writing" -> "test case
// design") per its "rephrase for grammar and clarity" instruction. Flagging these
// as unsupported technology would penalize permitted paraphrasing, not real
// hallucination, so they're excluded from the hallucination check even though
// they're still used for skill-taxonomy categorization elsewhere.
const CLAIM_CHECK_EXCLUDED_SKILLS = new Set(["Test Case Design", "Test Planning"]);
const HALLUCINATION_CHECK_SKILLS = ALL_TAXONOMY_SKILLS.filter((s) => !CLAIM_CHECK_EXCLUDED_SKILLS.has(s));

// Common acronym <-> spelled-out equivalents. A resume that spells out "User
// Acceptance Testing" fully supports an enhancement that shortens it to "UAT",
// and vice versa — so a skill is considered present in the source if either
// form appears there.
const SKILL_ACRONYM_EXPANSIONS: Record<string, string> = {
  UAT: "User Acceptance Testing",
};

const METRIC_PATTERN = /\b\d+(\.\d+)?\s*%|\b\d{2,}(\.\d+)?\s*(x|times|hours|hrs|days|weeks|months|years|k\b)/gi;
const YEAR_PATTERN = /\b(19|20)\d{2}\b/g;

function normalize(text: string): string {
  // Strip "+" so "12+ years" in the source resume matches a paraphrased "12 years" claim.
  return text.toLowerCase().replace(/\+/g, "").replace(/\s+/g, " ").trim();
}

function containsSubstring(haystack: string, needle: string): boolean {
  return normalize(haystack).includes(normalize(needle));
}

/**
 * Deterministic anti-hallucination check (blueprint §18–22).
 * A generated claim is only "supported" if every metric and every known
 * QA/tech taxonomy term it mentions is traceable back to the source text.
 */
export function checkClaim(claim: string, sourceText: string): ClaimCheck {
  const reasons: string[] = [];

  const metrics = claim.match(METRIC_PATTERN) ?? [];
  for (const metric of metrics) {
    if (!containsSubstring(sourceText, metric)) {
      reasons.push(`Unsupported metric detected: "${metric.trim()}" was not found in the source resume.`);
    }
  }

  const years = claim.match(YEAR_PATTERN) ?? [];
  for (const year of years) {
    if (!containsSubstring(sourceText, year)) {
      reasons.push(`Unsupported date detected: "${year}" was not found in the source resume.`);
    }
  }

  for (const skill of HALLUCINATION_CHECK_SKILLS) {
    const skillPattern = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
    const expansion = SKILL_ACRONYM_EXPANSIONS[skill];
    const expansionPattern = expansion
      ? new RegExp(`\\b${expansion.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i")
      : null;
    const sourceHasSkill = skillPattern.test(sourceText) || (expansionPattern?.test(sourceText) ?? false);
    if (skillPattern.test(claim) && !sourceHasSkill) {
      reasons.push(`Unsupported technology detected: "${skill}" was not found in the source resume.`);
    }
  }

  return { supported: reasons.length === 0, reasons };
}
