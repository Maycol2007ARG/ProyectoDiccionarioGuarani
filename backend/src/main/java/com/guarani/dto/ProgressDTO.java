package com.guarani.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProgressDTO {

    private int level;
    private int xp;
    private int wordsLearned;
    private int quizzesCompleted;
    private int currentStreak;
}
