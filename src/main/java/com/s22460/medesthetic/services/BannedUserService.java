package com.s22460.medesthetic.services;

import com.s22460.medesthetic.dtos.BannedUserDTO;

import java.util.List;

public interface BannedUserService {
    List<BannedUserDTO> getAllBannedUsers();
}
