package com.ecom.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
//@Entity
@Embeddable
public class Size {



    private String name;

    private int quantity;

    @Override
    public String toString(){
        return name+quantity;
    }

}
