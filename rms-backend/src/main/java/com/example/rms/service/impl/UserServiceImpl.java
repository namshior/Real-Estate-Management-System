package com.example.rms.service.impl;


import com.example.rms.dto.LoginDto;
import com.example.rms.dto.UserDto;
import com.example.rms.entity.PasswordResetToken;
import com.example.rms.entity.ROLE;
import com.example.rms.entity.User;
import com.example.rms.mapper.UserMapper;
import com.example.rms.repository.PasswordResetTokenRepository;
import com.example.rms.repository.UserRepository;
import com.example.rms.service.EmailSenderService;
import com.example.rms.service.UserService;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.mail.MessagingException;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final EmailSenderService emailSenderService;
    private final PasswordResetTokenRepository tokenRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository,  EmailSenderService emailSenderService, PasswordResetTokenRepository tokenRepository) {
        this.userRepository = userRepository;
        this.emailSenderService = emailSenderService;
        this.tokenRepository = tokenRepository;
    }


    @Override
    public UserDto addUser(UserDto userDto) {

        User user = UserMapper.maptoUser(userDto);
        User savedUser = userRepository.save(user);

        return UserMapper.maptoUserDto(savedUser);
    }

    public boolean validateUser(LoginDto loginDto) {
        Optional<User> userOptional = userRepository.findByUsernameAndPasswordAndRole(loginDto.getUsername(), loginDto.getPassword(), loginDto.getRole());
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            return user.getPassword().equals(loginDto.getPassword());
        }

        return false;
    }

    @Override
    public UserDto getUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        return UserMapper.maptoUserDto(user);
    }

    @Override
    public UserDto getUserById(Long userId) {
        User user = userRepository.findByUserid(userId);
        return UserMapper.maptoUserDto(user);
    }

    @Override
    public List<UserDto> getUserByRole(ROLE role) {
        List<User> users = userRepository.findByRole(role);
        return users.stream().map(UserMapper::maptoUserDto).collect(Collectors.toList());
    }

//    @Override
//    public UserDto getUserByEmail(String email) {
//        User users = userRepository.findByEmail(email);
//
//        return UserMapper.maptoUserDto(users);
//    }
    
    @Override
    public UserDto getUserByEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email); // Returns Optional<User>
        if (userOptional.isPresent()) { // Check if User is present
            User user = userOptional.get(); // Get the User object
            return UserMapper.maptoUserDto(user);
        }
        return null; // Or handle the case where User is not found
    }

    
    @Override
    public boolean sendPasswordResetLink(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            String resetToken = UUID.randomUUID().toString();
            String resetLink = "http://localhost:5173/reset-password?token=" + resetToken;
            try {
                emailSenderService.sendPasswordResetEmail(email, resetLink);
                PasswordResetToken token = new PasswordResetToken();
                token.setToken(resetToken);
                token.setEmail(email);
                tokenRepository.save(token); // Save the token
                return true;
            } catch (MessagingException e) {
                e.printStackTrace();
            }
        }
        return false;
    }
    @Override
    @Transactional
    public boolean resetPassword(String token, String password) {
        Optional<PasswordResetToken> tokenOptional = tokenRepository.findByToken(token);
        if (tokenOptional.isPresent()) {
            PasswordResetToken resetToken = tokenOptional.get();
            Optional<User> userOptional = userRepository.findByEmail(resetToken.getEmail());
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                user.setPassword(password);
                userRepository.save(user);
                tokenRepository.deleteByToken(token); // Remove the token after use
                return true;
            }
        }
        return false;
    }
}
