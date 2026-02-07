package com.example.G1.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/me")
    public String me() {
        return "Protected user endpoint";
    }
}
