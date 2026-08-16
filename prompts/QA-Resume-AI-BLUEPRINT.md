# 🚀 QA Resume AI
## Final Hackathon-Ready Blueprint

### Tagline

> **From QA Experience to Career-Ready Resume — Without AI Hallucinations.**

---

# 1. Project Overview

**QA Resume AI** is an AI-powered resume intelligence platform designed specifically for QA professionals.

The application accepts a **PDF or DOCX resume**, extracts the candidate's actual information, analyzes their QA/testing profile, detects content and skill gaps, enhances the resume using the **RICE-POT framework**, applies strict **Anti-Hallucination Rules**, validates the generated content against the original resume, and produces an attractive, ATS-friendly downloadable HTML resume.

### Core Pipeline

```text
PDF / DOCX
     ↓
Document Extraction
     ↓
Fact Extraction
     ↓
Resume JSON
     ↓
QA Profile Analysis
     ↓
RICE-POT AI Enhancement
     ↓
ANTI-HALLUCINATION VALIDATION
     ↓
ATS + QA Scoring
     ↓
HTML Renderer
     ↓
Live Preview
     ↓
Download HTML / ZIP
```

---

# 2. Hackathon Objective

The hackathon requires an AI-powered solution that solves a real-world QA problem and is practical, usable and innovative. It must be open source, deployed on Vercel, documented through a README and functioning before the submission deadline.

QA Resume AI addresses a practical problem:

> QA professionals often have strong technical experience, but their resumes may fail to communicate their automation, API, performance, CI/CD and quality-engineering capabilities effectively.

The system improves the presentation **without inventing experience**.

---

# 3. The Key Innovation

This is **NOT simply an AI resume generator**.

The core differentiator is:

## **Evidence-Grounded QA Resume Enhancement**

```text
                 ORIGINAL RESUME
                        │
                        ▼
              ┌──────────────────┐
              │ Verified Facts   │
              └────────┬─────────┘
                       │
              ┌────────▼─────────┐
              │ Unknown / Missing│
              │ Information      │
              └────────┬─────────┘
                       │
                       ▼
                RICE-POT AI
                       │
                       ▼
             Enhanced Resume
                       │
                       ▼
             Fact Validation
                       │
             ┌─────────┴─────────┐
             │                   │
          Verified           Unsupported
             │                   │
             ▼                   ▼
          Accept              Reject
```

The uploaded Anti-Hallucination Rules establish that assertions must be traceable to provided input, assumptions must not be treated as facts, and generated output must undergo a self-check.

---

# 4. B.L.A.S.T. + RICE-POT + Anti-Hallucination

The project uses three complementary layers.

## B.L.A.S.T.

### How we build the system

```text
B → Blueprint
L → Link
A → Architect
S → Stylize
T → Trigger
```

Your B.L.A.S.T. framework requires discovery, data schema definition and an approved blueprint before implementation.

---

## RICE-POT

### How we control the AI

```text
R → Role
I → Instructions
C → Context
E → Examples
P → Parameters
O → Output
T → Tone
```

The RICE-POT framework explicitly defines these seven components for controlling AI-generated output.

---

## Anti-Hallucination

### How we verify the AI

```text
Extract Facts
     ↓
Identify Unknowns
     ↓
Generate Only From Facts
     ↓
Self-Validate
     ↓
Accept / Reject
```

This follows the supplied Anti-Hallucination process.

---

# 5. Product Architecture

