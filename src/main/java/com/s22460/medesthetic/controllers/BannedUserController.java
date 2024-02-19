package com.s22460.medesthetic.controllers;

import com.s22460.medesthetic.dtos.BannedUserDTO;
import com.s22460.medesthetic.services.BannedUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/bannedUsers")
@RequiredArgsConstructor
public class BannedUserController {

    private final BannedUserService bannedUserService;

    @GetMapping
    public List<BannedUserDTO> getAllBannedUsers() {
        return bannedUserService.getAllBannedUsers();
    }
}
