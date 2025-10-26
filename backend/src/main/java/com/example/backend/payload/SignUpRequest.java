package com.example.backend.payload;


import lombok.Data;

@Data
public class SignUpRequest {
    private String username;
    private String password;
}