```text
                         USER
                           │
                           ▼
                 ┌───────────────────┐
                 │ Upload PDF / DOCX │
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │ Document Parser   │
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │ Fact Extractor    │
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │ Resume JSON       │
                 └─────────┬─────────┘
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
      ┌───────────────┐        ┌────────────────┐
      │ QA Analysis   │        │ RICE-POT AI    │
      └───────┬───────┘        └───────┬────────┘
              │                        │
              └───────────┬────────────┘
                          ▼
                ┌────────────────────┐
                │ Enhanced Resume    │
                └──────────┬─────────┘
                           │
                           ▼
                ┌────────────────────┐
                │ Anti-Hallucination │
                │ Validator          │
                └──────────┬─────────┘
                           │
                  ┌────────┴────────┐
                  │                 │
               Valid            Invalid
                  │                 │
                  ▼                 ▼
             Continue          Reject/Retry
                  │
                  ▼
          ┌───────────────────┐
          │ ATS + QA Scoring  │
          └─────────┬─────────┘
                    │
                    ▼
          ┌───────────────────┐
          │ HTML Renderer     │
          └─────────┬─────────┘
                    │
                    ▼
          ┌───────────────────┐
          │ Live Resume       │
          │ Preview           │
          └─────────┬─────────┘
                    │
             ┌──────┴──────┐
             ▼             ▼
        Download HTML   Download ZIP
```

---

# 6. B.L.A.S.T. Blueprint

## B — Blueprint

### North Star

Transform an existing QA resume into a verified, ATS-friendly, professional HTML resume.

### Source of Truth

The **uploaded resume** is the primary source of truth.

The AI cannot treat its own generated content as a source of truth.

### Delivery Payload

```text
Final Resume JSON
        +
ATS/QA Analysis
        +
HTML Resume
```

### Behavioral Rules

- Preserve facts.
- Improve language.
- Improve structure.
- Detect gaps.
- Never fabricate.
- Never assume.
- Validate generated claims.

---

# 7. L — Link

For the MVP:

### Required

- LLM API
- PDF parser
- DOCX parser

### Deployment

- GitHub
- Vercel

Avoid unnecessary integrations during the 12-hour hackathon.

---

# 8. A — Architect

Follow the B.L.A.S.T. three-layer model:

### Layer 1 — Architecture

```text
architecture/
├── system.md
├── resume-schema.md
├── resume-parser.md
├── rice-pot.md
├── anti-hallucination.md
├── qa-analysis.md
├── scoring.md
└── html-generator.md
```

### Layer 2 — Navigation

Controls:

```text
Upload
 → Extract
 → Validate
 → Analyze
 → Enhance
 → Verify
 → Score
 → Render
```

### Layer 3 — Tools

Deterministic tools for:

- Document extraction
- Schema validation
- Fact comparison
- Score calculation
- HTML generation

This follows the B.L.A.S.T. principle of separating architecture, decision logic and deterministic execution.

---

# 9. S — Stylize

Build a professional SaaS-style interface.

## Landing Page

### Hero

> **Your QA Experience Deserves a Better Resume.**

### Subtitle

> Upload your PDF or DOCX resume. QA Resume AI analyzes your testing experience, detects gaps, enhances your content and generates a professional HTML resume — without inventing your experience.

### CTA

**Analyze My Resume**

---

# 10. Dashboard

Display:

```text
┌─────────────────────────────────────────┐
│          QA RESUME HEALTH               │
├─────────────────────────────────────────┤
│ ATS Score              82 / 100         │
│ QA Coverage            78 / 100         │
│ Impact Score           71 / 100         │
│ Content Quality        85 / 100         │
└─────────────────────────────────────────┘
```

Then:

### AI Findings

```text
✓ Strong Selenium experience
✓ Good automation coverage
⚠ API testing needs stronger representation
⚠ Achievements lack measurable outcomes
⚠ Professional summary is generic
```

---

# 11. T — Trigger

Deployment pipeline:

```text
GitHub
   ↓
Vercel
   ↓
Production
   ↓
Final Testing
   ↓
Hackathon Submission
```

The hackathon requires the GitHub repository and Vercel deployment to be accessible to judges.

---

# 12. RICE-POT Master AI Contract

## ROLE

You are:

- Senior QA Resume Strategist
- Senior QA Hiring Manager
- ATS Optimization Expert
- QA Technical Recruiter
- Resume Content Specialist

