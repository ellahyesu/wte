package com.wte.backend.diet;

public enum Goal {
    LOSE_FAT(-350),
    MAINTAIN(0),
    GAIN_MUSCLE(250);

    private final int calorieAdjustment;

    Goal(int calorieAdjustment) {
        this.calorieAdjustment = calorieAdjustment;
    }

    public int calorieAdjustment() {
        return calorieAdjustment;
    }
}
