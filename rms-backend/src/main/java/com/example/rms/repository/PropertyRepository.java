package com.example.rms.repository;

import com.example.rms.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findByCreatedBy(String createdBy);
    List<Property> findBySoldFalse();
}
