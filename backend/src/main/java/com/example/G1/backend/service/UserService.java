package com.example.G1.backend.service;
import java.util.Map;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import com.example.G1.backend.entity.User;
import com.example.G1.backend.repository.UserRepository;
import com.example.G1.backend.security.JwtService;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

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
}
