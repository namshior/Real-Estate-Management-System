package com.example.rms.controller;

import com.example.rms.dto.UserDto;
import com.example.rms.entity.ROLE;
import com.example.rms.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins ="http://localhost:5173") // Allow requests from this origin
public class UserController {

    private final UserService userService;

    // Constructor Injection
    public UserController(UserService userService) {
        this.userService = userService;
    }


//    Add User REST API
    @PostMapping("/signup")
    public ResponseEntity<UserDto> addUser(@RequestBody UserDto userDto) {
        UserDto savedUser = userService.addUser(userDto);
        return ResponseEntity.ok(savedUser);
    }

//    get users by role
    @GetMapping("/{role}")
    public ResponseEntity<List<UserDto>> getUserByRole(@PathVariable("role")ROLE role) {
        List<UserDto> users = userService.getUserByRole(role);
        return ResponseEntity.ok(users);
    }

//    get users by name
    @GetMapping("/name/{username}")
    public ResponseEntity<UserDto> getUserByUsername(@PathVariable("username")String username) {
        UserDto user = userService.getUserByUsername(username);
        return ResponseEntity.ok(user);
    }

//    get users by id
    @GetMapping("/id/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("userId")Long userId) {
        UserDto user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

//    get users by email
    @GetMapping("/email/{email}")
    public ResponseEntity<UserDto> getUserByEmail(@PathVariable("email")String email) {
        UserDto user = userService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }
    
    @PostMapping("/forgot-password")
    public Map<String, Object> forgotPassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        boolean isSent = userService.sendPasswordResetLink(email);

        Map<String, Object> response = new HashMap<>();
        if (isSent) {
            response.put("success", true);
            response.put("message", "A password reset link has been sent to your email.");
        } else {
            response.put("success", false);
            response.put("message", "Email not found. Please sign up or check your email.");
        }

        return response;
    } 

    
    @PostMapping("/reset-password")
    public Map<String, Object> resetPassword(@RequestBody Map<String, String> payload) {
        String token = payload.get("token");
        String password = payload.get("password");
        boolean isReset = userService.resetPassword(token, password);

        Map<String, Object> response = new HashMap<>();
        if (isReset) {
            response.put("success", true);
            response.put("message", "Password has been reset successfully.");
        } else {
            response.put("success", false);
            response.put("message", "Failed to reset password. Invalid token.");
        }

        return response;
    }
}
