package com.s22460.medesthetic.services.impl;

import com.s22460.medesthetic.dtos.BannedUserDTO;
import com.s22460.medesthetic.repository.BannedUserRepository;
import com.s22460.medesthetic.services.BannedUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BannedUserServiceImpl implements BannedUserService {
    private final BannedUserRepository bannedUserRepository;

    @Override
    public List<BannedUserDTO> getAllBannedUsers() {
        return bannedUserRepository.findAllBannedUsers();
    }
}