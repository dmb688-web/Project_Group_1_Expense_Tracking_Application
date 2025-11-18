import { Job } from "../types/jobs";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, DollarSign, Briefcase, Calendar } from "lucide-react";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="mb-1">{job.title}</h3>
          <p className="text-muted-foreground">{job.company}</p>
        </div>
        <Badge variant="secondary">{job.jobType}</Badge>
      </div>

      <p className="text-muted-foreground mb-4">{job.description}</p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="size-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <DollarSign className="size-4" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Briefcase className="size-4" />
          <span>{job.industry}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="size-4" />
          <span>{new Date(job.postedDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Badge variant="outline">{job.experienceLevel}</Badge>
      </div>
    </Card>
  );
}
