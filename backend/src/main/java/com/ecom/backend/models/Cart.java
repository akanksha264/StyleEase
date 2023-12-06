package com.ecom.backend.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Data
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    @OneToMany(mappedBy = "cart",cascade = CascadeType.ALL,orphanRemoval = true)
    @Column(name = "cart_items")
    private Set<CartItem> cartItems=new HashSet<>();

    @Column(name = "total_price")
    private Integer totalPrice;

    @Column(name = "total_items")
    private int totalItems;

    @Column(name = "total_discounted_price")
    private Integer totalDiscountedPrice;

    private Integer discount;

    @Override
    public int hashCode() {
        return Objects.hash(id, user, totalItems, totalDiscountedPrice, discount);
    }

}
