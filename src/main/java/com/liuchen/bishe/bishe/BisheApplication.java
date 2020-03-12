package com.liuchen.bishe.bishe;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@MapperScan(basePackages = "com.liuchen.bishe.bishe.dao")

public class BisheApplication {

    public static void main(String[] args) {
        SpringApplication.run(BisheApplication.class, args);

        System.out.println("成功启动");
    }

}
