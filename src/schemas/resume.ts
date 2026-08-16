import { z } from "zod";

export const PersonalSchema = z.object({
  name: z.string().default(""),
  email: z.string().default(""),
  phone: z.string().default(""),
  location: z.string().default(""),
  linkedin: z.string().default(""),
  github: z.string().default(""),
});

export const SkillsSchema = z.object({
  testing: z.array(z.string()).default([]),
  automation: z.array(z.string()).default([]),
  api: z.array(z.string()).default([]),
  performance: z.array(z.string()).default([]),
  programming: z.array(z.string()).default([]),
  devops: z.array(z.string()).default([]),
  databases: z.array(z.string()).default([]),
  ai: z.array(z.string()).default([]),
  tools: z.array(z.string()).default([]),
});

export const ExperienceSchema = z.object({
  company: z.string().default(""),
  role: z.string().default(""),
  location: z.string().default(""),
  startDate: z.string().default(""),
  endDate: z.string().default(""),
  responsibilities: z.array(z.string()).default([]),
  achievements: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
});

export const ProjectSchema = z.object({
  name: z.string().default(""),
  description: z.string().default(""),
  technologies: z.array(z.string()).default([]),
});

export const CertificationSchema = z.object({
  name: z.string().default(""),
  issuer: z.string().default(""),
  date: z.string().default(""),
});

export const EducationSchema = z.object({
  institution: z.string().default(""),
  degree: z.string().default(""),
  field: z.string().default(""),
  date: z.string().default(""),
});

export const AnalysisSchema = z.object({
  atsScore: z.number().default(0),
  qaCoverageScore: z.number().default(0),
  impactScore: z.number().default(0),
  contentQualityScore: z.number().default(0),
  strengths: z.array(z.string()).default([]),
  gaps: z.array(z.string()).default([]),
  recommendations: z.array(z.string()).default([]),
});

export const VerificationSchema = z.object({
  verifiedFacts: z.array(z.string()).default([]),
  unknownInformation: z.array(z.string()).default([]),
  unsupportedClaims: z.array(z.string()).default([]),
  validationStatus: z.enum(["PASS", "FAIL"]).default("PASS"),
});

export const ResumeSchema = z.object({
  personal: PersonalSchema,
  summary: z.string().default(""),
  skills: SkillsSchema,
  experience: z.array(ExperienceSchema).default([]),
  projects: z.array(ProjectSchema).default([]),
  certifications: z.array(CertificationSchema).default([]),
  education: z.array(EducationSchema).default([]),
  awards: z.array(z.string()).default([]),
  analysis: AnalysisSchema,
  verification: VerificationSchema,
});

export type Personal = z.infer<typeof PersonalSchema>;
export type Skills = z.infer<typeof SkillsSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Certification = z.infer<typeof CertificationSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Analysis = z.infer<typeof AnalysisSchema>;
export type Verification = z.infer<typeof VerificationSchema>;
export type Resume = z.infer<typeof ResumeSchema>;

/** LLM extraction output: raw facts pulled from the source resume only. No enhancement, no scoring. */
export const ExtractedFactsSchema = z.object({
  personal: PersonalSchema,
  summary: z.string().default(""),
  skills: SkillsSchema,
  experience: z.array(ExperienceSchema).default([]),
  projects: z.array(ProjectSchema).default([]),
  certifications: z.array(CertificationSchema).default([]),
  education: z.array(EducationSchema).default([]),
  awards: z.array(z.string()).default([]),
  verifiedFacts: z.array(z.string()).default([]),
  unknownInformation: z.array(z.string()).default([]),
});
export type ExtractedFacts = z.infer<typeof ExtractedFactsSchema>;

/** LLM enhancement output: rewritten wording only, same schema shape as facts. */
export const EnhancedContentSchema = z.object({
  summary: z.string().default(""),
  experience: z
    .array(
      z.object({
        responsibilities: z.array(z.string()).default([]),
        achievements: z.array(z.string()).default([]),
      }),
    )
    .default([]),
  generatedClaims: z.array(z.string()).default([]),
});
export type EnhancedContent = z.infer<typeof EnhancedContentSchema>;
