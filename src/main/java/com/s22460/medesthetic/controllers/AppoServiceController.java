package com.s22460.medesthetic.controllers;

import com.s22460.medesthetic.dtos.AppoServiceDTO;
import com.s22460.medesthetic.entities.AppoService;
import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.services.AppoServiceService;
import com.s22460.medesthetic.utils.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class AppoServiceController {

    private final AppoServiceService appoServiceService;

    @GetMapping
    public ResponseEntity<?> getAllServices() {
        try {
            List<AppoService> appoServices = appoServiceService.getAllServices();
            if (appoServices.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No services found");
            }
            return ResponseEntity.ok(appoServices);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve services");
        }
    }


    @PostMapping("/add")
    public ResponseEntity<AppoService> addService(@RequestBody AppoService appoService) {
        AppoService addedAppoService = appoServiceService.addService(appoService);
        return new ResponseEntity<>(addedAppoService, HttpStatus.CREATED);
    }

    @GetMapping("/{serviceId}")
    public ResponseEntity<?> getServiceById(@PathVariable Long serviceId) {
        try {
            AppoService service = appoServiceService.getServiceById(serviceId);
            return ResponseEntity.ok(service);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Service not found");
        }
    }


    @PostMapping("/assign/{userId}/{serviceId}")
    public ResponseEntity<String> assignServiceToUser(@PathVariable("userId") Long userId, @PathVariable("serviceId") Long serviceId) {
        appoServiceService.assignServiceToUser(userId, serviceId);
        return ResponseEntity.ok("Service assigned to user successfully");
    }

}
