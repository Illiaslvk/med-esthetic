package com.s22460.medesthetic.dtos.auth;

import lombok.Data;

@Data
public class SigninRequest {
    private String email;
    private String password;
}
