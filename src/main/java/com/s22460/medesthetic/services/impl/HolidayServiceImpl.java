package com.s22460.medesthetic.services.impl;

import com.s22460.medesthetic.dtos.HolidayDTO;
import com.s22460.medesthetic.entities.Holiday;
import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.repository.HolidayRepository;
import com.s22460.medesthetic.repository.UserRepository;
import com.s22460.medesthetic.services.HolidayService;
import com.s22460.medesthetic.utils.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HolidayServiceImpl implements HolidayService {

    private final HolidayRepository holidayRepository;
    private final UserRepository userRepository;

    @Override
    public HolidayDTO addHoliday(HolidayDTO holidayDTO) {
        Holiday holiday = new Holiday();
        User employee = userRepository.findById(holidayDTO.getUserId())
                .orElseThrow(() -> new NotFoundException("Employee not found with ID: " + holidayDTO.getUserId()));
        holiday.setUser(employee);
        holiday.setDate(holidayDTO.getDate());
        holiday.setReason(holidayDTO.getReason());
        holiday = holidayRepository.save(holiday);
        return HolidayDTO.fromEntity(holiday);
    }

    @Override
    public List<HolidayDTO> getHolidaysForCurrentUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new NotFoundException("User not found with email: " + userEmail));
        return holidayRepository.findByUserId(user.getId()).stream()
                .map(HolidayDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public boolean isHoliday(Long userId, LocalDate date) {
        return holidayRepository.existsByUserIdAndDate(userId, date);
    }

    public List<HolidayDTO> getAllHolidays() {
        return holidayRepository.findAll().stream()
                .map(HolidayDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public void deleteHoliday(Long holidayId) {
        holidayRepository.deleteById(holidayId);
    }

}
