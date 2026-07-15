package com.guarani.repository;

import com.guarani.model.Phrase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PhraseRepository extends JpaRepository<Phrase, Long> {

    List<Phrase> findByCategory(String category);

    @Query("SELECT p FROM Phrase p ORDER BY FUNCTION('RANDOM') LIMIT 1")
    Optional<Phrase> findRandomPhrase();
}
