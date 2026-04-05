package com.wte.backend.recipe;

import java.util.Arrays;
import java.util.List;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeCatalogService recipeCatalogService;

    public RecipeController(RecipeCatalogService recipeCatalogService) {
        this.recipeCatalogService = recipeCatalogService;
    }

    @GetMapping
    public List<Recipe> getRecipes() {
        return recipeCatalogService.getRecipes();
    }

    @GetMapping("/pantry")
    public List<Recipe> getPantryRecommendations(@RequestParam(defaultValue = "") String items) {
        List<String> pantryItems = Arrays.stream(items.split(","))
                .filter(StringUtils::hasText)
                .toList();
        return recipeCatalogService.recommendFromPantry(pantryItems);
    }
}
