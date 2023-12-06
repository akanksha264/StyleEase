package com.ecom.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Objects;

@Entity
@Data
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonIgnore
    @ManyToOne
    private Cart cart;

    @ManyToOne
    private Product product;

    private String size;

    private String color;

    private int quantity;

    private Integer price;

    private Integer discountedPrice;

    @Column(name = "user_id")
    private Long userId;

    public int hashCode() {
        return Objects.hash(id, product, size, color, quantity, price, discountedPrice, userId);
    }

}
