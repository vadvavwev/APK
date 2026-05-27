# Android APK 打包指南

本指南将帮助您将职聘宝Web应用打包成Android APK文件。

## 前置要求

### 1. 安装必要软件

#### Java Development Kit (JDK)
- 下载并安装 **JDK 17** 或更高版本
- 推荐使用 [Azul Zulu OpenJDK](https://www.azul.com/downloads/?package=jdk)
- 设置 `JAVA_HOME` 环境变量

**Windows:**
```cmd
setx JAVA_HOME "C:\Program Files\Zulu\zulu-17"
setx PATH "%PATH%;%JAVA_HOME%\bin"
```

**macOS/Linux:**
```bash
export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
export PATH=$PATH:$JAVA_HOME/bin
```

#### Android Studio
1. 下载并安装 [Android Studio](https://developer.android.com/studio)
2. 打开 Android Studio，进入 **Tools > SDK Manager**
3. 安装以下组件：
   - Android SDK Platform (推荐 API 34 或更高)
   - Android SDK Build-Tools
   - Android SDK Command-line Tools
   - Android SDK Platform-Tools

4. 设置环境变量：

**Windows:**
```cmd
setx ANDROID_HOME "%LOCALAPPDATA%\Android\Sdk"
setx PATH "%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools"
```

**macOS/Linux:**
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools
```

#### Node.js 和 pnpm
- Node.js 18 或更高版本
- pnpm（已安装）

### 2. 验证安装

打开终端/命令提示符，运行以下命令验证：

```bash
java -version        # 应显示 Java 17+
android --version    # 应显示 Android SDK 版本
node --version       # 应显示 Node.js 版本
pnpm --version       # 应显示 pnpm 版本
```

## 打包步骤

### 步骤 1: 安装依赖

```bash
pnpm install
```

### 步骤 2: 添加 Android 平台

首次打包需要添加 Android 平台（只需执行一次）：

```bash
npx cap add android
```

此命令会在项目根目录创建 `android/` 文件夹，包含完整的 Android 项目。

### 步骤 3: 构建 Web 应用并同步

```bash
pnpm build:apk
```

这个命令会：
1. 构建 Web 应用到 `dist/` 目录
2. 将构建的文件同步到 `android/app/src/main/assets/public/`

### 步骤 4: 生成 APK

有两种方法生成 APK：

#### 方法 A: 使用 Android Studio（推荐）

1. 打开 Android Studio
2. 选择 **File > Open**，打开项目中的 `android` 文件夹
3. 等待 Gradle 同步完成
4. 选择 **Build > Build Bundle(s) / APK(s) > Build APK(s)**
5. 构建完成后，APK 文件位于：
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

#### 方法 B: 使用命令行

```bash
cd android
./gradlew assembleDebug
cd ..
```

生成的 APK 文件位于：
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## 生成签名的发布版 APK

开发版 APK 不能上传到 Google Play。要生成发布版 APK：

### 1. 生成签名密钥

```bash
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```

按提示输入密码和信息。**务必保存好密钥文件和密码！**

### 2. 配置签名

编辑 `android/app/build.gradle`，在 `android {}` 块中添加：

```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file('../../my-release-key.jks')
            storePassword 'your-keystore-password'
            keyAlias 'my-key-alias'
            keyPassword 'your-key-password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### 3. 构建发布版 APK

```bash
cd android
./gradlew assembleRelease
cd ..
```

发布版 APK 位于：
```
android/app/build/outputs/apk/release/app-release.apk
```

## 更新应用

当您修改了前端代码后：

```bash
# 1. 重新构建并同步
pnpm build:apk

# 2. 重新生成 APK
cd android
./gradlew assembleDebug  # 或 assembleRelease
cd ..
```

## 修改应用信息

### 应用名称

编辑 `android/app/src/main/res/values/strings.xml`:

```xml
<resources>
    <string name="app_name">职聘宝</string>
    ...
</resources>
```

### 应用 ID 和版本

编辑 `capacitor.config.ts`:

```typescript
const config: CapacitorConfig = {
  appId: 'com.jobhunter.app',  // 修改应用ID
  appName: '职聘宝',            // 修改应用名称
  ...
};
```

编辑 `android/app/build.gradle`:

```gradle
android {
    defaultConfig {
        applicationId "com.jobhunter.app"
        versionCode 1          // 每次发布递增
        versionName "1.0.0"    // 版本号
        ...
    }
}
```

### 应用图标

替换 `android/app/src/main/res/` 下的图标文件：
- `mipmap-hdpi/ic_launcher.png` (72x72)
- `mipmap-mdpi/ic_launcher.png` (48x48)
- `mipmap-xhdpi/ic_launcher.png` (96x96)
- `mipmap-xxhdpi/ic_launcher.png` (144x144)
- `mipmap-xxxhdpi/ic_launcher.png` (192x192)

推荐使用在线工具生成图标：[Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html)

## 安装 APK 到设备

### 通过 USB 连接

1. 在 Android 设备上启用"开发者选项"和"USB调试"
2. 用 USB 线连接设备到电脑
3. 运行：

```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### 通过文件传输

1. 将 APK 文件传输到设备
2. 在设备上打开文件管理器，点击 APK 文件安装
3. 需要允许"安装未知来源应用"

## 常见问题

### 问题 1: Gradle 构建失败

**解决方案：**
- 确保已安装正确版本的 JDK (17+)
- 检查 `JAVA_HOME` 环境变量
- 尝试清理构建：
  ```bash
  cd android
  ./gradlew clean
  ./gradlew assembleDebug
  ```

### 问题 2: SDK not found

**解决方案：**
- 确保 `ANDROID_HOME` 环境变量指向 Android SDK 目录
- 在 Android Studio 中重新安装 SDK 组件

### 问题 3: 应用在设备上白屏

**解决方案：**
- 检查 `capacitor.config.ts` 中的 `webDir` 是否正确
- 确保运行了 `pnpm build` 并且 `dist/` 目录包含文件
- 重新同步：`pnpm cap:sync`

### 问题 4: 权限问题

**解决方案：**
编辑 `android/app/src/main/AndroidManifest.xml` 添加所需权限：

```xml
<manifest>
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    ...
</manifest>
```

## 优化建议

### 1. 减小 APK 体积

在 `android/app/build.gradle` 中启用代码压缩：

```gradle
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

### 2. 启用 ProGuard 混淆

编辑 `android/app/proguard-rules.pro` 添加混淆规则。

### 3. 多 APK 支持

如果需要为不同 CPU 架构生成单独的 APK：

```gradle
android {
    splits {
        abi {
            enable true
            reset()
            include 'armeabi-v7a', 'arm64-v8a', 'x86', 'x86_64'
            universalApk false
        }
    }
}
```

## 发布到 Google Play

1. 注册 [Google Play 开发者账号](https://play.google.com/console) (一次性费用 $25)
2. 创建应用
3. 上传签名的发布版 APK
4. 填写应用详情、截图、隐私政策等
5. 提交审核

## 技术支持

如遇到问题，请查阅：
- [Capacitor 官方文档](https://capacitorjs.com/docs)
- [Android 开发者文档](https://developer.android.com)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/capacitor)

## 项目文件说明

- `capacitor.config.ts` - Capacitor 配置文件
- `index.html` - 应用入口 HTML
- `src/main.tsx` - React 应用入口
- `vite.config.app.ts` - Vite 构建配置（用于 APK）
- `android/` - Android 原生项目文件夹（首次运行 `cap add android` 后生成）
