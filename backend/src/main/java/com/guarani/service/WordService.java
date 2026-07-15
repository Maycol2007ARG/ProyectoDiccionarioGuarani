package com.guarani.service;

import com.guarani.dto.WordDTO;
import com.guarani.dto.WordSearchResult;
import com.guarani.model.Word;
import com.guarani.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WordService {

    private final WordRepository wordRepository;

    public WordSearchResult searchWords(String query, String lang) {
        List<Word> words;

        if ("gn".equals(lang)) {
            words = wordRepository.searchByGuarani(query);
        } else {
            words = wordRepository.searchBySpanish(query);
        }

        List<WordDTO> wordDTOs = words.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        return new WordSearchResult(wordDTOs, wordDTOs.size());
    }

    public WordDTO getWordById(Long id) {
        Word word = wordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Word not found with id: " + id));
        return mapToDTO(word);
    }

    public List<WordDTO> getWordsByCategory(Long categoryId) {
        List<Word> words = wordRepository.findByCategoriesId(categoryId);
        return words.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<WordDTO> getWordsByLevel(int level) {
        List<Word> words = wordRepository.findByDifficultyLevel(level);
        return words.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<Word> getWordsByIds(List<Long> ids) {
        return wordRepository.findByIdIn(ids);
    }

    public WordDTO mapToDTO(Word word) {
        List<String> categoryNames = word.getCategories().stream()
                .map(cat -> cat.getName())
                .collect(Collectors.toList());

        return new WordDTO(
                word.getId(),
                word.getSpanish(),
                word.getGuarani(),
                word.getAudioUrl(),
                word.getDifficultyLevel(),
                categoryNames
        );
    }
}
