package com.guarani.repository;

import com.guarani.model.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {

    @Query("SELECT w FROM Word w WHERE LOWER(w.spanish) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(w.guarani) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Word> searchBySpanishOrGuarani(@Param("query") String query);

    @Query("SELECT w FROM Word w WHERE LOWER(w.spanish) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Word> searchBySpanish(@Param("query") String query);

    @Query("SELECT w FROM Word w WHERE LOWER(w.guarani) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Word> searchByGuarani(@Param("query") String query);

    List<Word> findByCategoriesId(Long categoryId);

    List<Word> findByDifficultyLevel(int difficultyLevel);

    List<Word> findByIdIn(List<Long> ids);

    @Query("SELECT w FROM Word w WHERE w.id NOT IN :excludeIds AND w.difficultyLevel = :level ORDER BY FUNCTION('RANDOM')")
    List<Word> findRandomByLevelExcludeIds(@Param("level") int level, @Param("excludeIds") List<Long> excludeIds);

    @Query("SELECT w FROM Word w WHERE w.difficultyLevel = :level ORDER BY FUNCTION('RANDOM')")
    List<Word> findRandomByLevel(@Param("level") int level);

    @Query("SELECT w FROM Word w ORDER BY FUNCTION('RANDOM') LIMIT 1")
    Word findRandomWord();
}