Your responsibility is to analyze and improve the supplied QA resume while maintaining strict factual accuracy.

---

## INSTRUCTIONS

You MUST:

1. Extract verifiable information.
2. Identify missing or unclear information.
3. Analyze QA/testing capabilities.
4. Improve weak wording.
5. Improve structure.
6. Improve technical clarity.
7. Optimize ATS readability.
8. Identify QA skill gaps.
9. Generate structured JSON.
10. Validate generated content against source facts.

You MUST NOT:

- Invent experience.
- Invent metrics.
- Invent technologies.
- Invent certifications.
- Invent projects.
- Invent employers.
- Invent job titles.
- Invent dates.
- Assume typical QA responsibilities.
- Convert a missing skill into an actual skill.

---

# 13. C — Context

The context is ONLY:

```text
Uploaded Resume
+
Extracted Resume Facts
+
User-provided information
```

The resume itself is the source of truth.

---

# 14. E — Examples

### Allowed

Source:

> Worked on Selenium automation.

Output:

> Performed Selenium-based UI automation testing to support regression validation.

Reason:

The output improves wording without introducing a new technology, employer, metric or unsupported responsibility.

### Not Allowed

Source:

> Worked on Selenium automation.

Output:

> Designed a Selenium automation framework that reduced regression execution time by 60%.

Reason:

The framework ownership and 60% metric are unsupported.

---

# 15. P — Parameters

Mandatory constraints:

```text
FACTUALITY = STRICT

HALLUCINATION = NOT_ALLOWED

UNSUPPORTED_CLAIMS = REJECT

INVENTED_METRICS = REJECT

INVENTED_TECHNOLOGIES = REJECT

INVENTED_EXPERIENCE = REJECT

INVENTED_CERTIFICATIONS = REJECT

INVENTED_EMPLOYERS = REJECT

DATE_MODIFICATION = NOT_ALLOWED

JOB_TITLE_MODIFICATION = NOT_ALLOWED

SOURCE_OF_TRUTH = USER_RESUME
```

---

# 16. O — Output

The AI must return structured Resume JSON.

It must not directly generate arbitrary HTML.

```text
Resume
  ↓
AI
  ↓
JSON
  ↓
Schema Validation
  ↓
React HTML Renderer
```

---

# 17. T — Tone

Generated content must be:

- Professional
- Technical
- Concise
- Confident
- Recruiter-friendly
- ATS-friendly

---

# 18. Anti-Hallucination Engine

This is a **mandatory system component**.

The supplied Anti-Hallucination Rules state that the assistant should only use explicitly provided information, avoid assumptions, and ensure every assertion is traceable to the input.

Implement this as:

## Step 1 — Extract Verified Facts

Create:

```json
{
  "verifiedFacts": []
}
```

Examples:

```text
Company = ABC Technologies
Role = QA Automation Engineer
Technology = Selenium
Language = Java
Certification = ISTQB
```

---

## Step 2 — Identify Unknown Information

Create:

```json
{
  "unknownInformation": []
}
```

Example:

```text
Framework ownership not specified.
Automation percentage not specified.
Regression time reduction not specified.
Team size not specified.
```

---

## Step 3 — Generate Only From Verified Facts

AI may:

- Rephrase
- Reorganize
- Summarize
- Improve grammar
- Improve clarity
- Improve professional tone

AI may NOT introduce unsupported facts.

---

## Step 4 — Self-Validation

After generation:

```text
Generated Claim
      ↓
Compare Against Facts
      ↓
Supported?
   /       \
 YES       NO
  |         |
Accept    Reject
```

The source rules explicitly require a self-check for hallucinations and contradictions.

---

# 19. Unknown Information Rule

When required information is unavailable:

> **Insufficient information to determine.**

This follows the supplied Anti-Hallucination Rules.

For a resume application, this can be presented more naturally in the UI as:

> **Not available in the provided resume.**

The important rule is that the system must not fill the gap with an assumption.

---

