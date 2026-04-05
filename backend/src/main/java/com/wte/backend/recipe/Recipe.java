package com.wte.backend.recipe;

import java.util.List;

public record Recipe(
        String id,
        String title,
        String summary,
        String imageUrl,
        List<String> tags,
        List<Ingredient> ingredients,
        List<String> instructions,
        Nutrition nutrition
) {
}
