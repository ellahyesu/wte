package com.wte.backend.recipe;

import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class RecipeCatalogService {

    private final List<Recipe> recipes = List.of(
            new Recipe(
                    "salmon-bowl",
                    "Salmon Protein Bowl",
                    "A high-protein balanced bowl for post-workout meals.",
                    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
                    List.of("high-protein", "fitness", "quick"),
                    List.of(
                            new Ingredient("salmon", "180g", "https://www.coupang.com/np/search?q=salmon"),
                            new Ingredient("brown rice", "180g", "https://www.coupang.com/np/search?q=brown+rice"),
                            new Ingredient("avocado", "1/2", "https://www.coupang.com/np/search?q=avocado"),
                            new Ingredient("broccoli", "100g", "https://www.coupang.com/np/search?q=broccoli")
                    ),
                    List.of(
                            "Season the salmon and pan-sear it.",
                            "Plate brown rice and steamed broccoli.",
                            "Top with sliced avocado and salmon."
                    ),
                    new Nutrition(620, 42, 48, 26)
            ),
            new Recipe(
                    "tofu-wrap",
                    "Tofu Veggie Wrap",
                    "A lighter lunch option with moderate protein and low fat.",
                    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
                    List.of("low-fat", "veggie", "lunch"),
                    List.of(
                            new Ingredient("whole wheat tortilla", "2", "https://www.coupang.com/np/search?q=whole+wheat+tortilla"),
                            new Ingredient("tofu", "150g", "https://www.coupang.com/np/search?q=tofu"),
                            new Ingredient("lettuce", "60g", "https://www.coupang.com/np/search?q=lettuce"),
                            new Ingredient("bell pepper", "1/2", "https://www.coupang.com/np/search?q=bell+pepper")
                    ),
                    List.of(
                            "Season crumbled tofu with soy sauce and paprika.",
                            "Cook tofu in a pan until dry and fragrant.",
                            "Wrap with vegetables in the tortilla."
                    ),
                    new Nutrition(430, 24, 41, 17)
            ),
            new Recipe(
                    "kimchi-egg-fried-rice",
                    "Kimchi Egg Fried Rice",
                    "A pantry-cleanout rice bowl with familiar Korean flavors.",
                    "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
                    List.of("home-style", "pantry", "korean"),
                    List.of(
                            new Ingredient("kimchi", "120g", "https://www.coupang.com/np/search?q=kimchi"),
                            new Ingredient("egg", "2", "https://www.coupang.com/np/search?q=egg"),
                            new Ingredient("rice", "200g", "https://www.coupang.com/np/search?q=rice"),
                            new Ingredient("green onion", "1/2 stalk", "https://www.coupang.com/np/search?q=green+onion")
                    ),
                    List.of(
                            "Cook kimchi and green onion in a hot pan.",
                            "Add rice, then scramble in the egg.",
                            "Finish with sesame oil if desired."
                    ),
                    new Nutrition(540, 19, 63, 18)
            ),
            new Recipe(
                    "chicken-yogurt-salad",
                    "Chicken Yogurt Salad",
                    "A filling cutting-phase salad with lean protein.",
                    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
                    List.of("cutting", "salad", "high-protein"),
                    List.of(
                            new Ingredient("chicken breast", "150g", "https://www.coupang.com/np/search?q=chicken+breast"),
                            new Ingredient("greek yogurt", "80g", "https://www.coupang.com/np/search?q=greek+yogurt"),
                            new Ingredient("romaine", "80g", "https://www.coupang.com/np/search?q=romaine"),
                            new Ingredient("cherry tomato", "8", "https://www.coupang.com/np/search?q=cherry+tomato")
                    ),
                    List.of(
                            "Cook and slice the chicken breast.",
                            "Make a yogurt dressing with lemon and pepper.",
                            "Toss with greens and tomatoes."
                    ),
                    new Nutrition(360, 39, 14, 12)
            )
    );

    public List<Recipe> getRecipes() {
        return recipes;
    }

    public List<Recipe> recommendFromPantry(List<String> pantryItems) {
        Set<String> normalizedItems = pantryItems.stream()
                .map(item -> item.toLowerCase(Locale.ROOT).trim())
                .filter(item -> !item.isBlank())
                .collect(Collectors.toSet());

        return recipes.stream()
                .sorted(Comparator.comparingInt(recipe -> -matchCount(recipe, normalizedItems)))
                .filter(recipe -> matchCount(recipe, normalizedItems) > 0)
                .toList();
    }

    private int matchCount(Recipe recipe, Set<String> normalizedItems) {
        return (int) recipe.ingredients().stream()
                .map(Ingredient::name)
                .map(name -> name.toLowerCase(Locale.ROOT))
                .filter(name -> normalizedItems.stream().anyMatch(name::contains))
                .count();
    }
}
