package com.example.rms.service;

import com.example.rms.dto.TransactionDto;

import java.util.List;

public interface TransactionService {

    TransactionDto saveTransaction(TransactionDto transactionDto) throws Exception;
    List<TransactionDto> getTransactionByUserId(Long userId) throws Exception;

//    List<TransactionDto> getTransactionsByClient(Long clientId);
//
//    List<TransactionDto> getTransactionsByProperty(Long propertyId);
//
    TransactionDto completeTransaction(Long transactionId) throws Exception;
//
}