package com.example.rms.service;

import com.example.rms.dto.LoginDto;
import com.example.rms.dto.UserDto;
import com.example.rms.entity.ROLE;

import java.util.List;

//import java.util.List;

public interface UserService {

    UserDto addUser(UserDto userDto);
    boolean validateUser(LoginDto loginDto);
    UserDto getUserByUsername(String username);
    UserDto getUserById(Long userId);
//    UserDto updateUser(UserDto userDto);
//    List<UserDto> getAllUsers();
//    void deleteUser(long id);
    List<UserDto> getUserByRole(ROLE role);
    UserDto getUserByEmail(String email);
    boolean sendPasswordResetLink(String email);
    boolean resetPassword(String token, String password);
}
