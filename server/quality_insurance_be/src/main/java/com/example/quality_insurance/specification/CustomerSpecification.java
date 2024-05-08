package com.example.quality_insurance.specification;


import com.example.quality_insurance.dto.customer.CustomerFilterDto;
import com.example.quality_insurance.entity.Customer;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;


@Data
@RequiredArgsConstructor
public class CustomerSpecification {

  public static Specification<Customer> filter(CustomerFilterDto customerFilterDto) {
    return new Specification<Customer>() {
      @Override
      public Predicate toPredicate(Root<Customer> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        System.out.println(root);
        List<Predicate> predicates = new ArrayList<>();
        Predicate predicate;
        if (!customerFilterDto.getDistrict().isEmpty()) {
          predicate = builder.equal(root.get("district"), customerFilterDto.getDistrict());
        } else {
          predicate = builder.isNotNull(root.get("district"));
        }
        predicates.add(predicate);

        return builder.and(predicates.toArray(new Predicate[0]));
      }
    };
  }
}
