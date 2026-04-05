package com.wte.backend.diet;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record MealPlanRequest(
        @NotBlank String name,
        @NotNull Sex sex,
        @Min(15) @Max(80) int age,
        @Min(130) @Max(230) int heightCm,
        @Min(35) @Max(200) int weightKg,
        @NotNull ActivityLevel activityLevel,
        @NotNull Goal goal,
        @NotEmpty List<String> preferredIngredients,
        List<String> dislikedIngredients
) {
}
