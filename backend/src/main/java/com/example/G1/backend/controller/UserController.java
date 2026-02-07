package com.example.G1.backend.controller;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import com.example.G1.backend.service.UserService;



@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getMyProfile(
            @RequestHeader("Authorization") String authHeader) {
        System.out.println(">>> /api/users/me HIT");       
        return ResponseEntity.ok(userService.getCurrentUserProfile(authHeader));
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateProfile(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, String> payload) {

        userService.updateProfile(
                authHeader,
                payload.get("email"),
                payload.get("phoneNumber")
        );
        System.out.println(">>> /api/users/me HIT");

        return ResponseEntity.ok(Map.of("message", "Profile updated successfully"));
    }
}

