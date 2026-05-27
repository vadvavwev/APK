package com.jobplatform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * 求职招聘平台应用启动类
 *
 * @author Job Platform Team
 * @since 1.0.0
 */
@SpringBootApplication
@EnableJpaAuditing
public class JobPlatformApplication {

    public static void main(String[] args) {
        SpringApplication.run(JobPlatformApplication.class, args);
        System.out.println("========================================");
        System.out.println("Job Platform Backend Started Successfully!");
        System.out.println("Swagger UI: http://localhost:8080/api/swagger-ui.html");
        System.out.println("========================================");
    }
}
