package com.s22460.medesthetic.dtos;

import com.s22460.medesthetic.entities.Holiday;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HolidayDTO {
    private Long id;
    private Long userId;
    private String empName;
    private LocalDate date;
    private String reason;

    public static HolidayDTO fromEntity(Holiday holiday) {
        HolidayDTO dto = new HolidayDTO();
        dto.id = holiday.getId();
        dto.userId = holiday.getUser().getId(); // employee
        dto.empName = holiday.getUser().getFirstName() + " " + holiday.getUser().getLastName();
        dto.date = holiday.getDate();
        dto.reason = holiday.getReason();
        return dto;
    }

}

