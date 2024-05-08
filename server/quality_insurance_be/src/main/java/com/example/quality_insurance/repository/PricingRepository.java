package com.example.quality_insurance.repository;

import com.example.quality_insurance.entity.Pricing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PricingRepository extends JpaRepository<Pricing, Long> {
  @Query(nativeQuery = true, value = "select * from pricing order by id desc limit 1")
  Pricing getLatestPricing();

  List<Pricing> getPricingByUpdateNumber(int updateNumber);
}
