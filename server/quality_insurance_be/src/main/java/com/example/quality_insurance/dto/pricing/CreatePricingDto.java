package com.example.quality_insurance.dto.pricing;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreatePricingDto {
  @NotBlank
  private String level;

  @NotBlank
  private double price;

  @NotBlank
  private int fromNumber;

  @NotBlank
  private int toNumber;
}
