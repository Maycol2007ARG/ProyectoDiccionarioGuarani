package com.guarani.service;

import com.guarani.dto.ProgressDTO;
import com.guarani.model.UserProgress;
import com.guarani.repository.UserProgressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProgressService {

    private final UserProgressRepository userProgressRepository;

    public ProgressDTO getProgress(Long userId) {
        UserProgress progress = userProgressRepository.findByUserId(userId)
                .orElseGet(() -> {
                    UserProgress newProgress = new UserProgress();
                    newProgress.setUserId(userId);
                    newProgress.setLevel(1);
                    newProgress.setXp(0);
                    newProgress.setWordsLearned(0);
                    newProgress.setQuizzesCompleted(0);
                    newProgress.setCurrentStreak(0);
                    newProgress.setLastActiveDate(LocalDate.now());
                    return userProgressRepository.save(newProgress);
                });

        return new ProgressDTO(
                progress.getLevel(),
                progress.getXp(),
                progress.getWordsLearned(),
                progress.getQuizzesCompleted(),
                progress.getCurrentStreak()
        );
    }

    @Transactional
    public void addXP(Long userId, int xp) {
        UserProgress progress = getOrCreateProgress(userId);

        int newXP = progress.getXp() + xp;
        progress.setXp(newXP);

        if (newXP <= 50) {
            progress.setLevel(1);
        } else if (newXP <= 200) {
            progress.setLevel(2);
        } else {
            progress.setLevel(3);
        }

        updateStreak(progress);
        userProgressRepository.save(progress);
    }

    @Transactional
    public void incrementWordsLearned(Long userId) {
        UserProgress progress = getOrCreateProgress(userId);
        progress.setWordsLearned(progress.getWordsLearned() + 1);
        updateStreak(progress);
        userProgressRepository.save(progress);
    }

    @Transactional
    public void incrementQuizzesCompleted(Long userId) {
        UserProgress progress = getOrCreateProgress(userId);
        progress.setQuizzesCompleted(progress.getQuizzesCompleted() + 1);
        updateStreak(progress);
        userProgressRepository.save(progress);
    }

    private UserProgress getOrCreateProgress(Long userId) {
        return userProgressRepository.findByUserId(userId).orElseGet(() -> {
            UserProgress newProgress = new UserProgress();
            newProgress.setUserId(userId);
            newProgress.setLevel(1);
            newProgress.setXp(0);
            newProgress.setWordsLearned(0);
            newProgress.setQuizzesCompleted(0);
            newProgress.setCurrentStreak(0);
            newProgress.setLastActiveDate(LocalDate.now());
            return userProgressRepository.save(newProgress);
        });
    }

    private void updateStreak(UserProgress progress) {
        LocalDate today = LocalDate.now();
        LocalDate lastActive = progress.getLastActiveDate();

        if (lastActive == null) {
            progress.setCurrentStreak(1);
        } else if (lastActive.equals(today)) {
            return;
        } else if (lastActive.equals(today.minusDays(1))) {
            progress.setCurrentStreak(progress.getCurrentStreak() + 1);
        } else {
            progress.setCurrentStreak(1);
        }
        progress.setLastActiveDate(today);
    }
}
