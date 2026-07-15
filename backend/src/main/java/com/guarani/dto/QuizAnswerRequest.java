package com.guarani.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizAnswerRequest {

    @NotNull(message = "Quiz ID is required")
    private Long quizId;

    @NotNull(message = "Answer word ID is required")
    private Long answerWordId;
}
