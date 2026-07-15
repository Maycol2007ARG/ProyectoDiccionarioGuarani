package com.guarani.controller;

import com.guarani.dto.PhraseDTO;
import com.guarani.service.PhraseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/phrases")
@RequiredArgsConstructor
public class PhraseController {

    private final PhraseService phraseService;

    @GetMapping("/day")
    public ResponseEntity<PhraseDTO> getPhraseOfDay() {
        try {
            PhraseDTO phrase = phraseService.getPhraseOfDay();
            return ResponseEntity.ok(phrase);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<PhraseDTO>> getPhrasesByCategory(@PathVariable String category) {
        try {
            List<PhraseDTO> phrases = phraseService.getPhrasesByCategory(category);
            return ResponseEntity.ok(phrases);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
