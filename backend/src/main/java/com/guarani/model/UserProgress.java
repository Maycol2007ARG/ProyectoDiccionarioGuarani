package com.guarani.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "user_progress")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProgress {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Column(nullable = false)
    private int level = 1;

    @Column(nullable = false)
    private int xp = 0;

    @Column(name = "words_learned", nullable = false)
    private int wordsLearned = 0;

    @Column(name = "quizzes_completed", nullable = false)
    private int quizzesCompleted = 0;

    @Column(name = "current_streak", nullable = false)
    private int currentStreak = 0;

    @Column(name = "last_active_date")
    private LocalDate lastActiveDate;
}
