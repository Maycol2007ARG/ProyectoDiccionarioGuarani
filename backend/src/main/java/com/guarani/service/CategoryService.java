package com.guarani.service;

import com.guarani.dto.CategoryDTO;
import com.guarani.model.Category;
import com.guarani.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryDTO> getAllCategories() {
        List<Category> categories = categoryRepository.findAllByOrderByNameAsc();
        return categories.stream()
                .map(cat -> new CategoryDTO(
                        cat.getId(),
                        cat.getName(),
                        cat.getIcon(),
                        cat.getDescription(),
                        cat.getWords().size()
                ))
                .collect(Collectors.toList());
    }
}
