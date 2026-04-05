<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

type Ingredient = {
  name: string;
  amount: string;
  purchaseUrl: string;
};

type Nutrition = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

type MacroTargets = {
  protein: number;
  carbs: number;
  fat: number;
};

type Recipe = {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  tags: string[];
  ingredients: Ingredient[];
  instructions: string[];
  nutrition: Nutrition;
};

type MealPlan = {
  user: string;
  targetCalories: number;
  macroTargets: MacroTargets;
  meals: {
    mealType: string;
    title: string;
    rationale: string;
    ingredients: string[];
    nutrition: Nutrition;
  }[];
  notes: string[];
};

const apiBase = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';
const tabs = ['recipes', 'diet', 'pantry'] as const;
const activeTab = ref<'recipes' | 'diet' | 'pantry'>('recipes');
const recipes = ref<Recipe[]>([]);
const pantryMatches = ref<Recipe[]>([]);
const plan = ref<MealPlan | null>(null);
const pantryInput = ref('kimchi, egg, green onion');
const loadingRecipes = ref(false);
const loadingPlan = ref(false);
const loadingPantry = ref(false);
const error = ref('');

const form = ref({
  name: 'Mina',
  sex: 'FEMALE',
  age: 29,
  heightCm: 165,
  weightKg: 60,
  activityLevel: 'MODERATE',
  goal: 'LOSE_FAT',
  preferredIngredients: 'salmon, broccoli',
  dislikedIngredients: 'eggplant',
});

const pantryList = computed(() =>
  pantryInput.value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean),
);

async function fetchRecipes() {
  loadingRecipes.value = true;
  error.value = '';
  try {
    const response = await fetch(`${apiBase}/api/recipes`);
    recipes.value = await response.json();
  } catch {
    error.value = 'Failed to load recipes. Check whether the backend is running.';
  } finally {
    loadingRecipes.value = false;
  }
}

async function fetchPantryMatches() {
  loadingPantry.value = true;
  error.value = '';
  try {
    const query = encodeURIComponent(pantryList.value.join(','));
    const response = await fetch(`${apiBase}/api/recipes/pantry?items=${query}`);
    pantryMatches.value = await response.json();
  } catch {
    error.value = 'Failed to load pantry recommendations.';
  } finally {
    loadingPantry.value = false;
  }
}

