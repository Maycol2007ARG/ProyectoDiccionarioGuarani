package com.guarani.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "quizzes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "question_word_id", nullable = false)
    private Long questionWordId;

    @Column(name = "option1_id", nullable = false)
    private Long option1Id;

    @Column(name = "option2_id", nullable = false)
    private Long option2Id;

    @Column(name = "option3_id", nullable = false)
    private Long option3Id;

    @Column(name = "option4_id", nullable = false)
    private Long option4Id;

    @Column(name = "correct_option_id", nullable = false)
    private Long correctOptionId;

    @Column(nullable = false)
    private boolean answered = false;

    @Column(name = "user_answer")
    private Long userAnswer;

    @Column(name = "is_correct")
    private Boolean isCorrect;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
