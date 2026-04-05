package com.wte.backend.diet;

import com.wte.backend.recipe.Nutrition;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class DietPlannerService {

    public MealPlanResponse buildPlan(MealPlanRequest request) {
        int targetCalories = targetCalories(request);
        MacroTargets macroTargets = macroTargets(targetCalories, request.goal());
        String preferredFocus = request.preferredIngredients().get(0);
        String avoidText = request.dislikedIngredients() == null || request.dislikedIngredients().isEmpty()
                ? "none"
                : String.join(", ", request.dislikedIngredients());

        List<MealSuggestion> meals = List.of(
                new MealSuggestion(
                        "Breakfast",
                        preferredFocus + " open toast",
                        "The first meal leans on preferred ingredients for easier adherence.",
                        List.of(preferredFocus, "whole grain bread", "egg", "cherry tomato"),
                        splitNutrition(targetCalories, 0.28, 0.25, 0.35)
                ),
                new MealSuggestion(
                        "Lunch",
                        "Balanced protein bowl",
                        "Lunch anchors the day with lean protein and complex carbohydrates.",
                        List.of("brown rice", "chicken breast", "broccoli", preferredFocus),
                        splitNutrition(targetCalories, 0.4, 0.35, 0.3)
                ),
                new MealSuggestion(
                        "Dinner",
                        "Pantry cleanup skillet",
                        "Dinner keeps prep simple and improves pantry utilization.",
                        List.of(preferredFocus, "tofu", "onion", "mushroom"),
                        splitNutrition(targetCalories, 0.32, 0.4, 0.35)
                )
        );

        List<String> notes = List.of(
                "Target calories are based on TDEE.",
                "Disliked ingredients: " + avoidText,
                "The AI dietitian is implemented as a deterministic rules engine."
        );

        return new MealPlanResponse(request.name(), targetCalories, macroTargets, meals, notes);
    }

    private int targetCalories(MealPlanRequest request) {
        double bmr = request.sex() == Sex.MALE
                ? 10 * request.weightKg() + 6.25 * request.heightCm() - 5 * request.age() + 5
                : 10 * request.weightKg() + 6.25 * request.heightCm() - 5 * request.age() - 161;

        return (int) Math.round(bmr * request.activityLevel().multiplier() + request.goal().calorieAdjustment());
    }

    private MacroTargets macroTargets(int calories, Goal goal) {
        double proteinRatio = goal == Goal.GAIN_MUSCLE ? 0.3 : 0.28;
        double fatRatio = 0.25;
        double carbsRatio = 1 - proteinRatio - fatRatio;

        return new MacroTargets(
                gramsFromCalories(calories * proteinRatio, 4),
                gramsFromCalories(calories * carbsRatio, 4),
                gramsFromCalories(calories * fatRatio, 9)
        );
    }

    private Nutrition splitNutrition(int totalCalories, double calorieRatio, double proteinRatio, double carbRatio) {
        int calories = (int) Math.round(totalCalories * calorieRatio);
        int protein = gramsFromCalories(calories * proteinRatio, 4);
        int carbs = gramsFromCalories(calories * carbRatio, 4);
        int fatCalories = calories - (protein * 4 + carbs * 4);
        int fat = Math.max(1, gramsFromCalories(fatCalories, 9));
        return new Nutrition(calories, protein, carbs, fat);
    }

    private int gramsFromCalories(double calories, int divisor) {
        return (int) Math.round(calories / divisor);
    }
}
