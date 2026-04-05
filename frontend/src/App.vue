<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { buildDemoMealPlan, demoRecipes, localizeText, recommendDemoRecipes, type Locale, type MealPlan, type Recipe } from './demoData';

type ApiRecipe = {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  tags: string[];
  ingredients: { name: string; amount: string; purchaseUrl: string }[];
  instructions: string[];
  nutrition: { calories: number | null; protein: number | null; carbs: number | null; fat: number | null };
};

const configuredApiBase = import.meta.env.VITE_API_BASE_URL?.trim();
const isLocalHost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const defaultProductionApiBase = 'https://wte-oqhr.onrender.com';
const apiBase = configuredApiBase ?? (isLocalHost ? 'http://localhost:8080' : defaultProductionApiBase);
const tabs = ['recipes', 'diet', 'pantry'] as const;
const locale = ref<Locale>('ko');
const activeTab = ref<'recipes' | 'diet' | 'pantry'>('recipes');
const recipeView = ref<'overview' | 'archive'>('overview');
const recipes = ref<Recipe[]>([]);
const pantryMatches = ref<Recipe[]>([]);
const plan = ref<MealPlan | null>(null);
const selectedRecipe = ref<Recipe | null>(null);
const pantryInput = ref('kimchi, egg, green onion');
const loadingRecipes = ref(false);
const loadingPlan = ref(false);
const loadingPantry = ref(false);
const error = ref('');
const usingDemoData = ref(false);
const fallbackRecipeImage = '/favicon.svg';

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

const copy = computed(() => ({
  heroTitle: locale.value === 'ko' ? '오늘 뭐 먹을까?' : 'Your meals, nutrition targets, and shopping links in one place.',
  heroText:
    locale.value === 'ko'
      ? '레시피, 영양소, 냉장고 기반 메뉴 추천을 한 앱에서 확인할 수 있습니다.'
      : 'Switch the language anytime and explore recipe cards, diet planning, and pantry-first suggestions in one app.',
  recipeCards: locale.value === 'ko' ? '레시피' : 'Recipe Cards',
  dietitian: locale.value === 'ko' ? 'AI 영양사' : 'AI Dietitian',
  pantry: locale.value === 'ko' ? '냉장고 책임져' : 'My Pantry',
  demoNotice:
    locale.value === 'ko'
      ? '현재는 데모 모드입니다. 연결 가능한 백엔드 API가 없어 내장 데이터로 동작합니다.'
      : 'Running in demo mode. This deployment uses built-in data because no reachable backend API is configured.',
  recipesCount: (count: number) => (locale.value === 'ko' ? `레시피 ${count}개` : `${count} recipes`),
  loading: locale.value === 'ko' ? '불러오는 중...' : 'loading...',
  openRecipe: locale.value === 'ko' ? '레시피 보기' : 'View recipe',
  ingredients: locale.value === 'ko' ? '재료' : 'Ingredients',
  instructions: locale.value === 'ko' ? '조리 순서' : 'Instructions',
  buy: locale.value === 'ko' ? '구매' : 'Buy',
  more: 'more...',
  archiveTitle: locale.value === 'ko' ? '추가 레시피 상세 페이지' : 'More recipe cards',
  archiveText:
    locale.value === 'ko'
      ? '17번째 레시피부터는 이 페이지에서 더 자세히 확인할 수 있습니다.'
      : 'Recipes from number 17 onward are listed on this detail page.',
  backToRecipes: locale.value === 'ko' ? '목록으로 돌아가기' : 'Back to overview',
  name: locale.value === 'ko' ? '이름' : 'Name',
  sex: locale.value === 'ko' ? '성별' : 'Sex',
  age: locale.value === 'ko' ? '나이' : 'Age',
  height: locale.value === 'ko' ? '키(cm)' : 'Height (cm)',
  weight: locale.value === 'ko' ? '몸무게(kg)' : 'Weight (kg)',
  activity: locale.value === 'ko' ? '활동량' : 'Activity',
  goal: locale.value === 'ko' ? '목표' : 'Goal',
  preferredIngredients: locale.value === 'ko' ? '선호 재료' : 'Preferred ingredients',
  dislikedIngredients: locale.value === 'ko' ? '기피 재료' : 'Disliked ingredients',
  generatePlan: locale.value === 'ko' ? '식단 생성' : 'Generate plan',
  targetLabel: locale.value === 'ko' ? '하루 목표' : 'daily target',
  pantryInput: locale.value === 'ko' ? '보유 재료' : 'Ingredients on hand',
  refreshSuggestions: locale.value === 'ko' ? '추천 갱신' : 'Refresh suggestions',
  matches: (count: number) => (locale.value === 'ko' ? `추천 ${count}개` : `${count} matches`),
  searching: locale.value === 'ko' ? '검색 중...' : 'searching...',
  language: locale.value === 'ko' ? '언어' : 'Language',
  ko: 'KO',
  en: 'EN',
}));

