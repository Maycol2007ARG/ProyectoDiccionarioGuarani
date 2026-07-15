package com.guarani.service;

import com.guarani.model.SearchHistory;
import com.guarani.repository.SearchHistoryRepository;
import com.guarani.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HistoryService {

    private final SearchHistoryRepository searchHistoryRepository;
    private final WordRepository wordRepository;

    @Transactional
    public void addToHistory(Long userId, Long wordId) {
        if (!wordRepository.existsById(wordId)) {
            throw new RuntimeException("Word not found with id: " + wordId);
        }

        SearchHistory history = new SearchHistory();
        history.setUserId(userId);
        history.setWordId(wordId);
        searchHistoryRepository.save(history);
    }

    public List<SearchHistory> getUserHistory(Long userId) {
        return searchHistoryRepository.findByUserIdOrderBySearchedAtDesc(userId);
    }
}
