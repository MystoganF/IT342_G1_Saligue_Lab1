package com.example.G1.backend.service;
import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import com.example.G1.backend.entity.User;
import com.example.G1.backend.repository.UserRepository;
import com.example.G1.backend.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
     private final PasswordEncoder passwordEncoder;

    public Map<String, Object> getCurrentUserProfile(String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String username = jwtService.extractUsername(token);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return Map.of(
                "username", user.getUsername(),
                "email", user.getEmail(),
                "phoneNumber", user.getPhoneNumber()
        );
    }

    public void updateProfile(String authHeader, String email, String phoneNumber) {
        String token = authHeader.replace("Bearer ", "");
        String username = jwtService.extractUsername(token);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setEmail(email);
        user.setPhoneNumber(phoneNumber);
        userRepository.save(user);
    }

    public void changePassword(String authHeader, String oldPassword, String newPassword) {
        String token = authHeader.replace("Bearer ", "");
        String username = jwtService.extractUsername(token);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Verify old password
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        // Encode new password
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