# 20. Inference Rule

If the application ever identifies an inference, it must explicitly label it:

> **Inference (low confidence)**

The AI should preferably avoid inference entirely during resume rewriting.

The source anti-hallucination rules require explicit labeling when inference is used.

---

# 21. Anti-Hallucination Output

Internally maintain:

```json
{
  "verifiedFacts": [],
  "unknownInformation": [],
  "generatedClaims": [],
  "unsupportedClaims": [],
  "validationStatus": "PASS"
}
```

Example:

```json
{
  "verifiedFacts": [
    "Selenium",
    "Java",
    "TestNG"
  ],
  "unknownInformation": [
    "Regression time reduction"
  ],
  "generatedClaims": [
    "Performed Selenium-based UI automation testing."
  ],
  "unsupportedClaims": [],
  "validationStatus": "PASS"
}
```

---

# 22. Strict Output Validation

The application should reject AI output if:

```text
Unsupported technology detected
Unsupported metric detected
Unsupported employer detected
Unsupported certification detected
Unsupported date detected
Unsupported job title detected
Unsupported project detected
```

Example:

```text
⚠ AI VALIDATION FAILED

Unsupported claim detected:

"Reduced regression execution time by 60%"

This information was not found in the source resume.

The claim has been removed.
```

This becomes one of the strongest demo features.

---

# 23. Resume JSON Schema

```json
{
  "personal": {
    "name": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "github": ""
  },
  "summary": "",
  "skills": {
    "testing": [],
    "automation": [],
    "api": [],
    "performance": [],
    "programming": [],
    "devops": [],
    "databases": [],
    "ai": [],
    "tools": []
  },
  "experience": [
    {
      "company": "",
      "role": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "responsibilities": [],
      "achievements": [],
      "technologies": []
    }
  ],
  "projects": [],
  "certifications": [],
  "education": [],
  "analysis": {
    "atsScore": 0,
    "qaCoverageScore": 0,
    "impactScore": 0,
    "contentQualityScore": 0,
    "strengths": [],
    "gaps": [],
    "recommendations": []
  },
  "verification": {
    "verifiedFacts": [],
    "unknownInformation": [],
    "unsupportedClaims": [],
    "validationStatus": "PASS"
  }
}
```

---

# 24. QA Skill Gap Detection

Analyze categories such as:

### Testing

- Manual Testing
- Functional Testing
- Regression Testing
- Integration Testing
- System Testing
- UAT

### Automation

- Selenium
- Playwright
- Cypress
- WebDriver
- Page Object Model

### API

- REST API
- Postman
- REST Assured
- API Automation

### Performance

- JMeter
- Load Testing
- Performance Testing

### Programming

- Java
- JavaScript
- TypeScript
- Python
- SQL

### CI/CD

- Jenkins
- GitHub Actions
- Azure DevOps
- GitLab CI/CD

### Cloud

- AWS
- Azure
- GCP

### Modern QA

- AI Testing
- LLM Testing
- RAG Testing
- Prompt Testing
- AI-assisted Testing

### Important Rule

The taxonomy is used for **analysis only**.

A missing technology must **never automatically be added to the candidate's resume**.

---

# 25. Gap Categories

The application should distinguish:

### Strong

> Selenium automation is strongly represented.

### Weak Representation

> API testing is mentioned but lacks supporting detail.

### Missing From Resume

> CI/CD experience was not identified in the provided resume.

### Unsupported

> Playwright experience cannot be established from the provided resume.

This is more useful than simply saying "missing skill."

---

# 26. Scoring

## ATS Score

Example:

```text
Contact Information       10
Standard Sections         15
Experience Structure      20
Skills Structure          15
Keyword Coverage          15
Formatting                10
Readability               10
Consistency                5
--------------------------------
Total                    100
```

## QA Coverage Score

Measures how well the resume represents QA competencies.

## Impact Score

Measures:

- Action-oriented language
- Technical specificity
- Clarity
- Conciseness
- Supported outcomes

