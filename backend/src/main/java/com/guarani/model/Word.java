package com.guarani.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "words")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Word {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String spanish;

    @Column(nullable = false)
    private String guarani;

    @Column(name = "search_key", nullable = false)
    private String searchKey;

    @Column(name = "audio_url")
    private String audioUrl;

    @Column(name = "difficulty_level", nullable = false)
    private int difficultyLevel = 1;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "word_category",
        joinColumns = @JoinColumn(name = "word_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories = new HashSet<>();
}
