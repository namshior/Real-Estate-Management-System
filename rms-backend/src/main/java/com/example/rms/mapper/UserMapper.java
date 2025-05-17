package com.example.rms.mapper;


import com.example.rms.dto.UserDto;
import com.example.rms.entity.User;

public class UserMapper {
    public static UserDto maptoUserDto(User user) {
        return new UserDto(
                user.getUserid(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getPhone(),
                user.getRole()
        );
    }

    public static User maptoUser(UserDto userDto) {
        return new User(
                userDto.getUserid(),
                userDto.getUsername(),
                userDto.getEmail(),
                userDto.getPassword(),
                userDto.getPhone(),
                userDto.getRole()
        );
    }
}
