package com.ecom.backend.requests;

import lombok.Data;

@Data
public class ReviewRequest {

    private Long productId;
    private String review;

}
