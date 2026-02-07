package com.example.G1.backend.dto;

import lombok.*;

@Data
@Builder
public class UserResponse {
    private Long userID;
    private String username;
    private String email;
    private String phoneNumber;
}
