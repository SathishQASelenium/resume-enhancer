import { checkClaim } from "./claim-checker";
import type { EnhancedContent, ExtractedFacts, Experience, Verification } from "@/schemas/resume";

export type SanitizedContent = {
  summary: string;
  experience: Experience[];
  verification: Verification;
};

type RejectedClaim = { claim: string; reasons: string[] };

/**
 * Anti-Hallucination Engine (blueprint §18).
 * Extract Verified Facts -> Identify Unknowns -> Generate From Facts ->
 * Self-Validate -> Accept/Reject.
 *
 * Every piece of AI-generated text is checked against the source resume.
 * Anything unsupported is rejected and replaced with the original verified
 * wording (or dropped if there is no safe fallback) — the AI's own output is
 * never treated as a source of truth.
 */
export function validateAndSanitize(
  facts: ExtractedFacts,
  enhanced: EnhancedContent,
  sourceText: string,
): SanitizedContent {
  const rejected: RejectedClaim[] = [];

  function acceptOrFallback(generated: string, fallback: string): string {
    if (!generated.trim()) return fallback;
    const check = checkClaim(generated, sourceText);
    if (check.supported) return generated;
    rejected.push({ claim: generated, reasons: check.reasons });
    return fallback;
  }

  function acceptOrDropList(generatedList: string[], fallbackList: string[]): string[] {
    return generatedList.map((generated, i) => acceptOrFallback(generated, fallbackList[i] ?? "")).filter(Boolean);
  }

  const summary = acceptOrFallback(enhanced.summary, facts.summary);

  const experience: Experience[] = facts.experience.map((original, i) => {
    const enh = enhanced.experience[i];
    return {
      ...original,
      responsibilities: enh
        ? acceptOrDropList(enh.responsibilities, original.responsibilities)
        : original.responsibilities,
      achievements: enh ? acceptOrDropList(enh.achievements, original.achievements) : original.achievements,
    };
  });

  // Also run every claim the model told us it generated through the checker,
  // even if it isn't wired into a resume field, so the verification report
  // reflects everything the model produced.
  for (const claim of enhanced.generatedClaims) {
    const check = checkClaim(claim, sourceText);
    if (!check.supported && !rejected.some((r) => r.claim === claim)) {
      rejected.push({ claim, reasons: check.reasons });
    }
  }

  const verification: Verification = {
    verifiedFacts: facts.verifiedFacts,
    unknownInformation: facts.unknownInformation,
    unsupportedClaims: rejected.map((r) => `"${r.claim}" — ${r.reasons.join(" ")}`),
    validationStatus: rejected.length === 0 ? "PASS" : "FAIL",
  };

  return { summary, experience, verification };
}
