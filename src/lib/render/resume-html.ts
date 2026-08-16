import type { Resume } from "@/schemas/resume";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function listItems(items: string[]): string {
  return items.map((i) => `<li>${esc(i)}</li>`).join("\n");
}

const SKILL_CATEGORY_LABELS: Record<string, string> = {
  testing: "Testing",
  automation: "Automation",
  api: "API",
  performance: "Performance",
  programming: "Programming",
  devops: "DevOps / CI-CD",
  databases: "Databases",
  ai: "AI / Modern QA",
  tools: "Tools",
};

/**
 * Deterministic ATS-friendly HTML renderer (blueprint §27–28).
 * The LLM never generates this markup directly — it only ever supplies the
 * verified, validated Resume JSON that this template renders.
 * Styling here is intentionally independent of the app's Day/Night theme.
 */
export function renderResumeHtml(resume: Resume): string {
  const { personal, summary, skills, experience, projects, certifications, education, awards } = resume;

  const contactLine = [personal.location, personal.email, personal.phone, personal.linkedin, personal.github]
    .filter(Boolean)
    .map(esc)
    .join(" &nbsp;|&nbsp; ");

  const skillsHtml = Object.entries(skills)
    .filter(([, values]) => values.length > 0)
    .map(
      ([key, values]) => `
      <div class="skill-group">
        <span class="skill-label">${esc(SKILL_CATEGORY_LABELS[key] ?? key)}:</span>
        <span class="skill-values">${values.map(esc).join(", ")}</span>
      </div>`,
    )
    .join("\n");

  const experienceHtml = experience
    .map(
      (job) => `
      <article class="job">
        <h3>${esc(job.role)}${job.company ? ` <span class="company">— ${esc(job.company)}</span>` : ""}</h3>
        <p class="meta">${[job.location, [job.startDate, job.endDate].filter(Boolean).join(" – ")]
          .filter(Boolean)
          .map(esc)
          .join(" &nbsp;|&nbsp; ")}</p>
        ${job.responsibilities.length ? `<ul>${listItems(job.responsibilities)}</ul>` : ""}
        ${job.achievements.length ? `<ul class="achievements">${listItems(job.achievements)}</ul>` : ""}
        ${job.technologies.length ? `<p class="tech"><em>Technologies:</em> ${job.technologies.map(esc).join(", ")}</p>` : ""}
      </article>`,
    )
    .join("\n");

  const projectsHtml = projects
    .map(
      (p) => `
      <article class="project">
        <h3>${esc(p.name)}</h3>
        ${p.description ? `<p>${esc(p.description)}</p>` : ""}
        ${p.technologies.length ? `<p class="tech"><em>Technologies:</em> ${p.technologies.map(esc).join(", ")}</p>` : ""}
      </article>`,
    )
    .join("\n");

  const certificationsHtml = certifications
    .map((c) => `<li>${esc(c.name)}${c.issuer ? ` — ${esc(c.issuer)}` : ""}${c.date ? ` (${esc(c.date)})` : ""}</li>`)
    .join("\n");

  const educationHtml = education
    .map(
      (e) =>
        `<li>${esc(e.degree)}${e.field ? `, ${esc(e.field)}` : ""}${e.institution ? ` — ${esc(e.institution)}` : ""}${e.date ? ` (${esc(e.date)})` : ""}</li>`,
    )
    .join("\n");

  const awardsHtml = awards.map((a) => `<li>${esc(a)}</li>`).join("\n");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(personal.name || "Resume")}</title>
<style>
  :root {
    --ink: #1a2330;
    --muted: #5b6675;
    --accent: #0f6d6d;
    --border: #d9dee4;
    --bg: #ffffff;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: var(--bg);
    color: var(--ink);
    font-family: "Segoe UI", Arial, Helvetica, sans-serif;
    line-height: 1.5;
  }
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 2.5rem 2rem;
  }
  h1 { font-size: 1.9rem; margin: 0 0 0.25rem; letter-spacing: 0.01em; }
  .contact { color: var(--muted); font-size: 0.92rem; margin: 0 0 1.5rem; }
  h2 {
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent);
    border-bottom: 1.5px solid var(--border);
    padding-bottom: 0.3rem;
    margin: 1.75rem 0 0.75rem;
  }
  h2:first-of-type { margin-top: 0; }
  h3 { font-size: 1.05rem; margin: 0 0 0.15rem; }
  .company { font-weight: 400; color: var(--muted); }
  .meta { color: var(--muted); font-size: 0.85rem; margin: 0 0 0.4rem; }
  .tech { font-size: 0.85rem; color: var(--muted); margin: 0.3rem 0 0; }
  ul { margin: 0.3rem 0 0.75rem; padding-left: 1.2rem; }
  li { margin-bottom: 0.25rem; }
  .job, .project { margin-bottom: 1.25rem; }
  .summary { margin: 0; }
  .skills { display: flex; flex-direction: column; gap: 0.35rem; }
  .skill-label { font-weight: 600; margin-right: 0.4rem; }
  .skill-values { color: var(--ink); }
  @media print {
    main { padding: 0.5rem 0; }
    a { color: inherit; text-decoration: none; }
  }
</style>
</head>
<body>
  <main>
    <h1>${esc(personal.name || "Candidate Name")}</h1>
    ${contactLine ? `<p class="contact">${contactLine}</p>` : ""}

    ${summary ? `<h2>Professional Summary</h2><p class="summary">${esc(summary)}</p>` : ""}

    ${experienceHtml ? `<h2>Professional Experience</h2>${experienceHtml}` : ""}

    ${skillsHtml ? `<h2>Technical Skills</h2><div class="skills">${skillsHtml}</div>` : ""}

    ${projectsHtml ? `<h2>Projects</h2>${projectsHtml}` : ""}

    ${certificationsHtml ? `<h2>Certifications</h2><ul>${certificationsHtml}</ul>` : ""}

    ${awardsHtml ? `<h2>Achievements</h2><ul>${awardsHtml}</ul>` : ""}

    ${educationHtml ? `<h2>Education</h2><ul>${educationHtml}</ul>` : ""}
  </main>
</body>
</html>`;
}