const pantryList = computed(() =>
  pantryInput.value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean),
);

const overviewRecipes = computed(() => recipes.value.slice(0, 16));
const archiveRecipes = computed(() => recipes.value.slice(16));

function textOf(value: { ko: string; en: string }): string {
  return localizeText(value, locale.value);
}

function nutritionText(value: number | null, unit: string): string {
  if (value === null || value === undefined) {
    return locale.value === 'ko' ? '정보 없음' : 'Not available';
  }

  return `${value}${unit}`;
}

function recipeImageUrl(value: string | null | undefined): string {
  return value && value.trim() ? value : fallbackRecipeImage;
}

function applyFallbackImage(event: Event) {
  const image = event.target as HTMLImageElement;
  if (image.src.endsWith(fallbackRecipeImage)) {
    return;
  }
  image.src = fallbackRecipeImage;
}

function normalizeApiRecipe(recipe: ApiRecipe): Recipe {
  return {
    id: recipe.id,
    title: { ko: recipe.title, en: recipe.title },
    summary: { ko: recipe.summary, en: recipe.summary },
    imageUrl: recipe.imageUrl,
    tags: recipe.tags.map((tag) => ({ ko: tag, en: tag })),
    ingredients: recipe.ingredients.map((ingredient) => ({
      key: ingredient.name,
      name: { ko: ingredient.name, en: ingredient.name },
      amount: ingredient.amount,
      purchaseUrl: ingredient.purchaseUrl,
    })),
    instructions: recipe.instructions.map((instruction) => ({ ko: instruction, en: instruction })),
    nutrition: recipe.nutrition,
  };
}

async function fetchRecipes() {
  loadingRecipes.value = true;
  error.value = '';
  if (!apiBase) {
    recipes.value = demoRecipes;
    usingDemoData.value = true;
    loadingRecipes.value = false;
    return;
  }

  try {
    const response = await fetch(`${apiBase}/api/recipes`);
    if (!response.ok) {
      throw new Error(`Recipe API failed with ${response.status}`);
    }
    const apiRecipes = (await response.json()) as ApiRecipe[];
    recipes.value = apiRecipes.length >= 20 ? apiRecipes.map(normalizeApiRecipe) : demoRecipes;
    usingDemoData.value = apiRecipes.length < 20;
  } catch {
    recipes.value = demoRecipes;
    usingDemoData.value = true;
  } finally {
    loadingRecipes.value = false;
  }
}

async function fetchPantryMatches() {
  loadingPantry.value = true;
  if (!apiBase || usingDemoData.value) {
    pantryMatches.value = recommendDemoRecipes(pantryList.value);
    usingDemoData.value = true;
    loadingPantry.value = false;
    return;
  }

  try {
    const query = encodeURIComponent(pantryList.value.join(','));
    const response = await fetch(`${apiBase}/api/recipes/pantry?items=${query}`);
    if (!response.ok) {
      throw new Error(`Pantry API failed with ${response.status}`);
    }
    pantryMatches.value = (await response.json() as ApiRecipe[]).map(normalizeApiRecipe);
  } catch {
    pantryMatches.value = recommendDemoRecipes(pantryList.value);
    usingDemoData.value = true;
  } finally {
    loadingPantry.value = false;
  }
}

