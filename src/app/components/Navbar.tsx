import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Briefcase, Heart, FileText, User, LogOut, Menu, Home } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Briefcase className="size-6 text-blue-600" />
          <span className="font-bold text-xl">职聘宝</span>
        </Link>

        {user ? (
          <>
            {/* 桌面端导航 */}
            <div className="hidden md:flex items-center gap-2">
              <Link to="/">
                <Button variant="ghost" size="sm">首页</Button>
              </Link>
              <Link to="/favorites">
                <Button variant="ghost" size="sm">
                  <Heart className="size-4 mr-2" />
                  收藏
                </Button>
              </Link>
              <Link to="/applications">
                <Button variant="ghost" size="sm">
                  <FileText className="size-4 mr-2" />
                  投递记录
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Avatar className="size-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="size-4 mr-2" />
                    个人资料
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/resume')}>
                    <FileText className="size-4 mr-2" />
                    我的简历
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="size-4 mr-2" />
                    退出登录
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* 移动端汉堡菜单 */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Avatar className="size-12">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => handleNavigation('/')}
                  >
                    <Home className="size-5 mr-3" />
                    首页
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => handleNavigation('/favorites')}
                  >
                    <Heart className="size-5 mr-3" />
                    收藏
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => handleNavigation('/applications')}
                  >
                    <FileText className="size-5 mr-3" />
                    投递记录
                  </Button>
                  <div className="my-2 border-t" />
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => handleNavigation('/profile')}
                  >
                    <User className="size-5 mr-3" />
                    个人资料
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => handleNavigation('/resume')}
                  >
                    <FileText className="size-5 mr-3" />
                    我的简历
                  </Button>
                  <div className="my-2 border-t" />
                  <Button
                    variant="ghost"
                    className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="size-5 mr-3" />
                    退出登录
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">登录</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">注册</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
