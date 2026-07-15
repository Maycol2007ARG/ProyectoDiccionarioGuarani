package com.guarani.controller;

import com.guarani.dto.WordDTO;
import com.guarani.dto.WordSearchResult;
import com.guarani.service.HistoryService;
import com.guarani.service.WordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/words")
@RequiredArgsConstructor
public class WordController {

    private final WordService wordService;
    private final HistoryService historyService;

    @GetMapping("/search")
    public ResponseEntity<WordSearchResult> searchWords(
            @RequestParam String q,
            @RequestParam(defaultValue = "es") String lang,
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            WordSearchResult result = wordService.searchWords(q, lang);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<WordDTO> getWordById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            WordDTO word = wordService.getWordById(id);
            return ResponseEntity.ok(word);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<WordDTO>> getWordsByCategory(
            @PathVariable Long categoryId,
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            List<WordDTO> words = wordService.getWordsByCategory(categoryId);
            return ResponseEntity.ok(words);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/level/{level}")
    public ResponseEntity<List<WordDTO>> getWordsByLevel(
            @PathVariable int level,
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            List<WordDTO> words = wordService.getWordsByLevel(level);
            return ResponseEntity.ok(words);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
