package com.s22460.medesthetic.services.impl;

import com.s22460.medesthetic.entities.AppoService;
import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.repository.AppoServiceRepository;
import com.s22460.medesthetic.repository.UserRepository;
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
    @Autowired
    private final UserRepository userRepository;

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

    @Override
    public List<AppoService> getServicesForUser(Long userId) {
        // Retrieve the user by their ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Retrieve services associated with the user
        List<AppoService> services = appoServiceRepository.findByUser(user);

        return services;
    }

    public void assignServiceToUser(Long userId, Long serviceId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        AppoService appoService = appoServiceRepository.findById(serviceId)
                .orElseThrow(() -> new IllegalArgumentException("Service not found with id: " + serviceId));

        // Set the user for the service
        appoService.setUser(user);

        // Add the service to the user's services
        //user.getServices().add(appoService);

        // Save both user and service
        userRepository.save(user);
        appoServiceRepository.save(appoService);
    }

    //@Override
    //    public List<AppoService> getServicesForEmployee() {
    //        // Retrieve services associated with users having the role of an employee
    //        List<AppoService> services = appoServiceRepository.findByUserRole(Role.EMPLOYEE);
    //        return services;
    //    }


}
