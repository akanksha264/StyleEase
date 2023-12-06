package com.ecom.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "product_id",nullable = false)
    private Product product;

    private double rating;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

}
