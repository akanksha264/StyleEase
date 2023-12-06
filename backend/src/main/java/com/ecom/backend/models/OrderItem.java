package com.ecom.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonIgnore
    @ManyToOne
    private Order order;

    @ManyToOne
    private Product product;

    private String size;

    private String color;

    private int quantity;

    private Integer price;

    @Column(name = "discounted_price")
    private Integer discountedPrice;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "delivery_date")
    private LocalDateTime deliveryDate;

}
