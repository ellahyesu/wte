package com.wte.backend.recipe;

public record Ingredient(
        String name,
        String amount,
        String purchaseUrl
) {
}
