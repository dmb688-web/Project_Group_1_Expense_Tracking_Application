import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { X } from "lucide-react";
import { JobType, Industry, ExperienceLevel } from "../types/jobs";

interface JobFiltersProps {
  selectedJobTypes: JobType[];
  selectedIndustries: Industry[];
  experienceLevelRange: [number, number];
  onJobTypeToggle: (jobType: JobType) => void;
  onIndustryToggle: (industry: Industry) => void;
  onExperienceLevelChange: (range: [number, number]) => void;
  onClearAll: () => void;
}

const jobTypes: JobType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Freelance",
];
const industries: Industry[] = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Marketing",
  "Design",
  "Sales",
  "Engineering",
];
const experienceLevels: ExperienceLevel[] = [
  "Entry Level",
  "Mid Level",
  "Senior Level",
  "Lead",
  "Executive",
];

export function JobFilters({
  selectedJobTypes,
  selectedIndustries,
  experienceLevelRange,
  onJobTypeToggle,
  onIndustryToggle,
  onExperienceLevelChange,
  onClearAll,
}: JobFiltersProps) {
  const hasActiveFilters =
    selectedJobTypes.length > 0 ||
    selectedIndustries.length > 0 ||
    experienceLevelRange[0] !== 0 ||
    experienceLevelRange[1] !== 4;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2>Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedJobTypes.map((type) => (
            <Badge key={type} variant="default" className="gap-1">
              {type}
              <button
                onClick={() => onJobTypeToggle(type)}
                className="hover:bg-background/20 rounded-full"
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
          {selectedIndustries.map((industry) => (
            <Badge key={industry} variant="default" className="gap-1">
              {industry}
              <button
                onClick={() => onIndustryToggle(industry)}
                className="hover:bg-background/20 rounded-full"
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
          {(experienceLevelRange[0] !== 0 || experienceLevelRange[1] !== 4) && (
            <Badge variant="default">
              {experienceLevels[experienceLevelRange[0]]} -{" "}
              {experienceLevels[experienceLevelRange[1]]}
            </Badge>
          )}
        </div>
      )}

      <Card className="p-4">
        <h3 className="mb-4">Job Type</h3>
        <div className="space-y-3">
          {jobTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`jobtype-${type}`}
                checked={selectedJobTypes.includes(type)}
                onCheckedChange={() => onJobTypeToggle(type)}
              />
              <Label htmlFor={`jobtype-${type}`} className="cursor-pointer">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="mb-4">Industry</h3>
        <div className="space-y-3">
          {industries.map((industry) => (
            <div key={industry} className="flex items-center space-x-2">
              <Checkbox
                id={`industry-${industry}`}
                checked={selectedIndustries.includes(industry)}
                onCheckedChange={() => onIndustryToggle(industry)}
              />
              <Label
                htmlFor={`industry-${industry}`}
                className="cursor-pointer"
              >
                {industry}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="mb-4">Experience Level</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-muted-foreground">
            <span>{experienceLevels[experienceLevelRange[0]]}</span>
            <span>{experienceLevels[experienceLevelRange[1]]}</span>
          </div>
          <Slider
            min={0}
            max={4}
            step={1}
            value={experienceLevelRange}
            onValueChange={(value) =>
              onExperienceLevelChange(value as [number, number])
            }
            className="w-full"
          />
          <div className="flex justify-between text-muted-foreground">
            {experienceLevels.map((level, index) => (
              <div
                key={level}
                className="flex flex-col items-center"
                style={{ width: "20%" }}
              >
                <div className="h-2 w-px bg-border" />
                <span className="text-xs text-center mt-1">{level}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
