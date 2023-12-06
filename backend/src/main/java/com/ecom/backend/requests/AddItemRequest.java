package com.ecom.backend.requests;

import lombok.Data;

@Data
public class AddItemRequest {

    private Long productId;
    private String size;
    private String color;
    private int quantity;

}
