package com.example.quality_insurance.service;

import com.example.quality_insurance.dto.customer.CustomerExportExcel;
import com.example.quality_insurance.dto.customer.CustomerSendingMail;
import com.example.quality_insurance.entity.Customer;
import com.example.quality_insurance.entity.EmailTemplate;
import com.example.quality_insurance.exception.InvalidException;
import com.example.quality_insurance.exception.NotFoundException;
import com.example.quality_insurance.exception.Response;
import com.example.quality_insurance.repository.CustomerRepository;
import com.example.quality_insurance.repository.EmailTemplateRepository;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.example.quality_insurance.utils.CustomerUtils.convertCustomerToString;

@Service
@RequiredArgsConstructor
public class CustomerService {
  private final static int LIMIT = 10;
  private static final Logger logger = LoggerFactory.getLogger(CustomerService.class);
  private final CustomerRepository repository;
  private final JavaMailSender sender;
  private final TemplateEngine templateEngine;
  private final EmailTemplateRepository templateRepository;

  //    public List<Customer> getAllCustomers(CustomerFilterDto dto) {
  public List<Customer> getAllCustomers(Integer month) {
//    String district = dto.getDistrict();
//    String ward = dto.getWard();
//    String name = dto.getName();
//    String isPurchased = dto.getIsPurchased();
//    int skip = (dto.getPage() - 1) * LIMIT;

//        return this.repository.filterCustomers(district, ward, name, isPurchased, LIMIT, skip);
    return this.repository.filterCustomers(month);
  }

  public Response sendingMails(CustomerSendingMail customerSendingMail) {
    List<Customer> customers = new ArrayList<>();
    Pattern pattern = Pattern.compile("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    for (String email : customerSendingMail.getEmails()) {
      Matcher matcher = pattern.matcher(email);
      if (!matcher.find()) {
        throw new InvalidException("Email not valid");
      }
      Customer customer = this.repository.findOneByEmail(email).orElseThrow(() -> new NotFoundException("Email not found!"));
      customers.add(customer);
    }

    EmailTemplate template =
      templateRepository.findById((long) customerSendingMail.getTemplateId()).orElseThrow(() -> new NotFoundException(
        "There is no template with this id"));
    for (Customer customer : customers) {
      try {
        Context context = new Context();
        context.setVariables(Map.of("customer", customer.getName(),
          "email", customer.getEmail(),
          "address", customer.getAddress(),
          "oldNumber", customer.getOldNumber(),
          "newNumber", customer.getNewNumber(),
          "usedNumber", customer.getUsedNumber(),
          "price", (double) Math.round(customer.getTotalPrice() * 100) / 100));

        String text = templateEngine.process(template.getName(), context);
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setTo(customer.getEmail());
        helper.setSubject(template.getSubject());
        helper.setText(text, true);
        this.sender.send(message);
        customer.setEmailed(true);
      } catch (Exception e) {
        logger.warn("Can not sending email");
      }
    }
    this.repository.saveAll(customers);
    return new Response("success", "Mails have been sending...");
  }


  public ResponseEntity<byte[]> exportToExcel(CustomerExportExcel customerExportExcel) {
    List<Customer> customers = this.repository.findAllById(Arrays.stream(customerExportExcel.getIds()).boxed().toList());
    return this.handleExcelExport(customers, customerExportExcel);
  }

  private ResponseEntity<byte[]> handleExcelExport(List<Customer> customers, CustomerExportExcel customerExportExcel) {
    try {
      XSSFWorkbook workbook = new XSSFWorkbook();
      Sheet sheet = workbook.createSheet("Sheet 1");

      String[] fields = {"ID", "Tên khách hàng", "Email", "Thành phố", "Quận/huyện", "Xã/phường", "Địa chỉ", "Số điện cũ",
        "Số điện mới",
        "Số điện đã dùng",
        "Tiền điện", "Ngày nhập số", "Đã thanh toán",
        "Tên người nhập", "Cập nhật lần cuối"};

      // header
      Row header = sheet.createRow(0);
      header.setHeight((short) 1000);
      header.getSheet().addMergedRegion(new CellRangeAddress(0, 0, 0, fields.length - 1));

      CellStyle headerStyle = workbook.createCellStyle();
      headerStyle.setAlignment(HorizontalAlignment.CENTER);
      headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);

      XSSFFont font = workbook.createFont();
      font.setFontHeightInPoints((short) 32);
      headerStyle.setFont(font);

      Cell headerCell = header.createCell(0);
      headerCell.setCellValue(customerExportExcel.getHeader());
      headerCell.setCellStyle(headerStyle);

      // style cho tên các cột
      CellStyle style = workbook.createCellStyle();
      XSSFFont fontCell = workbook.createFont();
      style.setWrapText(true);
      style.setAlignment(HorizontalAlignment.CENTER);
      style.setVerticalAlignment(VerticalAlignment.CENTER);
      fontCell.setBold(true);
      fontCell.setFontHeightInPoints((short) 14);
      style.setFont(fontCell);

      Row row = sheet.createRow(2);
      row.setHeight((short) 400);
      for (int i = 0; i < fields.length; i++) {
        Cell cell = row.createCell(i);
        cell.setCellValue(fields[i]);
        if (i == 0) {
          sheet.setColumnWidth(i, 5 * 256);
        } else {
          sheet.setColumnWidth(i, 25 * 256);
        }
        cell.setCellStyle(style);
      }

      // style cho normal cột

      CellStyle normalStyle = workbook.createCellStyle();
      XSSFFont normalFontCell = workbook.createFont();
      normalStyle.setWrapText(true);
      normalStyle.setAlignment(HorizontalAlignment.CENTER);
      normalStyle.setVerticalAlignment(VerticalAlignment.CENTER);
      normalStyle.setFont(normalFontCell);

      for (int i = 0; i < customers.size(); i++) {
        Row newRow = sheet.createRow(i + 3); // bắt đầu từ dòng thứ 3
        String[] res = convertCustomerToString(customers.get(i)).split("\\|");
        for (int j = 0; j < fields.length; j++) {
          Cell cell = newRow.createCell(j);
          cell.setCellValue(res[j]);
          cell.setCellStyle(normalStyle);
        }
      }

      long millisecond = Calendar.getInstance().get(Calendar.MILLISECOND);
      String filePath = String.format("data-export-%s.xlsx", millisecond);
      ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
      workbook.write(byteArrayOutputStream);

      return ResponseEntity.ok().contentType(MediaType.APPLICATION_OCTET_STREAM).header(HttpHeaders.CONTENT_DISPOSITION
        , String.format("attachment; filename=\"%s\"", filePath)).body(byteArrayOutputStream.toByteArray());
    } catch (IOException e) {
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
  }

//  public Customer createCustomer(CustomerCreateDto dto) {
//    Customer customer = new Customer();
//    customer.setName(dto.getName());
//    customer.setDistrict(dto.getDistrict());
//    customer.setWard(dto.getWard());
//    customer.setAddress(dto.getAddress());
//    customer.setOldNumber(dto.getOldNumber());
//    customer.setNewNumber(dto.getNewNumber());
//    customer.setNumberUpdate(dto.getNumberUpdate());
//
//    customer.setUsedNumber(dto.getNewNumber() - dto.getOldNumber());
//    customer.setTotalPrice(Pricing.calculatePricing(customer.getUsedNumber()));
//
//    return this.repository.save(customer);
//  }
}
