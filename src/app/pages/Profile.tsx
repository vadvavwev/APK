import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { toast } from 'sonner';
import { User, MapPin, Briefcase, DollarSign, Camera } from 'lucide-react';

export function Profile() {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    desiredPosition: user?.desiredPosition || '',
    city: user?.city || '',
    expectedSalary: user?.expectedSalary || '',
  });

  if (!user) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast.error('请填写姓名');
      return;
    }

    updateUser({
      ...user,
      ...formData,
    });
    setEditing(false);
    toast.success('个人资料已更新');
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      desiredPosition: user.desiredPosition || '',
      city: user.city || '',
      expectedSalary: user.expectedSalary || '',
    });
    setEditing(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-6 max-w-3xl">
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">个人资料</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="flex flex-col items-center mb-4 sm:mb-6">
              <div className="relative">
                <Avatar className="size-20 sm:size-24">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-xl sm:text-2xl">{user.name?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute bottom-0 right-0 size-7 sm:size-8 rounded-full p-0"
                  onClick={() => toast.info('上传头像功能待实现')}
                >
                  <Camera className="size-3 sm:size-4" />
                </Button>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">{user.phone}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="name" className="text-sm sm:text-base">
                  <User className="size-3 sm:size-4 inline mr-2" />
                  姓名
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!editing}
                  placeholder="请输入姓名"
                  className="h-9 sm:h-10"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="position" className="text-sm sm:text-base">
                  <Briefcase className="size-3 sm:size-4 inline mr-2" />
                  期望职位
                </Label>
                <Input
                  id="position"
                  value={formData.desiredPosition}
                  onChange={(e) => setFormData({ ...formData, desiredPosition: e.target.value })}
                  disabled={!editing}
                  placeholder="例如：前端开发工程师"
                  className="h-9 sm:h-10"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="city" className="text-sm sm:text-base">
                  <MapPin className="size-3 sm:size-4 inline mr-2" />
                  工作城市
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  disabled={!editing}
                  placeholder="例如：北京"
                  className="h-9 sm:h-10"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="salary" className="text-sm sm:text-base">
                  <DollarSign className="size-3 sm:size-4 inline mr-2" />
                  期望薪资
                </Label>
                <Input
                  id="salary"
                  value={formData.expectedSalary}
                  onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                  disabled={!editing}
                  placeholder="例如：15k-25k"
                  className="h-9 sm:h-10"
                />
              </div>

              <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
                {editing ? (
                  <>
                    <Button type="submit" className="flex-1 h-9 sm:h-10">
                      保存
                    </Button>
                    <Button type="button" variant="outline" onClick={handleCancel} className="flex-1 h-9 sm:h-10">
                      取消
                    </Button>
                  </>
                ) : (
                  <Button type="button" onClick={() => setEditing(true)} className="w-full h-9 sm:h-10">
                    编辑资料
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
