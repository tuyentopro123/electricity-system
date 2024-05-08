package com.example.quality_insurance.dto.customer;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerCreateDto {
  @NotBlank
  private String name;

  @NotBlank
  private String district; // quận/huyện

  @NotBlank
  private String ward; // xã/phường

  @NotBlank
  private String address; // địa chỉ chi tiết

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
  private Date numberUpdate;

  @Min(1)
  private Double oldNumber; // chỉ số cũ

  @Min(1)
  private Double newNumber; // chỉ số mới
}
