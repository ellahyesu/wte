package com.wte.backend.diet;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/diet")
public class DietController {

    private final DietPlannerService dietPlannerService;

    public DietController(DietPlannerService dietPlannerService) {
        this.dietPlannerService = dietPlannerService;
    }

    @PostMapping("/plan")
    public MealPlanResponse createPlan(@Valid @RequestBody MealPlanRequest request) {
        return dietPlannerService.buildPlan(request);
    }
}
