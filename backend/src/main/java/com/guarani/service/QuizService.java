package com.guarani.service;

import com.guarani.dto.QuizDTO;
import com.guarani.dto.QuizResultDTO;
import com.guarani.dto.WordDTO;
import com.guarani.model.Quiz;
import com.guarani.model.Word;
import com.guarani.repository.QuizRepository;
import com.guarani.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuizRepository quizRepository;
    private final WordRepository wordRepository;
    private final WordService wordService;
    private final ProgressService progressService;
    private final AchievementService achievementService;

    @Transactional
    public QuizDTO generateQuiz(int level, Long userId) {
        List<Word> levelWords = wordRepository.findByDifficultyLevel(level);

        if (levelWords.size() < 4) {
            throw new RuntimeException("Not enough words at difficulty level " + level + " to generate a quiz");
        }

        Collections.shuffle(levelWords);

        Word correctWord = levelWords.get(0);

        List<Word> wrongOptions = levelWords.subList(1, Math.min(4, levelWords.size()));
        while (wrongOptions.size() < 3) {
            List<Word> additionalWords = wordRepository.findByDifficultyLevel(level);
            for (Word w : additionalWords) {
                if (w.getId() != correctWord.getId() && wrongOptions.stream().noneMatch(o -> o.getId().equals(w.getId()))) {
                    wrongOptions.add(w);
                    if (wrongOptions.size() >= 3) break;
                }
            }
            break;
        }

        List<Word> allOptions = new ArrayList<>();
        allOptions.add(correctWord);
        allOptions.addAll(wrongOptions.subList(0, 3));
        Collections.shuffle(allOptions);

        Quiz quiz = new Quiz();
        quiz.setUserId(userId);
        quiz.setQuestionWordId(correctWord.getId());
        quiz.setOption1Id(allOptions.get(0).getId());
        quiz.setOption2Id(allOptions.get(1).getId());
        quiz.setOption3Id(allOptions.get(2).getId());
        quiz.setOption4Id(allOptions.get(3).getId());
        quiz.setCorrectOptionId(correctWord.getId());
        quiz.setAnswered(false);
        quiz = quizRepository.save(quiz);

        WordDTO questionWordDTO = wordService.mapToDTO(correctWord);
        List<WordDTO> optionDTOs = allOptions.stream()
                .map(wordService::mapToDTO)
                .collect(Collectors.toList());

        QuizDTO quizDTO = new QuizDTO();
        quizDTO.setId(quiz.getId());
        quizDTO.setQuestionWord(questionWordDTO);
        quizDTO.setOptions(optionDTOs);
        quizDTO.setAnswered(false);
        quizDTO.setUserAnswer(null);
        quizDTO.setCorrect(null);

        return quizDTO;
    }

    @Transactional
    public QuizResultDTO submitAnswer(Long quizId, Long answerWordId, Long userId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found with id: " + quizId));

        if (!quiz.getUserId().equals(userId)) {
            throw new RuntimeException("Quiz does not belong to this user");
        }

        if (quiz.isAnswered()) {
            throw new RuntimeException("Quiz already answered");
        }

        quiz.setAnswered(true);
        quiz.setUserAnswer(answerWordId);

        boolean isCorrect = quiz.getCorrectOptionId().equals(answerWordId);
        quiz.setIsCorrect(isCorrect);
        quizRepository.save(quiz);

        Word correctWord = wordRepository.findById(quiz.getCorrectOptionId())
                .orElseThrow(() -> new RuntimeException("Correct word not found"));
        WordDTO correctWordDTO = wordService.mapToDTO(correctWord);

        if (isCorrect) {
            progressService.addXP(userId, 10);
            progressService.incrementQuizzesCompleted(userId);
        }

        achievementService.checkAndUnlockAchievements(userId);

        String explanation = "The correct answer is: " + correctWord.getSpanish() + " = " + correctWord.getGuarani();

        return new QuizResultDTO(isCorrect, correctWordDTO, explanation);
    }
}
