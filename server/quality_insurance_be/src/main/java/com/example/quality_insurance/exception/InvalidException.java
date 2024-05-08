package com.example.quality_insurance.exception;

public class InvalidException extends RuntimeException {
  public InvalidException(String message) {
    super(message);
  }

  public InvalidException(String message, Throwable cause) {
    super(message, cause);
  }

  public InvalidException(Throwable cause) {
    super(cause);
  }
}
