package com.example.quality_insurance.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
  @NotEmpty
  private String firstname;

  @NotEmpty
  private String lastname;

  @Email
  @NotEmpty
  private String email;

  @NotEmpty
  private String password;
}
