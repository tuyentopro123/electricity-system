package com.example.quality_insurance.repository;

import com.example.quality_insurance.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long>, JpaSpecificationExecutor<Customer> {

//  @Query(value = "select * from customer " +
//    "where (?1 is null or lower(district)=trim(?1)) " +
//    "and (?2 is null or lower(ward)=trim(?2)) " +
//    "and (?3 is null or lower(name) like %?3%) " +
//    "and (?4 is null or is_purchased=cast(?4='true' as signed))" +
//    "limit ?5 " +
//    "offset ?6", nativeQuery = true)
//  List<Customer> filterCustomers(String district, String ward, String name, String isPurchased, int limit, int page);

  @Query(value = "select * from customer where email=?1 order by id desc limit 1", nativeQuery = true)
  Optional<Customer> findOneByEmail(String email);

  @Query(value = "select * from customer where month(customer.number_update) = ?1", nativeQuery = true)
  List<Customer> filterCustomers(Integer month);

}
