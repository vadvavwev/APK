# 快速开始 - 打包 APK

如果您已经安装了所有必要的软件（JDK、Android Studio、Android SDK），按照以下步骤快速打包 APK。

## 一键打包流程

### 步骤 1: 克隆项目并安装依赖

```bash
# 安装依赖
pnpm install
```

### 步骤 2: 首次添加 Android 平台

```bash
# 添加 Android 平台（只需执行一次）
npx cap add android
```

这会创建 `android/` 文件夹。

### 步骤 3: 构建并生成 APK

```bash
# 构建 Web 应用并同步到 Android
pnpm build:apk

# 进入 Android 目录
cd android

# 生成调试版 APK
./gradlew assembleDebug

# 返回项目根目录
cd ..
```

### 步骤 4: 找到生成的 APK

APK 文件位置：
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## 安装到手机

### 方法 1: 使用 ADB（推荐）

1. 手机开启 USB 调试
2. USB 连接手机到电脑
3. 运行：

```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### 方法 2: 文件传输

1. 将 APK 文件传到手机
2. 在手机上点击安装
3. 允许"安装未知来源应用"

## 更新应用

修改代码后重新打包：

```bash
# 重新构建并同步
pnpm build:apk

# 重新生成 APK
cd android && ./gradlew assembleDebug && cd ..
```

## 常用命令速查

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 开发模式（Web） |
| `pnpm build` | 构建 Web 应用 |
| `pnpm build:apk` | 构建并同步到 Android |
| `npx cap add android` | 添加 Android 平台（首次） |
| `npx cap sync` | 同步 Web 资源到原生项目 |
| `npx cap open android` | 在 Android Studio 中打开 |
| `cd android && ./gradlew assembleDebug` | 生成调试版 APK |
| `cd android && ./gradlew assembleRelease` | 生成发布版 APK |

## 前置软件检查清单

运行这些命令检查是否已安装：

```bash
java -version        # 需要 Java 17+
android --version    # 需要 Android SDK
node --version       # 需要 Node.js 18+
pnpm --version       # 需要 pnpm
```

如果某个命令失败，请参考 [BUILD_APK_GUIDE.md](./BUILD_APK_GUIDE.md) 的"前置要求"部分。

## 故障排除

### 问题: `ANDROID_HOME` 未设置

**解决方案:**

**Windows:**
```cmd
setx ANDROID_HOME "%LOCALAPPDATA%\Android\Sdk"
```

**macOS/Linux:**
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
```

### 问题: Gradle 构建失败

**解决方案:**

```bash
cd android
./gradlew clean
./gradlew assembleDebug
cd ..
```

### 问题: 白屏或资源加载失败

**解决方案:**

```bash
# 确保先构建了 Web 应用
pnpm build

# 重新同步
npx cap sync android
```

## 修改应用信息

### 应用名称

编辑 `capacitor.config.ts`:

```typescript
appName: '你的应用名称',
```

### 应用 ID

编辑 `capacitor.config.ts`:

```typescript
appId: 'com.yourcompany.yourapp',
```

同时编辑 `android/app/build.gradle`:

```gradle
applicationId "com.yourcompany.yourapp"
```

### 版本号

编辑 `android/app/build.gradle`:

```gradle
versionCode 1        // 整数，每次发布递增
versionName "1.0.0"  // 版本字符串
```

## 生成发布版 APK

### 1. 生成签名密钥

```bash
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```

### 2. 配置签名

编辑 `android/app/build.gradle`，添加：

```gradle
android {
    signingConfigs {
        release {
            storeFile file('../../my-release-key.jks')
            storePassword 'your-password'
            keyAlias 'my-key-alias'
            keyPassword 'your-password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

### 3. 构建发布版

```bash
pnpm build:apk
cd android
./gradlew assembleRelease
cd ..
```

发布版 APK 位于：
```
android/app/build/outputs/apk/release/app-release.apk
```

## 下一步

- 📖 查看 [README.md](./README.md) 了解项目详情
- 📚 查看 [BUILD_APK_GUIDE.md](./BUILD_APK_GUIDE.md) 了解完整打包指南
- 🚀 开始开发您的应用功能
