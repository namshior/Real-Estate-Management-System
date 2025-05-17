package com.example.rms.repository;

import com.example.rms.entity.Property;
import com.example.rms.entity.Transaction;
import com.example.rms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByAgent(User agent);
    void deleteByProperty(Property property);
//    List<Transaction> findByClient(Long clientId);
//    List<Transaction> findByPropertyId(Long propertyId);

}
