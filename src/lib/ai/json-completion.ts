import "server-only";
import type { z } from "zod";
import { getGroqClient } from "./groq-client";
import { GROQ_MODEL } from "./model";
import { AIResponseError } from "./errors";

const JSON_ONLY_INSTRUCTION =
  "\n\nRespond with ONLY a single valid JSON object matching the required shape described above. " +
  "Do not include markdown code fences, explanations, or any text outside the JSON object.";

function extractJsonPayload(raw: string): string {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) return fenced[1].trim();
  return raw.trim();
}

/**
 * Calls Groq's chat completions API with JSON-object mode, parses the
 * response, and validates it against the given Zod schema. Used by every
 * stage of the AI pipeline (fact extraction, RICE-POT enhancement) so
 * malformed or empty model output is caught in one place rather than
 * crashing the request.
 */
export async function generateStructuredJSON<Schema extends z.ZodType>(params: {
  system: string;
  prompt: string;
  schema: Schema;
  fallbackShape: Record<string, unknown>;
  /** Defensive fixups for common LLM shape drift (wrong key names, flat arrays instead of objects, etc). */
  normalize?: (raw: Record<string, unknown>) => Record<string, unknown>;
}): Promise<z.infer<Schema>> {
  const { system, prompt, schema, fallbackShape, normalize } = params;
  const client = getGroqClient();

  const completion = await client.chat.completions.create({
    model: GROQ_MODEL,
    messages: [
      { role: "system", content: system + JSON_ONLY_INSTRUCTION },
      { role: "user", content: prompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0.3,
    max_completion_tokens: 4096,
  });

  const choice = completion.choices[0];
  if (choice?.finish_reason === "length") {
    throw new AIResponseError(
      "The AI model's response was cut off because the resume is too long to process in one pass. Please try again or shorten the source document.",
    );
  }

  const content = choice?.message?.content;
  if (!content || !content.trim()) {
    throw new AIResponseError("The AI model returned an empty response. Please try again.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(extractJsonPayload(content));
  } catch {
    throw new AIResponseError("The AI model returned a response that was not valid JSON. Please try again.");
  }

  // Some models occasionally wrap the object in a single-element array
  // despite the JSON-object instruction — unwrap rather than fail the request.
  if (Array.isArray(parsed) && parsed.length === 1 && typeof parsed[0] === "object" && parsed[0] !== null) {
    parsed = parsed[0];
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new AIResponseError("The AI model returned an unexpected response shape. Please try again.");
  }

  const normalized = normalize ? normalize(parsed as Record<string, unknown>) : (parsed as Record<string, unknown>);

  // Ensure every top-level key the schema expects is at least present (even
  // if empty), so per-field Zod defaults inside nested objects can kick in
  // instead of the whole parse failing because the model omitted a section.
  const withFallback = { ...fallbackShape, ...normalized };

  const result = schema.safeParse(withFallback);
  if (!result.success) {
    throw new AIResponseError(
      `The AI model's response did not match the expected resume schema (${result.error.issues
        .slice(0, 3)
        .map((i) => i.path.join("."))
        .join(", ")}). Please try again.`,
    );
  }

  return result.data;
}
