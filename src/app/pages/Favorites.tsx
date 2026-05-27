import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { mockJobs } from '../data/mockData';
import { Building2, MapPin, GraduationCap, Trash2, Heart } from 'lucide-react';

export function Favorites() {
  const navigate = useNavigate();
  // 模拟收藏的职位ID列表
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['1', '3', '5']);

  const favoriteJobs = mockJobs.filter(job => favoriteIds.includes(job.id));

  const handleRemove = (jobId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoriteIds(favoriteIds.filter(id => id !== jobId));
    toast.success('已取消收藏');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-6">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Heart className="size-5 sm:size-6 text-red-500" />
            我的收藏
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">您收藏了 {favoriteJobs.length} 个职位</p>
        </div>

        {favoriteJobs.length > 0 ? (
          <div className="grid gap-3 sm:gap-4">
            {favoriteJobs.map(job => (
              <Card
                key={job.id}
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
                          <Building2 className="size-3 sm:size-4" />
                          <span className="truncate">{job.company}</span>
                        </div>
                        <div className="flex gap-3 sm:gap-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="size-3 sm:size-4" />
                            <span>{job.city}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GraduationCap className="size-3 sm:size-4" />
                            <span>{job.education}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                          {job.benefits.slice(0, 3).map((benefit, index) => (
                            <Badge key={index} variant="secondary" className="text-[10px] sm:text-xs px-1.5 sm:px-2">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => handleRemove(job.id, e)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 text-xs sm:text-sm self-start sm:self-auto"
                        >
                          <Trash2 className="size-3 sm:size-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">取消收藏</span>
                          <span className="sm:hidden">取消</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 sm:py-20 text-center p-4 sm:p-6">
              <Heart className="size-12 sm:size-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
              <p className="text-base sm:text-lg text-gray-600 mb-1 sm:mb-2">暂无收藏职位</p>
              <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">去首页看看心仪的职位吧</p>
              <Button onClick={() => navigate('/')} size="sm" className="sm:h-10">
                浏览职位
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
