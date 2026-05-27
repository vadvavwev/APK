import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { mockJobs } from '../data/mockData';
import { Building2, MapPin, Clock, FileText } from 'lucide-react';

interface ApplicationRecord {
  id: string;
  jobId: string;
  status: 'pending' | 'viewed' | 'interview' | 'rejected';
  appliedAt: string;
}

const statusConfig = {
  pending: { label: '待查看', color: 'bg-gray-100 text-gray-800' },
  viewed: { label: '已查看', color: 'bg-blue-100 text-blue-800' },
  interview: { label: '邀请面试', color: 'bg-green-100 text-green-800' },
  rejected: { label: '不合适', color: 'bg-red-100 text-red-800' },
};

export function Applications() {
  const navigate = useNavigate();
  
  // 模拟投递记录
  const [applications] = useState<ApplicationRecord[]>([
    { id: '1', jobId: '1', status: 'viewed', appliedAt: '2026-05-26 10:30' },
    { id: '2', jobId: '2', status: 'interview', appliedAt: '2026-05-25 14:20' },
    { id: '3', jobId: '4', status: 'pending', appliedAt: '2026-05-24 09:15' },
    { id: '4', jobId: '6', status: 'rejected', appliedAt: '2026-05-23 16:45' },
  ]);

  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredApplications = applications.filter(app => {
    if (activeTab === 'all') return true;
    return app.status === activeTab;
  });

  const applicationsWithJobs = filteredApplications.map(app => ({
    ...app,
    job: mockJobs.find(job => job.id === app.jobId)!,
  }));

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-6">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <FileText className="size-5 sm:size-6 text-blue-600" />
            投递记录
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">您共投递了 {applications.length} 个职位</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-2 sm:grid-cols-5 mb-4 sm:mb-6 h-auto">
            <TabsTrigger value="all" className="text-xs sm:text-sm py-2">
              全部<span className="hidden sm:inline ml-1">({applications.length})</span>
            </TabsTrigger>
            <TabsTrigger value="pending" className="text-xs sm:text-sm py-2">
              待查看<span className="hidden sm:inline ml-1">({applications.filter(a => a.status === 'pending').length})</span>
            </TabsTrigger>
            <TabsTrigger value="viewed" className="text-xs sm:text-sm py-2">
              已查看<span className="hidden sm:inline ml-1">({applications.filter(a => a.status === 'viewed').length})</span>
            </TabsTrigger>
            <TabsTrigger value="interview" className="text-xs sm:text-sm py-2 col-span-1">
              面试<span className="hidden sm:inline">邀请</span><span className="hidden sm:inline ml-1">({applications.filter(a => a.status === 'interview').length})</span>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="text-xs sm:text-sm py-2">
              不合适<span className="hidden sm:inline ml-1">({applications.filter(a => a.status === 'rejected').length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-3 sm:space-y-4">
            {applicationsWithJobs.length > 0 ? (
              applicationsWithJobs.map(({ id, job, status, appliedAt }) => (
                <Card
                  key={id}
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

                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                          <div className="flex items-center gap-1">
                            <Building2 className="size-3 sm:size-4 flex-shrink-0" />
                            <span className="truncate">{job.company}</span>
                          </div>
                          <div className="flex gap-3 sm:gap-4">
                            <div className="flex items-center gap-1">
                              <MapPin className="size-3 sm:size-4 flex-shrink-0" />
                              <span>{job.city}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="size-3 sm:size-4 flex-shrink-0" />
                              <span className="whitespace-nowrap">投递于 {appliedAt}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge className={`${statusConfig[status].color} text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5`}>
                            {statusConfig[status].label}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 sm:py-20 text-center p-4 sm:p-6">
                  <FileText className="size-12 sm:size-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                  <p className="text-base sm:text-lg text-gray-600">暂无投递记录</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
