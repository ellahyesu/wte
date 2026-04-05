package com.wte.backend.recipe;

public record Nutrition(
        Integer calories,
        Integer protein,
        Integer carbs,
        Integer fat
) {
}
