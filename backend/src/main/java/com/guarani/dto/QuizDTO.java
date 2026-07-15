package com.guarani.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizDTO {

    private Long id;
    private WordDTO questionWord;
    private List<WordDTO> options;
    private boolean answered;
    private Long userAnswer;
    private Boolean correct;
}
