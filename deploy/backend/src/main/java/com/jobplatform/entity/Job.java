package com.jobplatform.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * 职位实体
 */
@Data
@Entity
@Table(name = "jobs", indexes = {
    @Index(name = "idx_title", columnList = "title"),
    @Index(name = "idx_city", columnList = "city"),
    @Index(name = "idx_publish_time", columnList = "publishTime")
})
@EntityListeners(AuditingEntityListener.class)
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 职位标题
     */
    @Column(nullable = false, length = 100)
    private String title;

    /**
     * 公司名称
     */
    @Column(nullable = false, length = 100)
    private String companyName;

    /**
     * 公司Logo URL
     */
    @Column(length = 500)
    private String companyLogo;

    /**
     * 工作城市
     */
    @Column(nullable = false, length = 50)
    private String city;

    /**
     * 薪资（如：15k-25k）
     */
    @Column(nullable = false, length = 50)
    private String salary;

    /**
     * 最低薪资（用于范围查询）
     */
    @Column(nullable = false)
    private Integer salaryMin;

    /**
     * 最高薪资（用于范围查询）
     */
    @Column(nullable = false)
    private Integer salaryMax;

    /**
     * 学历要求（大专、本科、硕士、博士、不限）
     */
    @Column(nullable = false, length = 20)
    private String education;

    /**
     * 职位描述
     */
    @Column(columnDefinition = "TEXT")
    private String description;

    /**
     * 公司简介
     */
    @Column(columnDefinition = "TEXT")
    private String companyIntro;

    /**
     * HR姓名
     */
    @Column(length = 50)
    private String hrName;

    /**
     * HR职位
     */
    @Column(length = 50)
    private String hrPosition;

    /**
     * 浏览量
     */
    @Column(nullable = false)
    private Integer views = 0;

    /**
     * 发布时间
     */
    @Column(nullable = false)
    private LocalDateTime publishTime;

    /**
     * 职位状态（0-下架，1-在招）
     */
    @Column(nullable = false)
    private Integer status = 1;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
