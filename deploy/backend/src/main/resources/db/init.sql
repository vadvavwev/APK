-- Job Platform Database Initialization Script
-- Run this script once during first MySQL setup

CREATE DATABASE IF NOT EXISTS job_platform
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE job_platform;

-- Users table
CREATE TABLE IF NOT EXISTS `user` (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    phone VARCHAR(20) NOT NULL UNIQUE COMMENT '手机号',
    password VARCHAR(255) NOT NULL COMMENT '加密密码',
    nickname VARCHAR(50) DEFAULT NULL COMMENT '昵称',
    avatar VARCHAR(255) DEFAULT NULL COMMENT '头像URL',
    gender TINYINT DEFAULT 0 COMMENT '性别 0-未知 1-男 2-女',
    birth_date DATE DEFAULT NULL COMMENT '出生日期',
    email VARCHAR(100) DEFAULT NULL COMMENT '邮箱',
    city VARCHAR(50) DEFAULT NULL COMMENT '所在城市',
    education VARCHAR(20) DEFAULT NULL COMMENT '学历',
    work_years INT DEFAULT 0 COMMENT '工作年限',
    expected_position VARCHAR(100) DEFAULT NULL COMMENT '期望职位',
    expected_salary_min INT DEFAULT NULL COMMENT '期望薪资下限',
    expected_salary_max INT DEFAULT NULL COMMENT '期望薪资上限',
    resume_url VARCHAR(255) DEFAULT NULL COMMENT '简历URL',
    status TINYINT DEFAULT 1 COMMENT '状态 0-禁用 1-正常',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_phone (phone),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- Jobs table
CREATE TABLE IF NOT EXISTS `job` (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL COMMENT '公司名称',
    company_logo VARCHAR(255) DEFAULT NULL COMMENT '公司Logo',
    position_name VARCHAR(100) NOT NULL COMMENT '职位名称',
    job_description TEXT COMMENT '职位描述',
    requirements TEXT COMMENT '任职要求',
    salary_min INT NOT NULL COMMENT '最低薪资',
    salary_max INT NOT NULL COMMENT '最高薪资',
    city VARCHAR(50) NOT NULL COMMENT '工作城市',
    address VARCHAR(255) DEFAULT NULL COMMENT '详细地址',
    education VARCHAR(20) DEFAULT NULL COMMENT '学历要求',
    work_years VARCHAR(20) DEFAULT NULL COMMENT '工作年限要求',
    job_type VARCHAR(20) DEFAULT 'FULL_TIME' COMMENT '工作类型 FULL_TIME/PART_TIME/INTERSHIP',
    recruiter_name VARCHAR(50) DEFAULT NULL COMMENT '招聘人员姓名',
    recruiter_phone VARCHAR(20) DEFAULT NULL COMMENT '招聘人员电话',
    recruiter_position VARCHAR(50) DEFAULT NULL COMMENT '招聘人员职位',
    view_count INT DEFAULT 0 COMMENT '浏览次数',
    status TINYINT DEFAULT 1 COMMENT '状态 0-下架 1-发布中',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_city (city),
    INDEX idx_status (status),
    INDEX idx_create_time (create_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='职位表';

-- Applications table
CREATE TABLE IF NOT EXISTS `application` (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL COMMENT '用户ID',
    job_id BIGINT NOT NULL COMMENT '职位ID',
    status VARCHAR(20) DEFAULT 'PENDING' COMMENT '状态 PENDING/VIEWED/INTERVIEW/REJECTED/ACCEPTED',
    remark VARCHAR(500) DEFAULT NULL COMMENT '备注',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_job_id (job_id),
    INDEX idx_status (status),
    FOREIGN KEY (user_id) REFERENCES `user`(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES `job`(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='投递记录表';

-- Favorites table
CREATE TABLE IF NOT EXISTS `favorite` (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL COMMENT '用户ID',
    job_id BIGINT NOT NULL COMMENT '职位ID',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE INDEX idx_user_job (user_id, job_id),
    FOREIGN KEY (user_id) REFERENCES `user`(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES `job`(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='收藏表';

-- Education experience table
CREATE TABLE IF NOT EXISTS `education` (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL COMMENT '用户ID',
    school_name VARCHAR(100) NOT NULL COMMENT '学校名称',
    degree VARCHAR(20) NOT NULL COMMENT '学历',
    major VARCHAR(100) DEFAULT NULL COMMENT '专业',
    start_date DATE NOT NULL COMMENT '开始日期',
    end_date DATE DEFAULT NULL COMMENT '结束日期',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES `user`(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='教育经历表';

-- Work experience table
CREATE TABLE IF NOT EXISTS `work_experience` (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL COMMENT '用户ID',
    company_name VARCHAR(100) NOT NULL COMMENT '公司名称',
    position_name VARCHAR(100) NOT NULL COMMENT '职位名称',
    description TEXT COMMENT '工作描述',
    start_date DATE NOT NULL COMMENT '开始日期',
    end_date DATE DEFAULT NULL COMMENT '结束日期',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES `user`(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='工作经历表';

-- Create indexes for performance
CREATE INDEX idx_user_phone ON `user`(phone);
CREATE INDEX idx_job_city_status ON `job`(city, status);
CREATE INDEX idx_application_user ON `application`(user_id);
CREATE INDEX idx_application_job ON `application`(job_id);