package com.example.rms.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "client_id", nullable = false)
    private User client;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "agent_id", nullable = false)
    private User agent;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    @Column(nullable = false)
    @CreationTimestamp
    private Date transactionDate;

    @Column(nullable = false)
    private Long transactionAmount;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private STATUS transactionStatus;
}