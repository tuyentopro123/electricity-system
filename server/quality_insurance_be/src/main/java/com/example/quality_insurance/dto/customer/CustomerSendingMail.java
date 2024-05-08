package com.example.quality_insurance.dto.customer;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CustomerSendingMail {
  @Min(1)
  private int templateId; // id email template

  @NotNull
  private String[] emails; // danh sách email gửi đi
}
