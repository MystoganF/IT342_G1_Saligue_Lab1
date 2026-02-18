package com.example.G1.backend.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.G1.backend.dto.LoginRequest;
import com.example.G1.backend.dto.RegisterRequest;
import com.example.G1.backend.entity.User;
import com.example.G1.backend.repository.UserRepository;
import com.example.G1.backend.security.JwtService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    /* ---------------- REGISTER ---------------- */

    public void register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail()))
            throw new RuntimeException("Email already exists");

        if (userRepository.existsByUsername(request.getUsername()))
            throw new RuntimeException("Username already exists");

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .phoneNumber(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .isActive(true)
                .build();

        userRepository.save(user);
    }

    /* ---------------- LOGIN ---------------- */

    public Map<String, String> login(LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword()))
            throw new RuntimeException("Invalid credentials");

        // ✅ TOKEN NOW USES USER ID
        String token = jwtService.generateToken(user.getUserID());

        return Map.of(
                "token", token,
                "username", user.getUsername() // optional but useful for UI
        );
    }

    /* ---------------- OPTIONAL HELPERS ---------------- */

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public void save(User user) {
        userRepository.save(user);
    }
}
