package com.guarani.controller;

import com.guarani.dto.QuizAnswerRequest;
import com.guarani.dto.QuizDTO;
import com.guarani.dto.QuizResultDTO;
import com.guarani.service.QuizService;
import com.guarani.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quiz")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<QuizDTO> generateQuiz(
            @RequestParam(defaultValue = "1") int level,
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            Long userId = userService.getUserIdByEmail(userDetails.getUsername());
            QuizDTO quiz = quizService.generateQuiz(level, userId);
            return ResponseEntity.ok(quiz);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/answer")
    public ResponseEntity<QuizResultDTO> submitAnswer(
            @Valid @RequestBody QuizAnswerRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            Long userId = userService.getUserIdByEmail(userDetails.getUsername());
            QuizResultDTO result = quizService.submitAnswer(request.getQuizId(), request.getAnswerWordId(), userId);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
