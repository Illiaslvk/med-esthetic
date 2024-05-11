package com.s22460.medesthetic.services;

import com.s22460.medesthetic.entities.AppoService;

import java.util.List;

public interface AppoServiceService {

    List<AppoService> getAllServices();

    AppoService getServiceById(Long id);

    AppoService addService(AppoService appoService);

    //for appos booking
    List<AppoService> getServicesForUser(Long userId);

    void assignServiceToUser(Long userId, Long serviceId);
}
