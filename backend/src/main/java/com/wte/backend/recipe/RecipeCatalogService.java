package com.wte.backend.recipe;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RecipeCatalogService {

    private static final Duration CACHE_TTL = Duration.ofMinutes(30);
    private static final int RECIPE_LIMIT = 20;

    private final TenThousandRecipeClient recipeClient;
    private final TenThousandRecipeParser recipeParser;
    private final String recipeSourceUrl;

    private volatile List<Recipe> cachedRecipes = List.of();
    private volatile Instant cachedAt = Instant.EPOCH;

    public RecipeCatalogService(
            TenThousandRecipeClient recipeClient,
            TenThousandRecipeParser recipeParser,
            @Value("${wte.recipe-source-url}") String recipeSourceUrl
    ) {
        this.recipeClient = recipeClient;
        this.recipeParser = recipeParser;
        this.recipeSourceUrl = recipeSourceUrl;
    }

    public List<Recipe> getRecipes() {
        if (cachedRecipes.isEmpty() || cachedAt.plus(CACHE_TTL).isBefore(Instant.now())) {
            synchronized (this) {
                if (cachedRecipes.isEmpty() || cachedAt.plus(CACHE_TTL).isBefore(Instant.now())) {
                    cachedRecipes = fetchRecipes();
                    cachedAt = Instant.now();
                }
            }
        }

        return cachedRecipes;
    }

    public List<Recipe> recommendFromPantry(List<String> pantryItems) {
        Set<String> normalizedItems = pantryItems.stream()
                .map(item -> item.toLowerCase(Locale.ROOT).trim())
                .filter(item -> !item.isBlank())
                .collect(Collectors.toSet());

        return getRecipes().stream()
                .sorted(Comparator.comparingInt(recipe -> -matchCount(recipe, normalizedItems)))
                .filter(recipe -> matchCount(recipe, normalizedItems) > 0)
                .toList();
    }

    private List<Recipe> fetchRecipes() {
        try {
            String listHtml = recipeClient.fetch(recipeSourceUrl);
            List<TenThousandRecipeParser.RecipeCard> cards = recipeParser.parseListPage(listHtml, RECIPE_LIMIT);

            return cards.stream()
                    .map(card -> recipeParser.parseDetailPage(card, fetchDetail(card.url()), this::buildSearchUrl))
                    .toList();
        } catch (IOException exception) {
            throw new UncheckedIOException("Failed to fetch recipes from 10000recipe.com", exception);
        }
    }

    private String fetchDetail(String url) {
        try {
            return recipeClient.fetch(url);
        } catch (IOException exception) {
            throw new UncheckedIOException("Failed to fetch recipe detail page: " + url, exception);
        }
    }

    private String buildSearchUrl(String ingredientName) {
        return "https://www.coupang.com/np/search?q=" + URLEncoder.encode(ingredientName, StandardCharsets.UTF_8);
    }

    private int matchCount(Recipe recipe, Set<String> normalizedItems) {
        return (int) recipe.ingredients().stream()
                .map(Ingredient::name)
                .map(name -> name.toLowerCase(Locale.ROOT))
                .filter(name -> normalizedItems.stream().anyMatch(name::contains))
                .count();
    }
}
