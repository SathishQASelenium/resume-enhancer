/**
 * QA skill taxonomy — ANALYSIS ONLY (blueprint §24).
 * Never write a taxonomy entry into the candidate's resume automatically.
 */
export type TaxonomyCategory = {
  key: string;
  label: string;
  skills: string[];
};

export const QA_TAXONOMY: TaxonomyCategory[] = [
  {
    key: "testing",
    label: "Testing",
    skills: [
      "Manual Testing",
      "Functional Testing",
      "Regression Testing",
      "Integration Testing",
      "System Testing",
      "UAT",
      "Exploratory Testing",
      "Smoke Testing",
      "Test Case Design",
      "Test Planning",
    ],
  },
  {
    key: "automation",
    label: "Automation",
    skills: [
      "Selenium",
      "Playwright",
      "Cypress",
      "WebDriver",
      "Page Object Model",
      "TestNG",
      "JUnit",
      "Appium",
    ],
  },
  {
    key: "api",
    label: "API",
    skills: ["REST API", "Postman", "REST Assured", "API Automation", "SoapUI", "GraphQL Testing"],
  },
  {
    key: "performance",
    label: "Performance",
    skills: ["JMeter", "Load Testing", "Performance Testing", "Gatling", "LoadRunner", "Stress Testing"],
  },
  {
    key: "programming",
    label: "Programming",
    skills: ["Java", "JavaScript", "TypeScript", "Python", "SQL", "C#"],
  },
  {
    key: "cicd",
    label: "CI/CD",
    skills: ["Jenkins", "GitHub Actions", "Azure DevOps", "GitLab CI/CD", "CircleCI", "Bamboo"],
  },
  {
    key: "cloud",
    label: "Cloud",
    skills: ["AWS", "Azure", "GCP"],
  },
  {
    key: "modern-qa",
    label: "Modern QA",
    skills: ["AI Testing", "LLM Testing", "RAG Testing", "Prompt Testing", "AI-assisted Testing"],
  },
];

export const ALL_TAXONOMY_SKILLS = QA_TAXONOMY.flatMap((c) => c.skills);

const CATEGORY_TO_SKILLS_BUCKET: Record<string, string> = {
  testing: "testing",
  automation: "automation",
  api: "api",
  performance: "performance",
  programming: "programming",
  cicd: "devops",
  cloud: "devops",
  "modern-qa": "ai",
};

/**
 * Best-effort deterministic bucketing of a flat skill list into the Resume
 * JSON skills categories, used as a defensive fallback when an LLM returns
 * skills as a flat array instead of the required categorized object. This
 * only relabels skills the model already extracted from the source resume —
 * it never adds a skill that wasn't already present.
 */
export function categorizeSkillList(skills: string[]): Record<string, string[]> {
  const buckets: Record<string, string[]> = {
    testing: [],
    automation: [],
    api: [],
    performance: [],
    programming: [],
    devops: [],
    databases: [],
    ai: [],
    tools: [],
  };

  for (const skill of skills) {
    const category = QA_TAXONOMY.find((c) => c.skills.some((s) => s.toLowerCase() === skill.toLowerCase()));
    const bucket = category ? CATEGORY_TO_SKILLS_BUCKET[category.key] : undefined;
    buckets[bucket ?? "tools"].push(skill);
  }

  return buckets;
}
