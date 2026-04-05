package com.wte.backend.diet;

import com.wte.backend.recipe.Nutrition;
import java.util.List;

public record MealSuggestion(
        String mealType,
        String title,
        String rationale,
        List<String> ingredients,
        Nutrition nutrition
) {
}
