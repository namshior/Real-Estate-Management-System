package com.example.rms.controller;

import com.example.rms.dto.TransactionDto;
import com.example.rms.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }


    @PostMapping("/add")
    public ResponseEntity<TransactionDto> saveTransaction(@RequestBody TransactionDto transactionDto) throws Exception {
        TransactionDto savedTransaction = transactionService.saveTransaction(transactionDto);
        return ResponseEntity.ok(savedTransaction);
    }

    @GetMapping("/get-by-agent-id/{userId}")
    public ResponseEntity<List<TransactionDto>> getTransactionByAgent(@PathVariable Long userId) throws Exception {
        List<TransactionDto> transactions = transactionService.getTransactionByUserId(userId);

        return ResponseEntity.ok(transactions);
    }

    @PutMapping("/complete/{transactionId}")
    public TransactionDto completeTransaction(@PathVariable Long transactionId) throws Exception {
        return transactionService.completeTransaction(transactionId);
    }
//
//    @GetMapping("/by-buyer/{clientId}")
//    public List<TransactionDto> getTransactionsByClient(@PathVariable Long clientId) {
//        return transactionService.getTransactionsByClient(clientId);
//    }
//
//    @GetMapping("/by-property/{propertyId}")
//    public List<TransactionDto> getTransactionsByProperty(@PathVariable Long propertyId) {
//        return transactionService.getTransactionsByProperty(propertyId);
//    }
}