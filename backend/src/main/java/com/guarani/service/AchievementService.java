package com.guarani.service;

import com.guarani.dto.AchievementDTO;
import com.guarani.model.Achievement;
import com.guarani.model.UserAchievement;
import com.guarani.model.UserProgress;
import com.guarani.repository.AchievementRepository;
import com.guarani.repository.FavoriteRepository;
import com.guarani.repository.UserAchievementRepository;
import com.guarani.repository.UserProgressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AchievementService {

    private final AchievementRepository achievementRepository;
    private final UserAchievementRepository userAchievementRepository;
    private final UserProgressRepository userProgressRepository;
    private final FavoriteRepository favoriteRepository;

    public List<AchievementDTO> getUserAchievements(Long userId) {
        List<Achievement> allAchievements = achievementRepository.findAllByOrderByNameAsc();

        return allAchievements.stream()
                .map(achievement -> {
                    boolean unlocked = userAchievementRepository.existsByUserIdAndAchievementId(userId, achievement.getId());
                    UserAchievement userAchievement = unlocked ?
                            userAchievementRepository.findByUserId(userId).stream()
                                    .filter(ua -> ua.getAchievementId().equals(achievement.getId()))
                                    .findFirst().orElse(null) : null;

                    return new AchievementDTO(
                            achievement.getId(),
                            achievement.getName(),
                            achievement.getDescription(),
                            achievement.getIcon(),
                            unlocked,
                            userAchievement != null ? userAchievement.getUnlockedAt().toString() : null
                    );
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public void checkAndUnlockAchievements(Long userId) {
        List<Achievement> allAchievements = achievementRepository.findAll();
        UserProgress progress = userProgressRepository.findByUserId(userId).orElse(null);

        if (progress == null) return;

        for (Achievement achievement : allAchievements) {
            boolean alreadyUnlocked = userAchievementRepository.existsByUserIdAndAchievementId(userId, achievement.getId());
            if (alreadyUnlocked) continue;

            boolean conditionMet = false;

            switch (achievement.getConditionType()) {
                case "words_learned":
                    conditionMet = progress.getWordsLearned() >= achievement.getConditionValue();
                    break;
                case "quizzes_completed":
                    conditionMet = progress.getQuizzesCompleted() >= achievement.getConditionValue();
                    break;
                case "level_reached":
                    conditionMet = progress.getLevel() >= achievement.getConditionValue();
                    break;
                case "streak":
                    conditionMet = progress.getCurrentStreak() >= achievement.getConditionValue();
                    break;
                case "xp_earned":
                    conditionMet = progress.getXp() >= achievement.getConditionValue();
                    break;
                case "favorites_added":
                    long favCount = favoriteRepository.findByUserIdOrderByCreatedAtDesc(userId).size();
                    conditionMet = favCount >= achievement.getConditionValue();
                    break;
                default:
                    break;
            }

            if (conditionMet) {
                UserAchievement userAchievement = new UserAchievement();
                userAchievement.setUserId(userId);
                userAchievement.setAchievementId(achievement.getId());
                userAchievementRepository.save(userAchievement);
            }
        }
    }
}
