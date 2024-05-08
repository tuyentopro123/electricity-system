package com.example.quality_insurance.configuration;


import com.example.quality_insurance.exception.JWTException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

@Slf4j
@Component
public class CatchExceptionFilter extends OncePerRequestFilter {

  @Autowired
  @Qualifier("handlerExceptionResolver")
  private HandlerExceptionResolver resolver;

  @Override
  protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
                                  @NonNull FilterChain filterChain) {
    try {
      if (request.getHeader("Authorization") == null && !request.getRequestURI().contains("auth")) {
        throw new JWTException("You have to login before accessing that!");
      }
      try {
        filterChain.doFilter(request, response);
      } catch (MalformedJwtException e) {
        throw new JWTException("Token is not valid!");
      } catch (ExpiredJwtException e) {
        throw new JWTException("Token has been expired!");
      }
    } catch (Exception e) {
      resolver.resolveException(request, response, null, e);
    }
  }
}
