package com.example.quality_insurance.utils;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class CalPricing {
//  public final PricingRepository repository;
//
//  private static List<Double> calculate(double number, double currentPrice, double price, int maxValue) {
//    if (number >= maxValue) {
//      currentPrice += price * maxValue;
//      number -= maxValue;
//    } else {
//      currentPrice += price * number;
//      number = 0;
//    }
//    return new ArrayList<>(Arrays.asList(number, currentPrice));
//  }
//
//  public double calculatePricing(double number) {
//    Pricing tmp = repository.getLatestPricing();
//    List<Pricing> pricings = repository.getPricingByUpdateNumber(tmp.getUpdateNumber());
//    double price = 0;
//    for (int i = 0; i < pricings.size(); i++) {
//      if (number == 0) break;
//      List<Double> res = calculate(number, price, pricings.get(i).getPrice(), pricings.get(i).getToNumber());
//      number = res.get(0);
//      price = res.get(1);
//    }
//    return price;
//  }
}
