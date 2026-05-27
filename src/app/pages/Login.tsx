import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { Briefcase } from 'lucide-react';

export function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone || !password) {
      toast.error('请填写完整信息');
      return;
    }

    if (!/^1[3-9]\d{9}$/.test(phone)) {
      toast.error('请输入正确的手机号');
      return;
    }

    setLoading(true);
    const success = await login(phone, password);
    setLoading(false);

    if (success) {
      toast.success('登录成功');
      navigate('/');
    } else {
      toast.error('手机号或密码错误');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-3 sm:p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center p-4 sm:p-6">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="size-14 sm:size-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Briefcase className="size-7 sm:size-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-xl sm:text-2xl">欢迎回来</CardTitle>
          <CardDescription className="text-sm sm:text-base">登录您的职聘宝账号</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="phone" className="text-sm sm:text-base">手机号</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="请输入手机号"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-10 sm:h-11"
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="password" className="text-sm sm:text-base">密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="请输入密码（演示用：123456）"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 sm:h-11"
              />
            </div>

            <Button type="submit" className="w-full h-10 sm:h-11" disabled={loading}>
              {loading ? '登录中...' : '登录'}
            </Button>

            <div className="text-center text-xs sm:text-sm text-gray-600">
              还没有账号？{' '}
              <Link to="/register" className="text-blue-600 hover:underline">
                立即注册
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
