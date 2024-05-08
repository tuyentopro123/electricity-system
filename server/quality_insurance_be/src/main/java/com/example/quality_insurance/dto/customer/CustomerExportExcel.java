package com.example.quality_insurance.dto.customer;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CustomerExportExcel {
  @NotBlank
  private String header; // tiêu đề của excel

  @NotNull
  private long[] ids; // danh sách id của customer muốn xuất ra excel
}
