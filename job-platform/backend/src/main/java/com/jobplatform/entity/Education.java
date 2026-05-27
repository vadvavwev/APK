package com.jobplatform.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * 教育经历实体
 */
@Data
@Entity
@Table(name = "educations")
@EntityListeners(AuditingEntityListener.class)
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 所属用户
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    /**
     * 学校名称
     */
    @Column(nullable = false, length = 100)
    private String school;

    /**
     * 专业
     */
    @Column(nullable = false, length = 100)
    private String major;

    /**
     * 学历（大专、本科、硕士、博士）
     */
    @Column(nullable = false, length = 20)
    private String degree;

    /**
     * 开始时间（yyyy-MM格式）
     */
    @Column(nullable = false, length = 7)
    private String startDate;

    /**
     * 结束时间（yyyy-MM格式）
     */
    @Column(nullable = false, length = 7)
    private String endDate;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
