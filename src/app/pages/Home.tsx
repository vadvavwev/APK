import { useState, useMemo } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { JobCard } from '../components/JobCard';
import { mockJobs } from '../data/mockData';
import { Search, Filter } from 'lucide-react';
import type { JobFilters } from '../types';

export function Home() {
  const [filters, setFilters] = useState<JobFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase();
        if (!job.title.toLowerCase().includes(keyword) && 
            !job.company.toLowerCase().includes(keyword)) {
          return false;
        }
      }
      if (filters.city && job.city !== filters.city) return false;
      if (filters.education && job.education !== filters.education) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 搜索栏 */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-6">
          <div className="flex gap-2 sm:gap-4 flex-wrap">
            <div className="flex-1 min-w-0 w-full sm:w-auto sm:min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  placeholder="搜索职位名称或公司"
                  className="pl-10 h-10"
                  value={filters.keyword || ''}
                  onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2 flex-1 sm:flex-none h-10"
                size="sm"
              >
                <Filter className="size-4" />
                <span className="hidden sm:inline">筛选</span>
              </Button>

              <Button
                onClick={() => setFilters({ keyword: filters.keyword })}
                className="flex-1 sm:flex-none h-10"
                size="sm"
              >
                搜索
              </Button>
            </div>
          </div>

          {/* 筛选面板 */}
          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 block">工作城市</label>
                <Select value={filters.city} onValueChange={(value) => setFilters({ ...filters, city: value })}>
                  <SelectTrigger className="h-9 sm:h-10">
                    <SelectValue placeholder="选择城市" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部城市</SelectItem>
                    <SelectItem value="北京">北京</SelectItem>
                    <SelectItem value="上海">上海</SelectItem>
                    <SelectItem value="深圳">深圳</SelectItem>
                    <SelectItem value="杭州">杭州</SelectItem>
                    <SelectItem value="广州">广州</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 block">学历要求</label>
                <Select value={filters.education} onValueChange={(value) => setFilters({ ...filters, education: value })}>
                  <SelectTrigger className="h-9 sm:h-10">
                    <SelectValue placeholder="选择学历" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">不限</SelectItem>
                    <SelectItem value="大专">大专</SelectItem>
                    <SelectItem value="本科">本科</SelectItem>
                    <SelectItem value="硕士">硕士</SelectItem>
                    <SelectItem value="博士">博士</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end sm:col-span-2 md:col-span-1">
                <Button
                  variant="outline"
                  className="w-full h-9 sm:h-10"
                  size="sm"
                  onClick={() => setFilters({})}
                >
                  清空筛选
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 职位列表 */}
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-6">
        <div className="mb-3 sm:mb-4 flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-semibold">
            为您推荐 <span className="text-gray-500 text-sm sm:text-base">({filteredJobs.length}个职位)</span>
          </h2>
        </div>

        <div className="grid gap-3 sm:gap-4">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12 sm:py-20 text-gray-500">
            <p className="text-base sm:text-lg">暂无符合条件的职位</p>
            <p className="text-xs sm:text-sm mt-2">试试调整筛选条件</p>
          </div>
        )}
      </div>
    </div>
  );
}