## Content Quality

Measures:

- Grammar
- Structure
- Consistency
- Professional language

---

# 27. HTML Generation Rule

Never allow the LLM to directly control the complete HTML structure.

Use:

```text
Verified Resume JSON
       ↓
React Template
       ↓
Semantic HTML
       ↓
CSS
       ↓
Download
```

This provides deterministic rendering.

---

# 28. ATS-Friendly HTML

Use semantic elements:

```html
<h1>Candidate Name</h1>

<h2>Professional Summary</h2>

<h2>Professional Experience</h2>

<h3>QA Automation Engineer</h3>

<ul>
  <li>...</li>
</ul>

<h2>Technical Skills</h2>

<h2>Education</h2>
```

Requirements:

- Text selectable
- Semantic headings
- No image-only text
- Responsive
- Print-friendly
- Clean DOM
- Standard section names
- No unnecessary visual complexity

---

# 29. MVP Technology Stack

```text
Frontend
---------
Next.js
React
TypeScript
Tailwind CSS

UI
--
shadcn/ui

Validation
----------
Zod

Document Processing
-------------------
PDF parser
Mammoth / DOCX parser

AI
--
Vercel AI SDK
LLM Provider

Deployment
----------
Vercel

Repository
----------
GitHub
```

---

# 30. Project Structure

```text
qa-resume-ai/
│
├── README.md
├── task_plan.md
├── findings.md
├── progress.md
├── LLM.md
│
├── architecture/
│   ├── system.md
│   ├── resume-schema.md
│   ├── resume-parser.md
│   ├── rice-pot.md
│   ├── anti-hallucination.md
│   ├── qa-analysis.md
│   ├── scoring.md
│   └── html-generator.md
│
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   │   ├── ai/
│   │   ├── parser/
│   │   ├── scoring/
│   │   └── validation/
│   ├── schemas/
│   └── templates/
│
├── public/
│
└── .env.example
```

---

# 31. MVP User Interface

## Page 1 — Landing

```text
QA RESUME AI

From QA Experience
to Career-Ready Resume.

[ Upload My Resume ]
```

## Page 2 — Upload

```text
Drop your PDF or DOCX here

Supported:
✓ PDF
✓ DOCX

[ Analyze Resume ]
```

## Page 3 — Processing

```text
Analyzing your resume...

✓ Extracting content
✓ Identifying QA skills
✓ Detecting gaps
✓ Applying RICE-POT
✓ Validating AI output
✓ Calculating scores
✓ Preparing resume
```

## Page 4 — Dashboard

Show:

- ATS Score
- QA Coverage
- Impact Score
- Content Quality
- Strengths
- Gaps
- Recommendations
- Hallucination validation status

## Page 5 — Resume Preview

Show the generated HTML resume.

Buttons:

```text
[ Download HTML ]
[ Download ZIP ]
```

---

# 32. Demo "Wow Moment"

Use this sequence during judging:

### 1

Upload a real/sample QA resume.

### 2

Show extraction.

### 3

Show:

> **QA Profile Detected**

### 4

Display:

```text
ATS Score: 82
QA Coverage: 78
Impact Score: 71
```

### 5

Show a weak original statement:

> Worked on Selenium testing.

### 6

Show enhanced version:

> Performed Selenium-based UI automation testing to support regression validation.

### 7

Show:

> **Anti-Hallucination Check: PASS ✓**

### 8

Deliberately demonstrate an unsupported claim:

> "Reduced regression time by 60%."

Then show:

```text
⚠ UNSUPPORTED CLAIM

Metric not found in source resume.

Claim rejected.
```

### 9

Generate HTML.

### 10

Open the downloaded HTML.

This demonstrates **AI + QA + validation + practical output** in one flow.

---

# 33. What NOT to Build Today

Do not spend hackathon time on:

