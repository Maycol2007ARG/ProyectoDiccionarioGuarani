package com.guarani.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "phrases")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Phrase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String spanish;

    @Column(nullable = false)
    private String guarani;

    @Column(nullable = false)
    private String category;

    @Column(name = "difficulty_level", nullable = false)
    private int difficultyLevel = 1;
}