async function generatePlan() {
  loadingPlan.value = true;
  error.value = '';
  try {
    const response = await fetch(`${apiBase}/api/diet/plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form.value,
        preferredIngredients: form.value.preferredIngredients.split(',').map((item) => item.trim()).filter(Boolean),
        dislikedIngredients: form.value.dislikedIngredients.split(',').map((item) => item.trim()).filter(Boolean),
      }),
    });
    plan.value = await response.json();
  } catch {
    error.value = 'Failed to generate the meal plan.';
  } finally {
    loadingPlan.value = false;
  }
}

onMounted(async () => {
  await fetchRecipes();
  await fetchPantryMatches();
  await generatePlan();
});
</script>

<template>
  <div class="shell">
    <header class="hero">
      <p class="eyebrow">wte / what to eat</p>
      <h1>Your meals, nutrition targets, and shopping links in one place.</h1>
      <p class="lede">
        A Vue 3 and Spring Boot MVP that covers recipe cards, AI diet planning, and pantry-first suggestions.
      </p>
      <div class="tab-row">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="['tab', { active: activeTab === tab }]"
          @click="activeTab = tab"
        >
          {{ tab === 'recipes' ? 'Recipe Cards' : tab === 'diet' ? 'AI Dietitian' : 'My Pantry' }}
        </button>
      </div>
    </header>

    <p v-if="error" class="error">{{ error }}</p>

    <main v-if="activeTab === 'recipes'" class="panel">
      <div class="section-head">
        <h2>Recipe Cards</h2>
        <span>{{ loadingRecipes ? 'loading...' : `${recipes.length} recipes` }}</span>
      </div>
      <div class="grid">
        <article v-for="recipe in recipes" :key="recipe.id" class="card">
          <img :src="recipe.imageUrl" :alt="recipe.title" class="card-image" />
          <div class="card-body">
            <div class="chip-row">
              <span v-for="tag in recipe.tags" :key="tag" class="chip">{{ tag }}</span>
            </div>
            <h3>{{ recipe.title }}</h3>
            <p>{{ recipe.summary }}</p>
            <div class="nutrition">
              <span>{{ recipe.nutrition.calories }} kcal</span>
              <span>P {{ recipe.nutrition.protein }}g</span>
              <span>C {{ recipe.nutrition.carbs }}g</span>
              <span>F {{ recipe.nutrition.fat }}g</span>
            </div>
            <ul class="ingredient-list">
              <li v-for="ingredient in recipe.ingredients" :key="ingredient.name">
                <span>{{ ingredient.name }} / {{ ingredient.amount }}</span>
                <a :href="ingredient.purchaseUrl" target="_blank" rel="noreferrer">Buy</a>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </main>

    <main v-else-if="activeTab === 'diet'" class="panel split">
      <section class="form-card">
        <div class="section-head">
          <h2>AI Dietitian</h2>
          <span>{{ loadingPlan ? 'planning...' : 'TDEE-based' }}</span>
        </div>
        <div class="form-grid">
          <label>
            Name
            <input v-model="form.name" />
          </label>
          <label>
            Sex
            <select v-model="form.sex">
              <option value="FEMALE">Female</option>
              <option value="MALE">Male</option>
            </select>
          </label>
          <label>
            Age
            <input v-model="form.age" type="number" />
          </label>
          <label>
            Height (cm)
            <input v-model="form.heightCm" type="number" />
          </label>
          <label>
            Weight (kg)
            <input v-model="form.weightKg" type="number" />
          </label>
          <label>
            Activity
            <select v-model="form.activityLevel">
              <option value="LOW">Low</option>
              <option value="LIGHT">Light</option>
              <option value="MODERATE">Moderate</option>
              <option value="HIGH">High</option>
            </select>
          </label>
          <label>
            Goal
            <select v-model="form.goal">
              <option value="LOSE_FAT">Lose fat</option>
              <option value="MAINTAIN">Maintain</option>
              <option value="GAIN_MUSCLE">Gain muscle</option>
            </select>
          </label>
          <label class="wide">
            Preferred ingredients
            <input v-model="form.preferredIngredients" />
          </label>
          <label class="wide">
            Disliked ingredients
            <input v-model="form.dislikedIngredients" />
          </label>
        </div>
        <button class="primary" @click="generatePlan">Generate plan</button>
      </section>

      <section v-if="plan" class="plan-card">
        <div class="plan-top">
          <h3>{{ plan.user }} daily target</h3>
          <strong>{{ plan.targetCalories }} kcal</strong>
        </div>
        <div class="nutrition">
          <span>P {{ plan.macroTargets.protein }}g</span>
          <span>C {{ plan.macroTargets.carbs }}g</span>
          <span>F {{ plan.macroTargets.fat }}g</span>
        </div>
        <article v-for="meal in plan.meals" :key="meal.mealType" class="meal-block">
          <div class="section-head">
            <h4>{{ meal.mealType }} / {{ meal.title }}</h4>
            <span>{{ meal.nutrition.calories }} kcal</span>
          </div>
          <p>{{ meal.rationale }}</p>
          <p class="ingredients-inline">{{ meal.ingredients.join(' / ') }}</p>
        </article>
        <ul class="note-list">
          <li v-for="note in plan.notes" :key="note">{{ note }}</li>
        </ul>
      </section>
    </main>

    <main v-else class="panel split">
      <section class="form-card">
        <div class="section-head">
          <h2>My Recipe & Pantry</h2>
          <span>{{ loadingPantry ? 'searching...' : `${pantryMatches.length} matches` }}</span>
        </div>
        <label>
          Ingredients on hand
          <textarea v-model="pantryInput" rows="4" />
        </label>
        <button class="primary" @click="fetchPantryMatches">Refresh suggestions</button>
        <div class="chip-row">
          <span v-for="item in pantryList" :key="item" class="chip">{{ item }}</span>
        </div>
      </section>

      <section class="stack">
        <article v-for="recipe in pantryMatches" :key="recipe.id" class="compact-card">
          <div>
            <h3>{{ recipe.title }}</h3>
            <p>{{ recipe.summary }}</p>
          </div>
          <div class="compact-actions">
            <span>{{ recipe.nutrition.calories }} kcal</span>
            <a :href="recipe.ingredients[0].purchaseUrl" target="_blank" rel="noreferrer">Shop</a>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>
