package com.s22460.medesthetic.services;

import com.s22460.medesthetic.dtos.HolidayDTO;

import java.time.LocalDate;
import java.util.List;

public interface HolidayService {
    HolidayDTO addHoliday(HolidayDTO holidayDTO);
    List<HolidayDTO> getHolidaysForCurrentUser(String userEmail);
    boolean isHoliday(Long userId, LocalDate date);
    List<HolidayDTO> getAllHolidays();
    void deleteHoliday(Long holidayId);

}
