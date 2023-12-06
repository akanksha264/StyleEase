package com.ecom.backend.requests;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class UserRequest {

    private String firstName;
    private String lastName;
    private String password;
    private String email;
    private String mobile;

}
