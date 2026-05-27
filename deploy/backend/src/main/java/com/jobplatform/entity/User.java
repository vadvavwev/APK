package com.jobplatform.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * 用户实体
 */
@Data
@Entity
@Table(name = "users", indexes = {
    @Index(name = "idx_phone", columnList = "phone", unique = true)
})
@EntityListeners(AuditingEntityListener.class)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 手机号（唯一）
     */
    @Column(nullable = false, unique = true, length = 11)
    private String phone;

    /**
     * 密码（BCrypt加密）
     */
    @Column(nullable = false)
    private String password;

    /**
     * 姓名
     */
    @Column(length = 50)
    private String name;

    /**
     * 头像URL
     */
    @Column(length = 500)
    private String avatar;

    /**
     * 期望职位
     */
    @Column(length = 100)
    private String desiredPosition;

    /**
     * 工作城市
     */
    @Column(length = 50)
    private String city;

    /**
     * 期望薪资
     */
    @Column(length = 50)
    private String expectedSalary;

    /**
     * 角色（ROLE_USER, ROLE_HR, ROLE_ADMIN）
     */
    @Column(nullable = false, length = 20)
    private String role = "ROLE_USER";

    /**
     * 账号状态（0-禁用，1-正常）
     */
    @Column(nullable = false)
    private Integer status = 1;

    /**
     * 教育经历列表
     */
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Education> educations = new ArrayList<>();

    /**
     * 工作经历列表
     */
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WorkExperience> workExperiences = new ArrayList<>();

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
