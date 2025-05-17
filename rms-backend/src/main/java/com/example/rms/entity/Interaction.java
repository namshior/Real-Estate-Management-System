package com.example.rms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "interactions")
public class Interaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long interactionId;

    @ManyToOne()
    @JoinColumn(name = "client_id", nullable = false)
    private User client;

    @ManyToOne()
    @JoinColumn(name = "agent_id", nullable = false)
    private User agent;

    @ManyToOne()
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InteractionType interactionType;

    @Column(nullable = false)
    private String interactionText;

    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime interactionDate;
}
