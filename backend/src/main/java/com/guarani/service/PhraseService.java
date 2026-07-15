package com.guarani.service;

import com.guarani.dto.PhraseDTO;
import com.guarani.model.Phrase;
import com.guarani.repository.PhraseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PhraseService {

    private final PhraseRepository phraseRepository;

    public PhraseDTO getPhraseOfDay() {
        Phrase phrase = phraseRepository.findRandomPhrase()
                .orElseThrow(() -> new RuntimeException("No phrases available"));
        return mapToDTO(phrase);
    }

    public List<PhraseDTO> getPhrasesByCategory(String category) {
        List<Phrase> phrases = phraseRepository.findByCategory(category);
        return phrases.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private PhraseDTO mapToDTO(Phrase phrase) {
        return new PhraseDTO(
                phrase.getId(),
                phrase.getSpanish(),
                phrase.getGuarani(),
                phrase.getCategory(),
                phrase.getDifficultyLevel()
        );
    }
}
