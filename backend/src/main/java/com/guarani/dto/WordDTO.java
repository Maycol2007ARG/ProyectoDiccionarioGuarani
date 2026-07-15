package com.guarani.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WordDTO {

    private Long id;
    private String spanish;
    private String guarani;
    private String audioUrl;
    private int difficultyLevel;
    private List<String> categories;
}
