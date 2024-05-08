package com.example.quality_insurance.configuration;

import com.example.quality_insurance.constant.LevelPrice;
import com.example.quality_insurance.entity.Customer;
import com.example.quality_insurance.entity.Pricing;
import com.example.quality_insurance.repository.CustomerRepository;
import com.example.quality_insurance.repository.PricingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.io.FileNotFoundException;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

@Configuration
@RequiredArgsConstructor
public class BeanConfiguration {
  private final PricingRepository pricingRepository;
  private final CustomerRepository customerRepository;

  public List<Double> calculate(double number, double currentPrice, double price, int maxValue) {
    if (number >= maxValue) {
      currentPrice += price * maxValue;
      number -= maxValue;
    } else {
      currentPrice += price * number;
      number = 0;
    }
    return new ArrayList<>(Arrays.asList(number, currentPrice));
  }

  public double calculatePricing(double number) {
    Pricing tmp = this.pricingRepository.getLatestPricing();
    List<Pricing> pricings = this.pricingRepository.getPricingByUpdateNumber(tmp.getUpdateNumber());
    double price = 0;
    for (int i = 0; i < pricings.size(); i++) {
      if (number == 0) break;
      List<Double> res = calculate(number, price, pricings.get(i).getPrice(),
        pricings.get(i).getToNumber() - pricings.get(i).getFromNumber() + 1);
      number = res.get(0);
      price = res.get(1);
    }
    if (number != 0) {
      int size = pricings.size() - 1;
      price = calculate(number, price, pricings.get(size).getPrice(),
        pricings.get(size).getToNumber() - pricings.get(size).getFromNumber() + 1).get(1);
    }
    return price;
  }

  @Bean
  public boolean addInitPricingLevel() {
    List<Pricing> pricingList = this.pricingRepository.findAll();
    if (!pricingList.isEmpty()) {
      System.out.println("Pricing is not empty...");
      return false;
    }
    System.out.println("Pricing is empty...");
    List<Pricing> pricings = new ArrayList<>();
    for (int i = 0; i < 5; i++) {
      Pricing pricing = new Pricing();
      pricing.setFromNumber(LevelPrice.numbers[i][0]);
      pricing.setToNumber(LevelPrice.numbers[i][1]);
      pricing.setPrice(LevelPrice.levels[i]);
      pricing.setName(String.format("Level %s", i + 1));
      pricings.add(pricing);
    }
    this.pricingRepository.saveAll(pricings);
    System.out.println("Done import pricing...");
    return true;
  }

  @Bean()
  public boolean addInitCustomer() {

    List<Customer> customerList = this.customerRepository.findAll();
    if (!customerList.isEmpty()) {
      System.out.println("Customer is not empty...");
      return false;
    }

    String file = "./data.txt";
    System.out.println("Customer is empty...");
    try {
      Scanner scanner = new Scanner(new File(file));
      List<Customer> customers = new ArrayList<>();
      while (scanner.hasNextLine()) {
        String[] line = scanner.nextLine().split("\\|");
        Customer customer = new Customer();

        customer.setName(line[0]);
        customer.setDistrict(line[1]);
        customer.setWard(line[2]);
        customer.setAddress(line[3]);
        customer.setOldNumber(Double.valueOf(line[4]));
        customer.setNewNumber(Double.valueOf(line[5]));
        customer.setNumberUpdate(Date.valueOf(line[6]));
        customer.setPurchased(Boolean.parseBoolean(line[7]));
        customer.setPersonNameRecord(line[8]);
        customer.setEmail(line[9]);

        customer.setUsedNumber(customer.getNewNumber() - customer.getOldNumber());
        customer.setTotalPrice(this.calculatePricing(customer.getUsedNumber()));
        customer.setEmailed(Boolean.parseBoolean(line[10]));
        customer.setActive(Boolean.parseBoolean(line[11]));
        customers.add(customer);
      }
      this.customerRepository.saveAll(customers);
      System.out.println("Done import customers...");
    } catch (FileNotFoundException e) {
      System.out.println("File not found so can not import");
    }
    return true;
  }

//  @Bean
//  public JavaMailSender getJavaMailSender() {
//    JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
//    mailSender.setHost(mailHost);
//    mailSender.setPort(587);
//
//    mailSender.setUsername(mailUsername);
//    mailSender.setPassword(mailPassword);
//
//    Properties props = mailSender.getJavaMailProperties();
//    props.put("mail.transport.protocol", "smtp");
//    props.put("mail.smtp.auth", "true");
//    props.put("mail.smtp.starttls.enable", "false");
//    props.put("mail.debug", "true");
//
//    return mailSender;
//  }
}
