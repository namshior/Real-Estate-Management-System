package com.example.rms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "properties")
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long propertyId;

    @Column(nullable = false, length = 30)
    private String propertyName;

    @Column(nullable = false, length = 30)
    private String propertyType;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private double size;

    @Column(nullable = false)
    private Long price;

    @Column(nullable = false, length = 30)
    private String occupancyStatus;

    @Column(nullable = false)
    private Date closingDate;

    @Column(nullable = false)
    private Long depositPayment;

    @Column(nullable = false, length = 2000)
    private String description;

    @Lob
    @Column(nullable = false, columnDefinition = "LONGBLOB")
    private byte[] propertyImage;

    @Column(nullable = false)
    private String createdBy;

    @Column(nullable = false)
    private boolean sold = false;

    public Property(Long propertyId) {
        this.propertyId = propertyId;
    }

}
