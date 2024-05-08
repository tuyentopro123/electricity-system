package com.example.quality_insurance.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
@Slf4j
public class Customer {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id; // Số thứ tự

  //  private String code; // Mã
  private String name; // Tên chủ hộ
  private String email; //email để sau này gửi mail
  private String city = "Hà Nội"; // làm duy nhất mỗi thành phố Hà Nội
  private String district; // quận/huyện
  private String ward; // xã/phường
  private String address; // địa chỉ chi tiết

  private Double oldNumber; // chỉ số cũ
  private Double newNumber; // chỉ số mới
  private Double usedNumber; // số điện đã sử dụng

  private Double totalPrice; // tổng số tiền
  private Date numberUpdate; // ngày cập nhật

  private boolean isPurchased; // đã thanh toán tiền hay chưa
  private String personNameRecord; // tên người ghi số điện

  private boolean isEmailed; // trong trường hợp chưa thanh toán thì đã gửi mail cho họ chưa?
  /*
   * tài khoản có active hay không, trong trường hợp chưa thanh toán mà đã gửi mail rồi thì sẽ set là false, và ngược lại
   * */
  private boolean isActive;

  @CreationTimestamp
  private Date createdAt;

  @UpdateTimestamp
  private Date updatedAt;
}
