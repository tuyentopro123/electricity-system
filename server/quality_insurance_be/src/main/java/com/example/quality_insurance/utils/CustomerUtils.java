package com.example.quality_insurance.utils;

import com.example.quality_insurance.entity.Customer;

import java.util.ArrayList;
import java.util.List;

public class CustomerUtils {
  public static String convertCustomerToString(Customer customer) {
    List<String> str = new ArrayList<>();
    str.add(String.valueOf(customer.getId()));
    str.add(String.valueOf(customer.getName()));
    str.add(String.valueOf(customer.getEmail()));
    str.add(String.valueOf(customer.getCity()));
    str.add(String.valueOf(customer.getDistrict()));
    str.add(String.valueOf(customer.getWard()));
    str.add(String.valueOf(customer.getAddress()));
    str.add(String.valueOf(customer.getOldNumber()));
    str.add(String.valueOf(customer.getNewNumber()));
    str.add(String.valueOf(customer.getUsedNumber()));
    str.add(String.format("%.3f", customer.getTotalPrice()));
    str.add(String.valueOf(customer.getNumberUpdate()));
    str.add(String.valueOf(customer.isPurchased()));
    str.add(String.valueOf(customer.getPersonNameRecord()));
    str.add(String.valueOf(customer.getUpdatedAt()));

    return String.join("|", str);
  }
}
