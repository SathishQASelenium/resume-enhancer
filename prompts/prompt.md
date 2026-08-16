You are the Lead Engineer for this hackathon project.

The attached `QA-Resume-AI-BLUEPRINT.md` is the AUTHORITATIVE SPECIFICATION for the entire project.

Read the blueprint completely before writing any application code.

Do NOT:
- Skip requirements
- Reinterpret requirements
- Remove requirements
- Replace the defined architecture with a simpler approach
- Add unnecessary features outside the blueprint

Follow the B.L.A.S.T. methodology defined in the blueprint.

## PHASE 1 — DISCOVERY & PLANNING

Before writing implementation code:

1. Inspect the available environment.
2. Inspect the existing project/repository structure, if any.
3. Identify the available runtime, package manager and development tools.
4. Read and understand the complete blueprint.
5. Create a concrete implementation plan.
6. Identify any technical constraints or dependencies.
7. Define the project structure before implementing features.

Do not ask me to manually define architecture that is already specified in the blueprint.

If a reasonable implementation decision is required and the blueprint does not explicitly define it, choose the simplest production-ready approach that preserves the blueprint's intent.

## PHASE 2 — IMPLEMENT THE MVP

Implement the complete end-to-end MVP:

PDF/DOCX Upload
→ Document Extraction
→ Verified Fact Extraction
→ Structured Resume JSON
→ QA Profile Analysis
→ QA Skill Gap Detection
→ RICE-POT AI Enhancement
→ Anti-Hallucination Validation
→ ATS / QA / Impact Scoring
→ Deterministic HTML Generation
→ Live Resume Preview
→ HTML Download

The application must work as a complete user journey rather than as disconnected demo screens.

## CRITICAL ANTI-HALLUCINATION REQUIREMENT

The uploaded resume is ALWAYS the source of truth.

The AI MUST NOT invent or assume:

- Skills
- Technologies
- Employers
- Job titles
- Employment dates
- Certifications
- Projects
- Achievements
- Metrics
- Responsibilities
- Years of experience
- Education
- Tools
- Frameworks

The AI may improve wording, grammar, structure, clarity and professional presentation ONLY when the underlying information is supported by the source resume.

If information is unavailable, do not fabricate it.

Implement the Anti-Hallucination architecture described in the blueprint:

Extract Verified Facts
→ Identify Unknown Information
→ Generate From Verified Facts
→ Validate Generated Claims
→ Accept / Reject

Unsupported claims must be rejected or removed.

## RICE-POT REQUIREMENT

Use the RICE-POT framework defined in the blueprint for AI processing:

Role
Instructions
Context
Examples
Parameters
Output
Tone

Do not bypass the framework with a generic resume-rewriting prompt.

## STRUCTURED AI OUTPUT

The LLM must generate structured JSON conforming to the defined Resume JSON schema.

Do NOT allow the LLM to directly generate arbitrary HTML.

Use:

Resume JSON
→ Schema Validation
→ React/Template Renderer
→ Semantic HTML

Use deterministic application logic wherever possible.

## QA-SPECIFIC INTELLIGENCE

The application must analyze the resume specifically from a QA/testing perspective.

Identify:

- QA strengths
- Weakly represented areas
- Missing/underrepresented QA competencies
- Content improvement opportunities
- ATS improvement opportunities

The QA skill taxonomy is for ANALYSIS ONLY.

A missing technology must NEVER be automatically added to the candidate's resume.

For example:

If Playwright is not present in the resume, the system may say:

"Playwright experience was not identified in the provided resume."

It must NOT add Playwright to the candidate's skills.

## DAY / NIGHT MODE

Implement the UI theme requirement defined in the blueprint:

☀️ Day Mode → Light Theme
🌙 Night Mode → Dark Theme

Requirements:

- Global theme switching
- System preference detection on first visit
- Persist user's manual preference
- Responsive UI
- Accessible contrast
- Consistent theme across all screens
- Use theme tokens rather than hard-coded colors

The application UI theme must be independent from the generated resume's styling.

## UI / UX

Build a polished, professional SaaS-style interface.

Prioritize:

- Clean visual hierarchy
- Excellent upload experience
- Clear processing states
- Attractive analysis dashboard
- Clear scoring visualization
- Professional resume preview
- Responsive design
- Day/Night mode
- Accessible controls

Do not sacrifice core functionality for decorative UI.

## VALIDATION

After every major implementation phase:

1. Run the relevant tests.
2. Check for TypeScript/build errors.
3. Fix issues before continuing.
4. Verify that the previous functionality still works.

Do not wait until the end to discover that an earlier phase is broken.

## TEST THE CRITICAL FLOW

Before considering the project complete, verify:

1. PDF upload
2. DOCX upload
3. Document extraction
4. Resume JSON generation
5. QA analysis
6. RICE-POT enhancement
7. Anti-hallucination validation
8. Unsupported claim rejection
9. Score calculation
10. HTML rendering
11. Resume preview
12. HTML download
13. Day Mode
14. Night Mode
15. Production build

## DEPLOYMENT

At the end:

1. Run the production build.
2. Resolve all build/type errors.
3. Verify environment variables.
4. Ensure secrets/API keys are not exposed to the client.
5. Verify the application is suitable for Vercel deployment.
6. Prepare the project for GitHub.
7. Provide clear Vercel deployment instructions in the README.

Do NOT claim deployment is successful unless it has actually been verified.

## SCOPE CONTROL

This is a hackathon MVP.

Do NOT implement unnecessary features such as:

- Authentication
- Payments
- Database
- User accounts
- LinkedIn integration
- Job portal integrations
- Cover letter generation
- Interview chatbot
- Multiple resume templates
- Admin dashboards
- Other features not required by the blueprint

Prioritize a reliable end-to-end MVP.

## FINAL DELIVERABLE

When implementation is complete, provide:

1. Summary of what was implemented
2. Project structure
3. Technologies used
4. AI/RICE-POT implementation
5. Anti-hallucination implementation
6. QA gap detection implementation
7. Testing performed
8. Build status
9. Vercel readiness
10. Any remaining limitations

Most importantly:

BUILD THE APPLICATION.

Do not merely describe how it could be built.

Now integrate Groq as the LLM provider for the existing application.

Use the official Groq TypeScript SDK.

Use:
GROQ_API_KEY
GROQ_MODEL

Default model:
openai/gpt-oss-120b

Keep the Groq API key server-side and never expose it to the browser.

Implement the AI pipeline as separate logical stages:

1. Fact Extraction
2. QA Profile Analysis
3. RICE-POT Resume Enhancement
4. Anti-Hallucination Validation

Use structured JSON responses wherever possible.

Validate all AI responses using the existing schema validation layer.

Do not allow the LLM to generate arbitrary HTML.

Use:

Resume Text
→ Groq
→ Structured JSON
→ Schema Validation
→ Anti-Hallucination Validation
→ Deterministic HTML Renderer

Make the model configurable through environment variables.

Do not break or redesign the existing application.

After implementation:

1. Verify the Groq API integration.
2. Verify the complete resume processing flow.
3. Verify error handling when the API key is missing.
4. Verify invalid/empty AI responses are handled safely.
5. Run TypeScript checks.
6. Run the production build.
7. Report any remaining issues.