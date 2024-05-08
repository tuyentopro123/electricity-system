package com.example.quality_insurance.exception;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
  public static String returnStatus(int statusCode) {
    if (String.valueOf(statusCode).startsWith("4")) return "fail";
    return "error";
  }

  @ExceptionHandler
  public ResponseEntity<Response> handleNotFoundException(NotFoundException e) {
    Response response = new Response(returnStatus(HttpStatus.NOT_FOUND.value()),
      e.getMessage());
    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler
  public ResponseEntity<Response> handlePermissionException(PermissionException e) {
    Response response =
      new Response(returnStatus(HttpStatus.FORBIDDEN.value()),
        e.getMessage());
    return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
  }

  @ExceptionHandler
  public ResponseEntity<Response> handleDuplicateFieldException(DuplicatedException e) {
    Response response =
      new Response(returnStatus(HttpStatus.BAD_REQUEST.value()),
        e.getMessage());
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler
  public ResponseEntity<Response> handleInvalidException(InvalidException e) {
    Response response =
      new Response(returnStatus(HttpStatus.BAD_REQUEST.value()),
        e.getMessage());
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler
  public ResponseEntity<Response> handleTypeMismatchException(MethodArgumentTypeMismatchException e) {
    Response response =
      new Response(returnStatus(HttpStatus.BAD_REQUEST.value()), "ID " +
        "must be Long not String");
    //                String.format("%s must be %s, not %s", e.getName(),
    //                e.getRequiredType().toString().split("\\.")[2],
    //                e.getValue().getClass().toString()).split("\\.")[2]);
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler
  public ResponseEntity<Response> handleConstraintViolationException(ConstraintViolationException e) {
    StringBuilder message = new StringBuilder();
    for (ConstraintViolation<?> constraintViolation :
      e.getConstraintViolations()) {
      message.append(constraintViolation.getMessage());
    }
    Response response = new Response(returnStatus(HttpStatus.BAD_REQUEST.value()),
      message.toString());
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler
  public ResponseEntity<Response> handleMalformJwtException(JWTException exc) {
    Response response = new Response(returnStatus(HttpStatus.BAD_REQUEST.value()),
      exc.getMessage());
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    StringBuilder message = new StringBuilder();
    for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
      message.append(String.format("%s: %s, ", fieldError.getField(), fieldError.getDefaultMessage()));
    }
    Response response = new Response(returnStatus(ex.getStatusCode().value()),
      message.toString());
    return new ResponseEntity<>(response, ex.getStatusCode());
  }
}
