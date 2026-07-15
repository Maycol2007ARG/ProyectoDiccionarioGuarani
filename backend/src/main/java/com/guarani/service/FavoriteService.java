package com.guarani.service;

import com.guarani.dto.WordDTO;
import com.guarani.model.Favorite;
import com.guarani.model.Word;
import com.guarani.repository.FavoriteRepository;
import com.guarani.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final WordRepository wordRepository;
    private final WordService wordService;
    private final AchievementService achievementService;

    @Transactional
    public void addFavorite(Long userId, Long wordId) {
        if (favoriteRepository.existsByUserIdAndWordId(userId, wordId)) {
            throw new RuntimeException("Word already in favorites");
        }

        if (!wordRepository.existsById(wordId)) {
            throw new RuntimeException("Word not found with id: " + wordId);
        }

        Favorite favorite = new Favorite();
        favorite.setUserId(userId);
        favorite.setWordId(wordId);
        favoriteRepository.save(favorite);

        achievementService.checkAndUnlockAchievements(userId);
    }

    @Transactional
    public void removeFavorite(Long userId, Long wordId) {
        favoriteRepository.deleteByUserIdAndWordId(userId, wordId);
    }

    public List<WordDTO> getUserFavorites(Long userId) {
        List<Favorite> favorites = favoriteRepository.findByUserIdOrderByCreatedAtDesc(userId);

        List<Long> wordIds = favorites.stream()
                .map(Favorite::getWordId)
                .collect(Collectors.toList());

        if (wordIds.isEmpty()) {
            return List.of();
        }

        List<Word> words = wordRepository.findByIdIn(wordIds);
        return words.stream()
                .map(wordService::mapToDTO)
                .collect(Collectors.toList());
    }
}
