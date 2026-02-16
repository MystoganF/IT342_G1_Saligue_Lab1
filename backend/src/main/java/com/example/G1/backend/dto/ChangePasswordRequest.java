package com.example.G1.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class ChangePasswordRequest {
    private String oldPassword;
    private String newPassword;
}