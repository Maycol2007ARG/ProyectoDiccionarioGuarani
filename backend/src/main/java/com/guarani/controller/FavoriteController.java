package com.guarani.controller;

import com.guarani.dto.WordDTO;
import com.guarani.service.FavoriteService;
import com.guarani.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteService;
    private final UserService userService;

    @PostMapping("/{wordId}")
    public ResponseEntity<Map<String, String>> addFavorite(
            @PathVariable Long wordId,
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            Long userId = userService.getUserIdByEmail(userDetails.getUsername());
            favoriteService.addFavorite(userId, wordId);
            return ResponseEntity.ok(Map.of("message", "Word added to favorites"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{wordId}")
    public ResponseEntity<Map<String, String>> removeFavorite(
            @PathVariable Long wordId,
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            Long userId = userService.getUserIdByEmail(userDetails.getUsername());
            favoriteService.removeFavorite(userId, wordId);
            return ResponseEntity.ok(Map.of("message", "Word removed from favorites"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<WordDTO>> getFavorites(
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            Long userId = userService.getUserIdByEmail(userDetails.getUsername());
            List<WordDTO> favorites = favoriteService.getUserFavorites(userId);
            return ResponseEntity.ok(favorites);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
