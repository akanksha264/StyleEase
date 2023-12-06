package com.ecom.backend.responses;

import lombok.Data;

@Data
public class AuthResponse {

    private String jwt;
    private String message;

}
