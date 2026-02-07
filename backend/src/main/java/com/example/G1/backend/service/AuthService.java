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
    

    public boolean passwordMatches(String rawPassword, String encodedPassword) {
    return passwordEncoder.matches(rawPassword, encodedPassword);
}

    public void register(RegisterRequest request) {

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .phoneNumber(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .isActive(true)
                .build();

        userRepository.save(user);
    }

  
    public Map<String, String> login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtService.generateToken(user.getUsername());
        return Map.of("token", token);
    }

    public Optional<User> findByUsername(String username){
        return userRepository.findByUsername(username);
    }

     
}
