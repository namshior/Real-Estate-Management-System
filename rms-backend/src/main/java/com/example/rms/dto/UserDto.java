package com.example.rms.dto;
import com.example.rms.entity.ROLE;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Long userid;
    private String username;
    private String email;
    private String password;
    private String phone;
    private ROLE role;
}
