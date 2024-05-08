package com.example.quality_insurance.controller;

import com.example.quality_insurance.dto.customer.CustomerExportExcel;
import com.example.quality_insurance.dto.customer.CustomerSendingMail;
import com.example.quality_insurance.entity.Customer;
import com.example.quality_insurance.exception.Response;
import com.example.quality_insurance.service.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/customers")
public class CustomerController {
  private final CustomerService service;

  @GetMapping()
  public List<Customer> getAllCustomers(@RequestParam Integer month) {
    return this.service.getAllCustomers(month);
  }

  @PostMapping("sending-mails")
  public Response sendingMails(@Valid @RequestBody CustomerSendingMail customerSendingMail) {
    return this.service.sendingMails(customerSendingMail);
  }

  @PostMapping("export-to-excel")
  public ResponseEntity<byte[]> exportToExcel(@Valid @RequestBody CustomerExportExcel customerExportExcel) {
    return this.service.exportToExcel(customerExportExcel);
  }

//  @PostMapping()
//  public Customer createCustomer(@RequestBody CustomerCreateDto dto) {
//    return this.service.createCustomer(dto);
//  }
}
