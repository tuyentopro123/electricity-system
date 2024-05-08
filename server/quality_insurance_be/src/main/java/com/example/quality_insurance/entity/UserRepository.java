package com.example.quality_insurance.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
  @Query(value = "select * from user where email = ?1", nativeQuery = true)
  Optional<User> findByEmail(String email);
}
