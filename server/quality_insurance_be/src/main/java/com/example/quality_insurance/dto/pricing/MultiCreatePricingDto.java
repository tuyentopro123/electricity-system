package com.example.quality_insurance.dto.pricing;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MultiCreatePricingDto {
  @NotNull
  private CreatePricingDto[] data;
}
