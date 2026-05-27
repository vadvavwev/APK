import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { toast } from 'sonner';
import { mockJobs } from '../data/mockData';
import { Building2, MapPin, GraduationCap, Eye, Heart, Send, ArrowLeft } from 'lucide-react';

export function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const job = mockJobs.find(j => j.id === id);

  const [isFavorited, setIsFavorited] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-lg text-gray-600">职位不存在</p>
        <Button onClick={() => navigate('/')} className="mt-4">返回首页</Button>
      </div>
    );
  }

  const handleFavorite = () => {
    if (!user) {
      toast.error('请先登录');
      navigate('/login');
      return;
    }
    setIsFavorited(!isFavorited);
    toast.success(isFavorited ? '已取消收藏' : '已添加收藏');
  };

  const handleApply = () => {
    if (!user) {
      toast.error('请先登录');
      navigate('/login');
      return;
    }
    if (isApplied) {
      toast.warning('您已投递过该职位');
      return;
    }
    setIsApplied(true);
    toast.success('简历投递成功！');
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20 sm:pb-6">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-6 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-3 sm:mb-4"
          size="sm"
        >
          <ArrowLeft className="size-4 mr-2" />
          返回
        </Button>

        {/* 职位基本信息 */}
        <Card className="mb-3 sm:mb-4">
          <CardContent className="p-4 sm:p-6">
            <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-6">
              <img
                src={job.companyLogo}
                alt={job.company}
                className="size-14 sm:size-20 rounded object-cover flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="mb-2">
                  <h1 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">{job.title}</h1>
                  <span className="text-red-600 font-bold text-xl sm:text-2xl">{job.salary}</span>
                </div>

                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-6 text-xs sm:text-base text-gray-600 mb-3 sm:mb-4">
                  <div className="flex items-center gap-1">
                    <Building2 className="size-3 sm:size-4 flex-shrink-0" />
                    <span className="truncate">{job.company}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="size-3 sm:size-4 flex-shrink-0" />
                    <span>{job.city}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GraduationCap className="size-3 sm:size-4 flex-shrink-0" />
                    <span>{job.education}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="size-3 sm:size-4 flex-shrink-0" />
                    <span>{job.views}人浏览</span>
                  </div>
                </div>

                <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                  {job.benefits.map((benefit, index) => (
                    <Badge key={index} variant="secondary" className="text-[10px] sm:text-sm px-1.5 sm:px-2.5">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3">
              <Button
                className="flex-1 h-10 sm:h-11"
                onClick={handleApply}
                disabled={isApplied}
              >
                <Send className="size-4 mr-2" />
                {isApplied ? '已投递' : '立即投递'}
              </Button>
              <Button
                variant="outline"
                onClick={handleFavorite}
                className="h-10 sm:h-11 px-3 sm:px-4"
              >
                <Heart className={`size-4 sm:size-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 职位详情 */}
        <Card className="mb-3 sm:mb-4">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">职位描述</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{job.description}</p>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">任职要求</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5 sm:mt-1">•</span>
                    <span className="text-gray-700 text-sm sm:text-base">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* HR信息 */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">招聘人信息</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="flex items-center gap-3 sm:gap-4">
              <Avatar className="size-10 sm:size-12">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" />
                <AvatarFallback>{job.hrName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm sm:text-base">{job.hrName}</p>
                <p className="text-xs sm:text-sm text-gray-600">{job.hrPosition}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 移动端固定底部操作栏 */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-3 shadow-lg z-40">
        <div className="flex gap-2">
          <Button
            className="flex-1"
            onClick={handleApply}
            disabled={isApplied}
          >
            <Send className="size-4 mr-2" />
            {isApplied ? '已投递' : '立即投递'}
          </Button>
          <Button
            variant="outline"
            onClick={handleFavorite}
            className="px-4"
          >
            <Heart className={`size-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>
      </div>
    </div>
  );
}
