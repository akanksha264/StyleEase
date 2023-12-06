package com.ecom.backend.requests;

import lombok.Data;

@Data
public class RatingRequest {

    private Long productId;
    private double rating;

}
