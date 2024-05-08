package com.example.quality_insurance.dto.customer;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CustomerFilterDto {

  private String district; // quận/huyện
  private String ward; // xã/phường
  private String name;
  private String isPurchased;
  
  @Min(1)
  private int page;
}
