package com.example.G1.backend.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.G1.backend.dto.LoginRequest;
import com.example.G1.backend.dto.RegisterRequest;
import com.example.G1.backend.service.AuthService;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        try {
            authService.register(request);
            return ResponseEntity.ok(
                    Map.of("message", "User registered successfully")
            );

        } catch (RuntimeException e) {

            // Duplicate email or username
            if (e.getMessage().contains("Email") || e.getMessage().contains("Username")) {
                return ResponseEntity.status(409)
                        .body(Map.of("message", e.getMessage()));
            }

            // Other errors
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }




    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
        try {
            Map<String, String> response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }

    
}
