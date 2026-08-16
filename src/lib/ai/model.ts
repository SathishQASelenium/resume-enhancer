// Server-only. GROQ_API_KEY must never be exposed to the browser — it is only
// ever read here, inside API route handlers / server-side lib code.
export const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
