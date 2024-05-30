package com.s22460.medesthetic.dtos;

import com.s22460.medesthetic.entities.AppoService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppoServiceDTO {
    private Long id;
    private String serviceName;
    private int duration;
    private String price;
    private String description;

    public static AppoServiceDTO fromEntity(AppoService appoService) {
        AppoServiceDTO dto = new AppoServiceDTO();
        dto.id = appoService.getId();
        dto.serviceName = appoService.getServiceName();
        dto.duration = appoService.getDuration();
        dto.price = appoService.getPrice();
        dto.description = appoService.getDescription();
        return dto;
    }

}

