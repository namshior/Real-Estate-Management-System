package com.example.rms.mapper;

import com.example.rms.dto.TransactionDto;
import com.example.rms.entity.Property;
import com.example.rms.entity.Transaction;
import com.example.rms.entity.User;
import org.aspectj.weaver.loadtime.Agent;

public class TransactionMapper {

    public static TransactionDto maptoTransactionDto(Transaction transaction) {
        return new TransactionDto(
                transaction.getTransactionId(),
                transaction.getClient().getUserid(),
                transaction.getAgent().getUserid(),
                transaction.getProperty().getPropertyId(),
                transaction.getTransactionDate(),
                transaction.getTransactionAmount(),
                transaction.getTransactionStatus()
        );
    }

    public static Transaction maptoTransaction(TransactionDto transactionDto) {
        return new Transaction(
                transactionDto.getTransactionId(),
                new User(transactionDto.getClientId()),
                new User(transactionDto.getAgentId()),
                new Property(transactionDto.getPropertyId()),
                transactionDto.getTransactionDate(),
                transactionDto.getTransactionAmount(),
                transactionDto.getTransactionStatus()
        );
    }
}
