package com.wte.backend;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class WteApiTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void returnsRecipeCatalog() throws Exception {
        mockMvc.perform(get("/api/recipes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").isNotEmpty())
                .andExpect(jsonPath("$[0].title").isNotEmpty())
                .andExpect(jsonPath("$[0].ingredients[0].purchaseUrl").exists());
    }

    @Test
    void filtersPantryRecipes() throws Exception {
        mockMvc.perform(get("/api/recipes/pantry").param("items", "김치,계란"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").isNotEmpty());
    }

    @Test
    void createsDietPlan() throws Exception {
        String requestBody = """
                {
                  "name": "Mina",
                  "sex": "FEMALE",
                  "age": 29,
                  "heightCm": 165,
                  "weightKg": 60,
                  "activityLevel": "MODERATE",
                  "goal": "LOSE_FAT",
                  "preferredIngredients": ["salmon", "broccoli"],
                  "dislikedIngredients": ["eggplant"]
                }
                """;

        mockMvc.perform(post("/api/diet/plan")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user").value("Mina"))
                .andExpect(jsonPath("$.targetCalories").isNumber())
                .andExpect(jsonPath("$.meals[0].mealType").value("Breakfast"));
    }

    @Test
    void allowsCorsForNetlifyFrontend() throws Exception {
        mockMvc.perform(options("/api/recipes")
                        .header("Origin", "https://wte-whattoeat.netlify.app")
                        .header("Access-Control-Request-Method", "GET"))
                .andExpect(status().isOk())
                .andExpect(header().string("Access-Control-Allow-Origin", "https://wte-whattoeat.netlify.app"));
    }
}
