import "server-only";
import Groq from "groq-sdk";
import { AIConfigError } from "./errors";

let client: Groq | null = null;

/**
 * Lazily constructs the Groq client from GROQ_API_KEY. Server-only — never
 * import this module from a client component. Throws AIConfigError (rather
 * than letting the SDK throw its own generic error) so route handlers can
 * return a clear, actionable message instead of a raw 500.
 */
export function getGroqClient(): Groq {
  if (client) return client;

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new AIConfigError(
      "GROQ_API_KEY is not set. Add it to your environment variables (see .env.example) to enable AI-powered resume analysis.",
    );
  }

  client = new Groq({ apiKey });
  return client;
}
