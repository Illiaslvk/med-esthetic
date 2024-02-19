package com.s22460.medesthetic.controllers;

import com.s22460.medesthetic.entities.AppoService;
import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.services.AppoServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class AppoServiceController {

    private final AppoServiceService appoServiceService;

    @GetMapping
    public ResponseEntity<List<AppoService>> getAllServices() {
        List<AppoService> appoServices = appoServiceService.getAllServices();
        return new ResponseEntity<>(appoServices, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<AppoService> addService(@RequestBody AppoService appoService) {
        AppoService addedAppoService = appoServiceService.addService(appoService);
        return new ResponseEntity<>(addedAppoService, HttpStatus.CREATED);
    }

    @GetMapping("/{serviceId}")
    public ResponseEntity<AppoService> getServiceById(@PathVariable Long serviceId) {
        AppoService service = appoServiceService.getServiceById(serviceId);
        return ResponseEntity.ok(service);
    }


}
