/** GROQ_API_KEY is missing or the client could not be constructed. */
export class AIConfigError extends Error {}

/** Groq returned no content, non-JSON content, or content that failed schema validation. */
export class AIResponseError extends Error {}
