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

    public static AppoServiceDTO fromEntity(AppoService appoService) {
        AppoServiceDTO dto = new AppoServiceDTO();
        dto.setId(appoService.getId());
        dto.setServiceName(appoService.getServiceName());
        dto.setDuration(appoService.getDuration());
        dto.setPrice(appoService.getPrice());
        return dto;
    }
}