- Authentication
- Payments
- Database
- User profiles
- Multiple LLM providers
- LinkedIn API
- Job portal APIs
- RAG
- Vector database
- Cover letters
- Interview chatbot
- 10 templates
- Admin dashboard

Put these under **Future Roadmap**.

---

# 34. 12-Hour Execution Plan

## Phase 1 — Blueprint
**30 minutes**

- Create repository
- Create project files
- Finalize schema
- Finalize AI rules

## Phase 2 — UI
**1.5 hours**

- Landing
- Upload
- Dashboard
- Preview

## Phase 3 — Parsing
**1.5 hours**

- PDF
- DOCX
- Resume extraction

## Phase 4 — AI
**2 hours**

- RICE-POT
- Resume analysis
- Enhancement

## Phase 5 — Anti-Hallucination
**1.5 hours**

- Fact extraction
- Unknown detection
- Claim verification
- Self-validation

## Phase 6 — Scoring
**1 hour**

- ATS
- QA coverage
- Impact

## Phase 7 — HTML
**1 hour**

- Professional template
- Responsive CSS
- Download

## Phase 8 — Deployment
**1 hour**

- GitHub
- Vercel
- Environment variables
- Production testing

## Phase 9 — README + Demo
**1 hour**

- README
- Screenshots
- Demo scenario
- Final testing

## Final Buffer

Keep at least **30–60 minutes of buffer** before the deadline.

The hackathon rules explicitly prohibit commits or changes after the deadline.

---

# 35. Definition of Done

```text
[ ] PDF upload works
[ ] DOCX upload works
[ ] Text extraction works
[ ] Resume JSON generated
[ ] QA analysis works
[ ] RICE-POT implemented
[ ] Anti-Hallucination implemented
[ ] Verified facts extracted
[ ] Unknown information identified
[ ] Unsupported claims rejected
[ ] Self-validation works
[ ] ATS score works
[ ] QA coverage score works
[ ] Impact score works
[ ] HTML resume generated
[ ] Live preview works
[ ] HTML download works
[ ] GitHub repository accessible
[ ] Vercel deployment accessible
[ ] README complete
[ ] Screenshots added
[ ] Production testing complete
[ ] Final commit completed
[ ] No changes after deadline
```

---

# 36. README Structure

```text
# QA Resume AI

## Problem Statement

## Solution

## Key Features

## Why QA Resume AI?

## Architecture

## B.L.A.S.T. Framework

## RICE-POT AI Framework

## Anti-Hallucination Architecture

## QA Gap Detection

## ATS Scoring

## Technology Stack

## Project Structure

## Installation

## Environment Variables

## Running Locally

## Vercel Deployment

## Demo

## Screenshots

## Future Roadmap

## License
```

The hackathon specifically requires the README to explain the project title, problem, solution, technology stack, setup, demo and screenshots.

---

# 37. Final Judge Pitch

> **QA Resume AI is an evidence-grounded AI resume intelligence platform built specifically for QA professionals. Instead of simply asking an LLM to rewrite a resume, we first extract verified facts, identify missing information, analyze QA competencies, use the RICE-POT framework to control AI enhancement, and then run an Anti-Hallucination validation layer that rejects unsupported claims. The final verified resume is rendered deterministically into an ATS-friendly HTML format that users can download and use immediately.**

---

# 38. The Core Architecture in One Diagram

