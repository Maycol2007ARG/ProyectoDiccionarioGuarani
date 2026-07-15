package com.guarani.controller;

import com.guarani.dto.ProgressDTO;
import com.guarani.service.ProgressService;
import com.guarani.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
public class ProgressController {

    private final ProgressService progressService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<ProgressDTO> getProgress(
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            Long userId = userService.getUserIdByEmail(userDetails.getUsername());
            ProgressDTO progress = progressService.getProgress(userId);
            return ResponseEntity.ok(progress);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
