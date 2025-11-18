export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: JobType;
  industry: Industry;
  experienceLevel: ExperienceLevel;
  description: string;
  postedDate: string;
}

export type JobType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship"
  | "Freelance";
export type Industry =
  | "Technology"
  | "Finance"
  | "Healthcare"
  | "Education"
  | "Marketing"
  | "Design"
  | "Sales"
  | "Engineering";
export type ExperienceLevel =
  | "Entry Level"
  | "Mid Level"
  | "Senior Level"
  | "Lead"
  | "Executive";
