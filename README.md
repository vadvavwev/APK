# 职聘宝 - 求职招聘平台

一个基于 React + TypeScript + Tailwind CSS 开发的现代化求职招聘平台，支持打包成 Android APK。

## 功能特性

✅ **用户认证**
- 手机号注册登录
- 用户资料管理
- 简历管理（教育经历、工作经历）

✅ **职位管理**
- 职位浏览和搜索
- 多条件筛选（城市、学历等）
- 职位详情查看
- 职位收藏
- 简历投递

✅ **响应式设计**
- 完美适配移动端（小到320px）
- 平板和桌面端优化
- 移动端汉堡菜单
- 触摸友好的交互

✅ **移动应用**
- 支持打包成 Android APK
- 原生应用体验
- 离线访问能力

## 技术栈

- **前端框架**: React 18.3.1
- **类型检查**: TypeScript
- **构建工具**: Vite 6.3.5
- **样式方案**: Tailwind CSS 4.1.12
- **路由**: React Router 7.13.0
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **图标**: Lucide React
- **移动应用**: Capacitor 8.3.4
- **状态管理**: React Context API
- **数据持久化**: LocalStorage

## 项目结构

```
├── src/
│   ├── app/
│   │   ├── components/       # React 组件
│   │   │   ├── ui/          # shadcn/ui 组件
│   │   │   ├── Navbar.tsx   # 导航栏（含移动端菜单）
│   │   │   └── JobCard.tsx  # 职位卡片
│   │   ├── pages/           # 页面组件
│   │   │   ├── Login.tsx    # 登录页
│   │   │   ├── Register.tsx # 注册页
│   │   │   ├── Home.tsx     # 首页（职位列表）
│   │   │   ├── JobDetail.tsx # 职位详情
│   │   │   ├── Profile.tsx  # 个人资料
│   │   │   ├── Resume.tsx   # 简历管理
│   │   │   ├── Favorites.tsx # 收藏列表
│   │   │   └── Applications.tsx # 投递记录
│   │   ├── context/         # React Context
│   │   │   └── AuthContext.tsx # 用户认证上下文
│   │   ├── data/            # 模拟数据
│   │   │   └── mockData.ts
│   │   ├── types/           # TypeScript 类型定义
│   │   ├── routes.tsx       # 路由配置
│   │   └── App.tsx          # 应用根组件
│   ├── styles/              # 样式文件
│   │   ├── index.css        # 样式入口
│   │   ├── theme.css        # 主题变量
│   │   └── globals.css      # 全局样式（移动端优化）
│   └── main.tsx             # React 入口文件
├── index.html               # HTML 模板
├── capacitor.config.ts      # Capacitor 配置
├── vite.config.app.ts       # Vite 配置（APK 打包）
├── package.json             # 依赖和脚本
└── BUILD_APK_GUIDE.md       # APK 打包详细指南
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

访问 `http://localhost:5173`

### 构建 Web 应用

```bash
pnpm build
```

构建输出到 `dist/` 目录

### 预览构建结果

```bash
pnpm preview
```

## 打包成 Android APK

详细的打包指南请查看 [BUILD_APK_GUIDE.md](./BUILD_APK_GUIDE.md)

### 快速步骤

1. **安装前置软件**
   - JDK 17+
   - Android Studio
   - Android SDK

2. **添加 Android 平台**（首次）
   ```bash
   npx cap add android
   ```

3. **构建并同步**
   ```bash
   pnpm build:apk
   ```

4. **生成 APK**
   ```bash
   cd android
   ./gradlew assembleDebug
   ```

5. **APK 位置**
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

## 可用脚本

- `pnpm dev` - 启动开发服务器
- `pnpm build` - 构建生产版本
- `pnpm preview` - 预览构建结果
- `pnpm build:apk` - 构建并同步到 Android
- `pnpm cap:sync` - 同步 Web 资源到原生项目
- `pnpm cap:open:android` - 在 Android Studio 中打开项目

## 演示账号

登录时使用以下测试账号：

- **手机号**: 任意11位手机号（格式正确即可）
- **密码**: `123456`

注册时使用：

- **验证码**: `123456`

## 主要功能说明

### 1. 用户认证

- 支持手机号注册和登录
- 使用 Context API 管理登录状态
- LocalStorage 持久化用户信息
- 受保护路由自动跳转登录页

### 2. 职位浏览

- 首页展示职位列表
- 支持关键词搜索（职位名称、公司名称）
- 多条件筛选（城市、学历）
- 点击卡片查看详情

### 3. 职位详情

- 完整的职位信息展示
- 一键投递简历
- 收藏职位功能
- 招聘人员信息
- 移动端固定底部操作栏

### 4. 个人中心

- 编辑个人资料
- 期望职位和薪资设置
- 头像上传（待实现）

### 5. 简历管理

- 添加/编辑/删除教育经历
- 添加/编辑/删除工作经历
- 支持时间段选择

### 6. 收藏和投递

- 查看收藏的职位
- 查看投递记录
- 按状态筛选投递（待查看、已查看、面试邀请、不合适）

## 响应式断点

项目使用 Tailwind CSS 默认断点：

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 移动端优化

- 触摸目标最小 44px
- 输入框字体 16px（防止 iOS 自动缩放）
- 优化的点击反馈
- 防止横向滚动
- 平滑滚动
- 优化的字体渲染

## 浏览器兼容性

- Chrome/Edge (最新版)
- Firefox (最新版)
- Safari (最新版)
- 移动端浏览器

## 后续开发计划

- [ ] 集成真实后端 API
- [ ] 实现头像上传功能
- [ ] 添加即时通讯（聊天）
- [ ] 推送通知
- [ ] 地图定位
- [ ] 社交分享
- [ ] 深色模式
- [ ] 多语言支持

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

如有问题，请通过以下方式联系：

- 提交 GitHub Issue
- 发送邮件至：[your-email@example.com]
