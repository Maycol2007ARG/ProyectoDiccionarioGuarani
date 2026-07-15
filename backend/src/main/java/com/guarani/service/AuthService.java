package com.guarani.service;

import com.guarani.dto.AuthResponse;
import com.guarani.dto.LoginRequest;
import com.guarani.dto.RegisterRequest;
import com.guarani.dto.UserDTO;
import com.guarani.model.User;
import com.guarani.model.UserProgress;
import com.guarani.repository.UserProgressRepository;
import com.guarani.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserProgressRepository userProgressRepository;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user = userRepository.save(user);

        UserProgress progress = new UserProgress();
        progress.setUserId(user.getId());
        progress.setLevel(1);
        progress.setXp(0);
        progress.setWordsLearned(0);
        progress.setQuizzesCompleted(0);
        progress.setCurrentStreak(0);
        progress.setLastActiveDate(LocalDate.now());
        userProgressRepository.save(progress);

        String token = jwtService.generateToken(user.getEmail());

        UserDTO userDTO = new UserDTO(user.getId(), user.getName(), user.getEmail());

        return new AuthResponse(token, userDTO);
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtService.generateToken(user.getEmail());

        UserDTO userDTO = new UserDTO(user.getId(), user.getName(), user.getEmail());

        return new AuthResponse(token, userDTO);
    }
}
