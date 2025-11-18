import { useState, useMemo } from "react";
import { JobCard } from "./components/JobCard";
import { JobFilters } from "./components/JobFilters";
import { jobsDatabase } from "./data/jobs";
import { JobType, Industry, ExperienceLevel } from "./types/jobs";

export default function App() {
  const [selectedJobTypes, setSelectedJobTypes] = useState<JobType[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<Industry[]>([]);
  const [experienceLevelRange, setExperienceLevelRange] = useState<
    [number, number]
  >([0, 4]);

  const handleJobTypeToggle = (jobType: JobType) => {
    setSelectedJobTypes((prev) =>
      prev.includes(jobType)
        ? prev.filter((type) => type !== jobType)
        : [...prev, jobType]
    );
  };

  const handleIndustryToggle = (industry: Industry) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((ind) => ind !== industry)
        : [...prev, industry]
    );
  };

  const handleExperienceLevelChange = (range: [number, number]) => {
    setExperienceLevelRange(range);
  };

  const handleClearAll = () => {
    setSelectedJobTypes([]);
    setSelectedIndustries([]);
    setExperienceLevelRange([0, 4]);
  };

  const filteredJobs = useMemo(() => {
    const experienceLevels: ExperienceLevel[] = [
      "Entry Level",
      "Mid Level",
      "Senior Level",
      "Lead",
      "Executive",
    ];
    const allowedExperienceLevels = experienceLevels.slice(
      experienceLevelRange[0],
      experienceLevelRange[1] + 1
    );

    return jobsDatabase.filter((job) => {
      // Job Type filter
      if (
        selectedJobTypes.length > 0 &&
        !selectedJobTypes.includes(job.jobType)
      ) {
        return false;
      }

      // Industry filter
      if (
        selectedIndustries.length > 0 &&
        !selectedIndustries.includes(job.industry)
      ) {
        return false;
      }

      // Experience Level filter
      if (!allowedExperienceLevels.includes(job.experienceLevel)) {
        return false;
      }

      return true;
    });
  }, [selectedJobTypes, selectedIndustries, experienceLevelRange]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2">Find Your Dream Job</h1>
          <p className="text-muted-foreground">
            Browse through {jobsDatabase.length} available positions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <JobFilters
              selectedJobTypes={selectedJobTypes}
              selectedIndustries={selectedIndustries}
              experienceLevelRange={experienceLevelRange}
              onJobTypeToggle={handleJobTypeToggle}
              onIndustryToggle={handleIndustryToggle}
              onExperienceLevelChange={handleExperienceLevelChange}
              onClearAll={handleClearAll}
            />
          </aside>

          <main className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-muted-foreground">
                {filteredJobs.length}{" "}
                {filteredJobs.length === 1 ? "job" : "jobs"} found
              </p>
            </div>

            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No jobs found matching your criteria. Try adjusting your
                    filters.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