async function generatePlan() {
  loadingPlan.value = true;
  const requestBody = {
    ...form.value,
    preferredIngredients: form.value.preferredIngredients.split(',').map((item) => item.trim()).filter(Boolean),
    dislikedIngredients: form.value.dislikedIngredients.split(',').map((item) => item.trim()).filter(Boolean),
  };

  if (!apiBase || usingDemoData.value) {
    plan.value = buildDemoMealPlan(requestBody, locale.value);
    usingDemoData.value = true;
    loadingPlan.value = false;
    return;
  }

  try {
    const response = await fetch(`${apiBase}/api/diet/plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      throw new Error(`Diet API failed with ${response.status}`);
    }
    plan.value = await response.json();
  } catch {
    plan.value = buildDemoMealPlan(requestBody, locale.value);
    usingDemoData.value = true;
  } finally {
    loadingPlan.value = false;
  }
}

function switchLocale(nextLocale: Locale) {
  if (locale.value === nextLocale) {
    return;
  }
  locale.value = nextLocale;
  if (usingDemoData.value || !apiBase) {
    plan.value = buildDemoMealPlan(
      {
        ...form.value,
        preferredIngredients: form.value.preferredIngredients.split(',').map((item) => item.trim()).filter(Boolean),
        dislikedIngredients: form.value.dislikedIngredients.split(',').map((item) => item.trim()).filter(Boolean),
      },
      locale.value,
    );
  }
}

function openRecipeModal(recipe: Recipe) {
  selectedRecipe.value = recipe;
}

function closeRecipeModal() {
  selectedRecipe.value = null;
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
      <div class="hero-top">
        <p class="eyebrow">wte / what to eat</p>
        <div class="locale-switcher">
          <span>{{ copy.language }}</span>
          <button :class="['locale-button', { active: locale === 'ko' }]" @click="switchLocale('ko')">{{ copy.ko }}</button>
          <button :class="['locale-button', { active: locale === 'en' }]" @click="switchLocale('en')">{{ copy.en }}</button>
        </div>
      </div>
      <h3>{{ copy.heroTitle }}</h3>
      <p class="lede">{{ copy.heroText }}</p>
      <div class="tab-row">
        <button v-for="tab in tabs" :key="tab" :class="['tab', { active: activeTab === tab }]" @click="activeTab = tab">
          {{ tab === 'recipes' ? copy.recipeCards : tab === 'diet' ? copy.dietitian : copy.pantry }}
        </button>
      </div>
    </header>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="usingDemoData" class="notice">{{ copy.demoNotice }}</p>

    <main v-if="activeTab === 'recipes' && recipeView === 'overview'" class="panel">
      <div class="section-head">
        <h2>{{ copy.recipeCards }}</h2>
        <span>{{ loadingRecipes ? copy.loading : copy.recipesCount(recipes.length) }}</span>
      </div>
      <div class="grid">
        <article v-for="recipe in overviewRecipes" :key="recipe.id" class="card">
          <button class="image-button" @click="openRecipeModal(recipe)">
            <img :src="recipeImageUrl(recipe.imageUrl)" :alt="textOf(recipe.title)" class="card-image" @error="applyFallbackImage" />
          </button>
          <div class="card-body">
            <div class="chip-row">
              <span v-for="tag in recipe.tags" :key="tag.en" class="chip">{{ textOf(tag) }}</span>
            </div>
            <h3>{{ textOf(recipe.title) }}</h3>
            <p>{{ textOf(recipe.summary) }}</p>
            <div class="nutrition">
              <span>{{ nutritionText(recipe.nutrition.calories, ' kcal') }}</span>
              <span>P {{ nutritionText(recipe.nutrition.protein, 'g') }}</span>
              <span>C {{ nutritionText(recipe.nutrition.carbs, 'g') }}</span>
              <span>F {{ nutritionText(recipe.nutrition.fat, 'g') }}</span>
            </div>
          </div>
        </article>

        <article v-if="archiveRecipes.length > 0" class="card more-card">
          <div class="card-body more-card-body">
            <p class="more-count">{{ locale === 'ko' ? '17번째 이후 레시피' : 'Recipes after #16' }}</p>
            <h3>{{ archiveRecipes.length }} {{ locale === 'ko' ? '개 더 있음' : 'more available' }}</h3>
            <p>{{ copy.archiveText }}</p>
            <button class="primary" @click="recipeView = 'archive'">{{ copy.more }}</button>
          </div>
        </article>
      </div>
    </main>

    <main v-else-if="activeTab === 'recipes'" class="panel">
      <div class="section-head">
        <div>
          <h2>{{ copy.archiveTitle }}</h2>
          <p class="section-copy">{{ copy.archiveText }}</p>
        </div>
        <button class="ghost" @click="recipeView = 'overview'">{{ copy.backToRecipes }}</button>
      </div>
      <div class="grid">
        <article v-for="recipe in archiveRecipes" :key="recipe.id" class="card">
          <button class="image-button" @click="openRecipeModal(recipe)">
            <img :src="recipeImageUrl(recipe.imageUrl)" :alt="textOf(recipe.title)" class="card-image" @error="applyFallbackImage" />
          </button>
          <div class="card-body">
            <div class="chip-row">
              <span v-for="tag in recipe.tags" :key="tag.en" class="chip">{{ textOf(tag) }}</span>
            </div>
            <h3>{{ textOf(recipe.title) }}</h3>
            <p>{{ textOf(recipe.summary) }}</p>
            <div class="nutrition">
              <span>{{ nutritionText(recipe.nutrition.calories, ' kcal') }}</span>
              <span>P {{ nutritionText(recipe.nutrition.protein, 'g') }}</span>
              <span>C {{ nutritionText(recipe.nutrition.carbs, 'g') }}</span>
              <span>F {{ nutritionText(recipe.nutrition.fat, 'g') }}</span>
            </div>
          </div>
        </article>
      </div>
    </main>

    <main v-else-if="activeTab === 'diet'" class="panel split">
      <section class="form-card">
        <div class="section-head">
          <h2>{{ copy.dietitian }}</h2>
          <span>{{ loadingPlan ? copy.loading : 'TDEE-based' }}</span>
        </div>
        <div class="form-grid">
          <label>
            {{ copy.name }}
            <input v-model="form.name" />
          </label>
          <label>
            {{ copy.sex }}
            <select v-model="form.sex">
              <option value="FEMALE">{{ locale === 'ko' ? '여성' : 'Female' }}</option>
              <option value="MALE">{{ locale === 'ko' ? '남성' : 'Male' }}</option>
            </select>
          </label>
          <label>
            {{ copy.age }}
            <input v-model="form.age" type="number" />
          </label>
          <label>
            {{ copy.height }}
            <input v-model="form.heightCm" type="number" />
          </label>
          <label>
            {{ copy.weight }}
            <input v-model="form.weightKg" type="number" />
          </label>
          <label>
            {{ copy.activity }}
            <select v-model="form.activityLevel">
              <option value="LOW">{{ locale === 'ko' ? '낮음' : 'Low' }}</option>
              <option value="LIGHT">{{ locale === 'ko' ? '가벼움' : 'Light' }}</option>
              <option value="MODERATE">{{ locale === 'ko' ? '보통' : 'Moderate' }}</option>
              <option value="HIGH">{{ locale === 'ko' ? '높음' : 'High' }}</option>
            </select>
          </label>
          <label>
            {{ copy.goal }}
            <select v-model="form.goal">
              <option value="LOSE_FAT">{{ locale === 'ko' ? '감량' : 'Lose fat' }}</option>
              <option value="MAINTAIN">{{ locale === 'ko' ? '유지' : 'Maintain' }}</option>
              <option value="GAIN_MUSCLE">{{ locale === 'ko' ? '증량' : 'Gain muscle' }}</option>
            </select>
          </label>
          <label class="wide">
            {{ copy.preferredIngredients }}
            <input v-model="form.preferredIngredients" />
          </label>
          <label class="wide">
            {{ copy.dislikedIngredients }}
            <input v-model="form.dislikedIngredients" />
          </label>
        </div>
        <button class="primary" @click="generatePlan">{{ copy.generatePlan }}</button>
      </section>

      <section v-if="plan" class="plan-card">
        <div class="plan-top">
          <h3>{{ plan.user }} {{ copy.targetLabel }}</h3>
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
          <h2>{{ copy.pantry }}</h2>
          <span>{{ loadingPantry ? copy.searching : copy.matches(pantryMatches.length) }}</span>
        </div>
        <label>
          {{ copy.pantryInput }}
          <textarea v-model="pantryInput" rows="4" />
        </label>
        <button class="primary" @click="fetchPantryMatches">{{ copy.refreshSuggestions }}</button>
        <div class="chip-row">
          <span v-for="item in pantryList" :key="item" class="chip">{{ item }}</span>
        </div>
      </section>

      <section class="stack">
        <article v-for="recipe in pantryMatches" :key="recipe.id" class="compact-card">
          <div>
            <h3>{{ textOf(recipe.title) }}</h3>
            <p>{{ textOf(recipe.summary) }}</p>
          </div>
          <div class="compact-actions">
            <span>{{ nutritionText(recipe.nutrition.calories, ' kcal') }}</span>
            <a :href="recipe.ingredients[0].purchaseUrl" target="_blank" rel="noreferrer">{{ locale === 'ko' ? '장보기' : 'Shop' }}</a>
          </div>
        </article>
      </section>
    </main>

    <div v-if="selectedRecipe" class="modal-backdrop" @click.self="closeRecipeModal">
      <section class="modal-card">
        <div class="section-head">
          <div>
            <h3>{{ textOf(selectedRecipe.title) }}</h3>
            <p class="section-copy">{{ textOf(selectedRecipe.summary) }}</p>
          </div>
          <button class="ghost" @click="closeRecipeModal">Close</button>
        </div>
        <img :src="recipeImageUrl(selectedRecipe.imageUrl)" :alt="textOf(selectedRecipe.title)" class="modal-image" @error="applyFallbackImage" />
        <div class="modal-grid">
          <div>
            <h4>{{ copy.ingredients }}</h4>
            <ul class="ingredient-list">
              <li v-for="ingredient in selectedRecipe.ingredients" :key="ingredient.key">
                <span>{{ textOf(ingredient.name) }} / {{ ingredient.amount }}</span>
                <a :href="ingredient.purchaseUrl" target="_blank" rel="noreferrer">{{ copy.buy }}</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>{{ copy.instructions }}</h4>
            <ol class="step-list">
              <li v-for="(instruction, index) in selectedRecipe.instructions" :key="`${selectedRecipe.id}-${index}`">
                {{ textOf(instruction) }}
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
