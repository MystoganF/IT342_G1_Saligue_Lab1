package com.example.G1.backend.controller;
import java.util.Map;

import com.example.G1.backend.entity.User;
import com.example.G1.backend.security.JwtService;
import com.example.G1.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import com.example.G1.backend.service.UserService;
import com.example.G1.backend.dto.ChangePasswordRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.security.crypto.password.PasswordEncoder;



@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;
    private final AuthService authService;

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
                payload.get("username"),
                payload.get("email"),
                payload.get("phoneNumber")
        );

        return ResponseEntity.ok(Map.of("message", "Profile updated successfully"));
    }



    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ChangePasswordRequest request) {

        userService.changePassword(authHeader, request.getOldPassword(), request.getNewPassword());
        return ResponseEntity.ok(Map.of("message", "Password changed successfully"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.replace("Bearer ", "");

        User user = authService.getAuthenticatedUser(token);

        return ResponseEntity.ok(Map.of(
                "username", user.getUsername(),
                "email", user.getEmail(),
                "phoneNumber", user.getPhoneNumber()
        ));
    }
}

