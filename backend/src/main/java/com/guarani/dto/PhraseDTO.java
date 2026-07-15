package com.guarani.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PhraseDTO {

    private Long id;
    private String spanish;
    private String guarani;
    private String category;
    private int difficultyLevel;
}
