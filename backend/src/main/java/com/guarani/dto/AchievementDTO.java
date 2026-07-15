package com.guarani.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AchievementDTO {

    private Long id;
    private String name;
    private String description;
    private String icon;
    private boolean unlocked;
    private String unlockedAt;
}
