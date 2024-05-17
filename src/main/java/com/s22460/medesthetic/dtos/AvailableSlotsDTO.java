package com.s22460.medesthetic.dtos;

import lombok.Data;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AvailableSlotsDTO {
    private Long id;
    private DayOfWeek dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;
//    private LocalDate date;
//    private LocalTime startTime;
//    private LocalTime endTime;
}
