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

    public static AppoServiceDTO fromEntity(AppoService appoService) {
        AppoServiceDTO dto = new AppoServiceDTO();
        dto.setId(appoService.getId());
        dto.setServiceName(appoService.getServiceName());
        return dto;
    }
}

