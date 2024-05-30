package com.s22460.medesthetic.controllers;

import com.s22460.medesthetic.dtos.HolidayDTO;
import com.s22460.medesthetic.services.HolidayService;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class HolidayController {

    private HolidayService holidayService;

    @PostMapping("/holidays/add")
    public ResponseEntity<HolidayDTO> addHoliday(@RequestBody HolidayDTO holidayDTO) {
        HolidayDTO addedHoliday = holidayService.addHoliday(holidayDTO);
        return new ResponseEntity<>(addedHoliday, HttpStatus.CREATED);
    }

    @GetMapping("/holidays/current-user")
    public ResponseEntity<List<HolidayDTO>> getHolidaysForCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        String userEmail = userDetails.getUsername();
        return ResponseEntity.ok(holidayService.getHolidaysForCurrentUser(userEmail));
    }


    @GetMapping("/holidays/employee/{userId}/date/{date}")
    public ResponseEntity<Map<String, Boolean>> isHoliday(
            @PathVariable Long userId,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        boolean isHoliday = holidayService.isHoliday(userId, date);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isHoliday", isHoliday);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/holidays")
    public ResponseEntity<List<HolidayDTO>> getAllHolidays() {
        return ResponseEntity.ok(holidayService.getAllHolidays());
    }

    @DeleteMapping("/holidays/delete/{holidayId}")
    public ResponseEntity<Void> deleteHoliday(@PathVariable Long holidayId) {
        holidayService.deleteHoliday(holidayId);
        return ResponseEntity.noContent().build();
    }

}
