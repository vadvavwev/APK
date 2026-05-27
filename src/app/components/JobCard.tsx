import { useNavigate } from 'react-router';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Building2, MapPin, GraduationCap, Eye } from 'lucide-react';
import type { Job } from '../types';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(`/job/${job.id}`)}
    >
      <CardContent className="p-3 sm:p-4">
        <div className="flex gap-3 sm:gap-4">
          <img
            src={job.companyLogo}
            alt={job.company}
            className="size-12 sm:size-16 rounded object-cover flex-shrink-0"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-base sm:text-lg truncate">{job.title}</h3>
              <span className="text-red-600 font-bold text-base sm:text-lg flex-shrink-0 whitespace-nowrap">{job.salary}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Building2 className="size-3 sm:size-4 flex-shrink-0" />
                <span className="truncate">{job.company}</span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-1">
                  <MapPin className="size-3 sm:size-4 flex-shrink-0" />
                  <span>{job.city}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GraduationCap className="size-3 sm:size-4 flex-shrink-0" />
                  <span>{job.education}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-1 sm:gap-2 flex-wrap">
                {job.benefits.slice(0, 3).map((benefit, index) => (
                  <Badge key={index} variant="secondary" className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5">
                    {benefit}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500 flex-shrink-0">
                <Eye className="size-3" />
                <span>{job.views}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
