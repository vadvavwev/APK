# 求职招聘平台项目结构

## 项目概述
本项目是一个完整的求职招聘平台，包含Flutter前端、Java Spring Boot后端和MySQL数据库。

## 目录结构

```
job-platform/
├── backend/                    # Java Spring Boot后端
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/jobplatform/
│   │   │   │   ├── entity/            # 实体类
│   │   │   │   ├── repository/        # 数据访问层
│   │   │   │   ├── service/           # 业务逻辑层
│   │   │   │   ├── controller/        # 控制器
│   │   │   │   ├── dto/               # 数据传输对象
│   │   │   │   ├── config/            # 配置类
│   │   │   │   ├── filter/            # 过滤器
│   │   │   │   ├── exception/         # 异常处理
│   │   │   │   └── util/              # 工具类
│   │   │   └── resources/
│   │   │       └── application.yml
│   │   └── test/
│   └── pom.xml
├── flutter_app/                # Flutter前端应用
├── database/                   # 数据库脚本
└── docs/                       # 文档
