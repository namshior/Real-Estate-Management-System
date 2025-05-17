package com.example.rms.service.impl;

import com.example.rms.dto.TransactionDto;
import com.example.rms.entity.Property;
import com.example.rms.entity.STATUS;
import com.example.rms.entity.Transaction;
import com.example.rms.entity.User;
import com.example.rms.mapper.TransactionMapper;
import com.example.rms.repository.PropertyRepository;
import com.example.rms.repository.TransactionRepository;
import com.example.rms.repository.UserRepository;
import com.example.rms.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;

    @Autowired
    public TransactionServiceImpl(TransactionRepository transactionRepository, PropertyRepository propertyRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.propertyRepository = propertyRepository;
        this.userRepository = userRepository;
    }

    @Override
    public TransactionDto saveTransaction(TransactionDto transactionDto) throws Exception {
        User client = userRepository.findByUserid(transactionDto.getClientId());
        User agent = userRepository.findByUserid(transactionDto.getAgentId());
        Optional<Property> propertyOptional = propertyRepository.findById(transactionDto.getPropertyId());
        if (propertyOptional.isEmpty()) {
            throw new IllegalArgumentException("Property not found");
        }
        Property property = propertyOptional.get();

        if (property.isSold()) {
            throw new IllegalArgumentException("Property has already been sold");
        }

        if (!Objects.equals(property.getDepositPayment(), transactionDto.getTransactionAmount())) {
            throw new IllegalArgumentException("Incorrect amount provided for the property");
        }

        Transaction transaction = TransactionMapper.maptoTransaction(transactionDto);
        transaction.setClient(client);
        transaction.setAgent(agent);
        transaction.setProperty(property);

        Transaction savedTransaction = transactionRepository.save(transaction);
        return TransactionMapper.maptoTransactionDto(savedTransaction);
    }

    @Override
    public List<TransactionDto> getTransactionByUserId(Long userId) throws Exception {
        User agent = userRepository.findByUserid(userId);

        List<Transaction> transactions = transactionRepository.findByAgent(agent);

        return transactions.stream().map(TransactionMapper::maptoTransactionDto).collect(Collectors.toList());
    }



    @Override
    public TransactionDto completeTransaction(Long transactionId) throws Exception {
        Optional<Transaction> transactionOptional = transactionRepository.findById(transactionId);
        if (transactionOptional.isPresent()) {
            Transaction transaction = transactionOptional.get();
            transaction.setTransactionStatus(STATUS.COMPLETED);
            transactionRepository.save(transaction);

            // Mark the property as sold
            Optional<Property> propertyOptional = propertyRepository.findById(transaction.getProperty().getPropertyId());
            if (propertyOptional.isPresent()) {
                Property property = propertyOptional.get();
                property.setSold(true);
                property.setOccupancyStatus("sold");
                propertyRepository.save(property);
            }

            return TransactionMapper.maptoTransactionDto(transaction);
        } else {
            throw new Exception("Transaction not found");
        }
    }
//
//
//
//    @Override
//    public List<TransactionDto> getTransactionsByClient(Long clientId) {
//        List<Transaction> transactions = transactionRepository.findByClientId(clientId);
//        return transactions.stream().map(TransactionMapper::maptoTransactionDto).collect(Collectors.toList());
//    }
//
//    @Override
//    public List<TransactionDto> getTransactionsByProperty(Long propertyId) {
//        List<Transaction> transactions = transactionRepository.findByPropertyId(propertyId);
//        return transactions.stream().map(TransactionMapper::maptoTransactionDto).collect(Collectors.toList());
//    }
}