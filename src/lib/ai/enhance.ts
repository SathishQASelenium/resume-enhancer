import "server-only";
import { generateStructuredJSON } from "./json-completion";
import { ENHANCEMENT_SYSTEM } from "./prompts";
import { EnhancedContentSchema, type EnhancedContent, type ExtractedFacts } from "@/schemas/resume";

const FALLBACK_SHAPE = {
  summary: "",
  experience: [],
  generatedClaims: [],
};

/** Pipeline stage 3: RICE-POT Resume Enhancement. Rewrites wording only — never adds facts. */
export async function enhanceContent(facts: ExtractedFacts): Promise<EnhancedContent> {
  return generateStructuredJSON({
    system: ENHANCEMENT_SYSTEM,
    prompt: [
      "VERIFIED FACTS (source of truth):",
      JSON.stringify(
        {
          summary: facts.summary,
          experience: facts.experience,
          verifiedFacts: facts.verifiedFacts,
        },
        null,
        2,
      ),
      "",
      "UNKNOWN / MISSING INFORMATION (do not fill these in):",
      JSON.stringify(facts.unknownInformation, null, 2),
      "",
      `Return one experience entry in "experience" for each of the ${facts.experience.length} verified facts experience entries, in the same order.`,
    ].join("\n"),
    schema: EnhancedContentSchema,
    fallbackShape: FALLBACK_SHAPE,
  });
}
