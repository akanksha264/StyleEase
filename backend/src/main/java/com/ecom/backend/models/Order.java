package com.ecom.backend.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems=new ArrayList<>();

    @Column(name = "order_date")
    private LocalDateTime orderDate;

    @Column(name = "delivery_date")
    private LocalDateTime deliveryDate;

    @OneToOne
    private Address shippingAddress;

    @Embedded
    private PaymentDetails paymentDetails=new PaymentDetails();

    @Column(name = "total_price")
    private Integer totalPrice;

    @Column(name = "total_discounted_price")
    private Integer totalDiscountedPrice;

    private Integer discount;

    @Column(name = "order_status")
    private String orderStatus;

    @Column(name = "total_items")
    private int totalItems;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

}
