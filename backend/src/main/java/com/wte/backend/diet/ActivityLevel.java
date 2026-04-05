package com.wte.backend.diet;

public enum ActivityLevel {
    LOW(1.2),
    LIGHT(1.375),
    MODERATE(1.55),
    HIGH(1.725);

    private final double multiplier;

    ActivityLevel(double multiplier) {
        this.multiplier = multiplier;
    }

    public double multiplier() {
        return multiplier;
    }
}