```text
                     QA RESUME AI
                          │
                          ▼
                 ┌─────────────────┐
                 │  PDF / DOCX     │
                 └────────┬────────┘
                          ▼
                 ┌─────────────────┐
                 │ FACT EXTRACTION │
                 └────────┬────────┘
                          ▼
                 ┌─────────────────┐
                 │  RESUME JSON    │
                 └────────┬────────┘
                          │
              ┌───────────┴───────────┐
              ▼                       ▼
       ┌─────────────┐        ┌──────────────┐
       │ QA ANALYSIS │        │  RICE-POT    │
       └──────┬──────┘        │ AI ENGINE    │
              │               └──────┬───────┘
              │                      │
              └──────────┬───────────┘
                         ▼
                ┌───────────────────┐
                │ ENHANCED RESUME   │
                └─────────┬─────────┘
                          ▼
                ┌───────────────────┐
                │ ANTI-HALLUCINATION│
                │ VALIDATOR         │
                └─────────┬─────────┘
                          │
                    ┌─────┴─────┐
                    │           │
                   PASS        FAIL
                    │           │
                    ▼           ▼
                Continue      Reject
                    │
                    ▼
             ┌──────────────┐
             │ ATS + QA     │
             │ SCORING      │
             └──────┬───────┘
                    ▼
             ┌──────────────┐
             │ HTML         │
             │ GENERATOR    │
             └──────┬───────┘
                    ▼
             ┌──────────────┐
             │ LIVE PREVIEW │
             └──────┬───────┘
                    ▼
             ┌──────────────┐
             │ DOWNLOAD     │
             └──────────────┘
```

---

# 39. Final Product Principle

## **AI can enhance the candidate's story, but it cannot create the candidate's story.**

The **resume is the source of truth**.

The **RICE-POT framework controls generation**.

The **Anti-Hallucination layer verifies claims**.

The **application deterministically renders the final HTML**.

The **B.L.A.S.T. framework controls the engineering process**.

That is the core concept that should be communicated to the judges.

---

# 40. Final MVP

### Build ONLY this:

**Upload → Extract → Analyze → Detect QA Gaps → Enhance → Anti-Hallucination Validate → Score → Generate HTML → Download**

If this complete flow works reliably on Vercel, you have a strong hackathon MVP that directly addresses the judging criteria of innovation, AI implementation, functionality, code quality, documentation and UI/UX.

# 41. Day / Night Mode

QA Resume AI must support a fully responsive Day / Night theme.

## User-facing terminology

The UI should present the theme switcher as:

☀️ Day Mode
🌙 Night Mode

Technical implementation:

Day Mode  → Light Theme
Night Mode → Dark Theme

## Theme Requirements

The theme switcher must be available globally across the application.

It should work consistently on:

- Landing Page
- Resume Upload
- Processing Screen
- Analysis Dashboard
- QA Skill Gap Analysis
- Resume Enhancement
- Resume Preview
- Settings / Controls
- Error states
- Modals
- Download interface

## Default Theme

On first visit:

1. Detect the user's system preference.
2. If the system prefers light → Day Mode.
3. If the system prefers dark → Night Mode.

After the user manually selects a theme:

- Persist the preference locally.
- Restore the selected theme on subsequent visits.

## Theme Toggle

Recommended UI:

[ ☀️ Day ] [ 🌙 Night ]

or a compact toggle:

☀️ ───── 🌙

The active mode must be visually obvious.

## Day Mode

Design characteristics:

- White / off-white background
- Dark text
- Clean professional cards
- Subtle borders
- High readability
- Professional SaaS appearance

## Night Mode

Design characteristics:

- Deep navy / slate background
- Light text
- Dark cards
- Subtle borders
- Teal / blue accent elements
- Reduced visual glare
- Professional developer / QA dashboard aesthetic

## Accessibility

Both themes must maintain:

- WCAG-friendly contrast
- Readable typography
- Visible focus states
- Accessible buttons
- Accessible form controls
- Keyboard navigation

## Important

Do NOT implement two completely different UI designs.

The same component system must support both themes.

Use semantic theme tokens such as:

--background
--foreground
--card
--card-foreground
--primary
--secondary
--muted
--border
--accent
--destructive

Components should consume theme variables rather than hard-coded colors.

## Resume Preview

The application UI theme and generated resume theme are separate concerns.

Changing:

Day Mode → Night Mode

must NOT unexpectedly change the downloaded resume.

The resume template should have its own controlled professional styling.

## Animation

Theme switching may use a subtle transition.

Avoid excessive animations because the application is primarily a professional productivity tool.