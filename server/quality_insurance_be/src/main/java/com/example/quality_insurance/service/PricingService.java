package com.example.quality_insurance.service;

import com.example.quality_insurance.dto.pricing.CreatePricingDto;
import com.example.quality_insurance.dto.pricing.MultiCreatePricingDto;
import com.example.quality_insurance.entity.Pricing;
import com.example.quality_insurance.repository.PricingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PricingService {
  private final PricingRepository repository;

  public List<Pricing> getAllConfig() {
    Pricing pricing = this.repository.getLatestPricing();
    return this.repository.getPricingByUpdateNumber(pricing.getUpdateNumber());
  }

  public List<Pricing> createPricingConfig(MultiCreatePricingDto dtos) {
    CreatePricingDto[] data = dtos.getData();
    Pricing tmp = this.repository.getLatestPricing();
    List<Pricing> pricings = new ArrayList<>();
    for (CreatePricingDto dto : data) {
      Pricing pricing = new Pricing();
      pricing.setUpdateNumber(tmp.getUpdateNumber() + 1);
      pricing.setName(dto.getLevel());
      pricing.setPrice(dto.getPrice());
      pricing.setFromNumber(dto.getFromNumber());
      pricing.setToNumber(dto.getToNumber());
      pricings.add(pricing);
    }
    this.repository.saveAll(pricings);
    return pricings;
  }

}
