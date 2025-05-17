package com.example.rms.dto;

import com.example.rms.entity.STATUS;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDto {

    private Long transactionId;
    private Long clientId;
    private Long agentId;
    private Long propertyId;
    private Date transactionDate;
    private Long transactionAmount;
    private STATUS transactionStatus;
}