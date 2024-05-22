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
@RequestMapping("/api")
@RequiredArgsConstructor
public class AppoServiceController {

    private final AppoServiceService appoServiceService;

    @GetMapping("/services/admin/list")
    public ResponseEntity<?> getAllServices() {
        try {
            List<AppoService> appoServices = appoServiceService.getAllServices();
            if (appoServices.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No services found");
            }

            List<AppoServiceDTO> serviceDTOs = appoServices.stream()
                    .map(AppoServiceDTO::fromEntity)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(serviceDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve services");
        }
    }

    @PostMapping("/services/add")
    public ResponseEntity<AppoService> addService(@RequestBody AppoServiceDTO appoServiceDTO) {
        AppoService appoService = new AppoService();
        appoService.setServiceName(appoServiceDTO.getServiceName());
        appoService.setDuration(appoServiceDTO.getDuration());
        appoService.setPrice(appoServiceDTO.getPrice());
        appoService.setDescription(appoServiceDTO.getDescription());
        AppoService addedAppoService = appoServiceService.addService(appoService);
        return new ResponseEntity<>(addedAppoService, HttpStatus.CREATED);
    }

    @GetMapping("/services/{serviceId}")
    public ResponseEntity<?> getServiceById(@PathVariable Long serviceId) {
        try {
            AppoService service = appoServiceService.getServiceById(serviceId);
            return ResponseEntity.ok(service);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Service not found");
        }
    }

    @PutMapping("/services/{serviceId}")
    public ResponseEntity<?> updateService(@PathVariable Long serviceId, @RequestBody AppoServiceDTO updatedServiceDTO) {
        try {
            AppoService updatedService = appoServiceService.updateService(serviceId, updatedServiceDTO);
            return ResponseEntity.ok(updatedService);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }


    @PostMapping("/services/assign/{userId}/{serviceId}")
    public ResponseEntity<String> assignServiceToUser(@PathVariable("userId") Long userId, @PathVariable("serviceId") Long serviceId) {
        appoServiceService.assignServiceToUser(userId, serviceId);
        return ResponseEntity.ok("Service assigned to user successfully");
    }

    @DeleteMapping("/services/delete/{serviceId}")
    public ResponseEntity<?> deleteService(@PathVariable Long serviceId) {
        try {
            appoServiceService.deleteService(serviceId);
            return ResponseEntity.ok("Service deleted successfully");
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}
