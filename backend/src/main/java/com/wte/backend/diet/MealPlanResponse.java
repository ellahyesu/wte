package com.wte.backend.diet;

import java.util.List;

public record MealPlanResponse(
        String user,
        int targetCalories,
        MacroTargets macroTargets,
        List<MealSuggestion> meals,
        List<String> notes
) {
}
