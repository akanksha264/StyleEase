package com.ecom.backend.requests;

import com.ecom.backend.models.Color;
import com.ecom.backend.models.Size;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class ProductRequest {

    private String title;
    private String description;
    private int price;
    private int discountedPrice;
    private String brand;
    private Set<Color> colors=new HashSet<>();
    private String imageUrl;
    private String topLevelCategory;
    private String secondLevelCategory;
    private String thirdLevelCategory;

}
