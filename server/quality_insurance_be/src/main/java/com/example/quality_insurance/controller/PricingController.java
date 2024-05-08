package com.example.quality_insurance.controller;

import com.example.quality_insurance.dto.pricing.MultiCreatePricingDto;
import com.example.quality_insurance.entity.Pricing;
import com.example.quality_insurance.service.PricingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("config")
@RequiredArgsConstructor
public class PricingController {
  private final PricingService pricingService;

  @GetMapping()
  public List<Pricing> getAllConfig() {
    return this.pricingService.getAllConfig();
  }

  @PostMapping()
  public List<Pricing> createPricingConfig(@Valid @RequestBody MultiCreatePricingDto dto) {
    return this.pricingService.createPricingConfig(dto);
  }


}
