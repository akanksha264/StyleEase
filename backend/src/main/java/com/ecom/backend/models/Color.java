package com.ecom.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
public class Color {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;

    @ElementCollection
    @CollectionTable(name = "color_sizes", joinColumns = @JoinColumn(name = "color_id"))
    private Set<Size> sizes=new HashSet<>();

    public void setProduct(Product product) {
        this.product = product;
        if (product != null && !product.getColors().contains(this)) {
            product.getColors().add(this);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Color color = (Color) o;
        return id != null && id.equals(color.id);
    }

    @Override
    public int hashCode() {
//        return id.hashCode();
        return 31;
    }


}
