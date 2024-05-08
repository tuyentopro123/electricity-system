package com.example.quality_insurance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class QualityInsuranceApplication {

  public static void main(String[] args) {
    SpringApplication.run(QualityInsuranceApplication.class, args);
  }

}
