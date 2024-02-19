package com.s22460.medesthetic.services.impl;

import com.s22460.medesthetic.entities.AppoService;
import com.s22460.medesthetic.repository.AppoServiceRepository;
import com.s22460.medesthetic.services.AppoServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppoServiceServiceImpl implements AppoServiceService {

    @Autowired
    private final AppoServiceRepository appoServiceRepository;

    @Override
    public List<AppoService> getAllServices() {
        return appoServiceRepository.findAll();
    }

    @Override
    public AppoService getServiceById(Long id) {
        return appoServiceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Service not found"));
    }

    @Override
    public AppoService addService(AppoService appoService) {
        return appoServiceRepository.save(appoService);
    }


}
