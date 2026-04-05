export type Ingredient = {
  name: string;
  amount: string;
  purchaseUrl: string;
};

export type Nutrition = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type MacroTargets = {
  protein: number;
  carbs: number;
  fat: number;
};

export type Recipe = {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  tags: string[];
  ingredients: Ingredient[];
  instructions: string[];
  nutrition: Nutrition;
};

export type MealPlan = {
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

type Goal = 'LOSE_FAT' | 'MAINTAIN' | 'GAIN_MUSCLE';
type Sex = 'MALE' | 'FEMALE';
type ActivityLevel = 'LOW' | 'LIGHT' | 'MODERATE' | 'HIGH';

type MealPlanRequest = {
  name: string;
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  goal: Goal;
  preferredIngredients: string[];
  dislikedIngredients: string[];
};

export const demoRecipes: Recipe[] = [
  {
    id: 'salmon-bowl',
    title: 'Salmon Protein Bowl',
    summary: 'A high-protein balanced bowl for post-workout meals.',
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    tags: ['high-protein', 'fitness', 'quick'],
    ingredients: [
      { name: 'salmon', amount: '180g', purchaseUrl: 'https://www.coupang.com/np/search?q=salmon' },
      { name: 'brown rice', amount: '180g', purchaseUrl: 'https://www.coupang.com/np/search?q=brown+rice' },
      { name: 'avocado', amount: '1/2', purchaseUrl: 'https://www.coupang.com/np/search?q=avocado' },
      { name: 'broccoli', amount: '100g', purchaseUrl: 'https://www.coupang.com/np/search?q=broccoli' },
    ],
    instructions: [
      'Season the salmon and pan-sear it.',
      'Plate brown rice and steamed broccoli.',
      'Top with sliced avocado and salmon.',
    ],
    nutrition: { calories: 620, protein: 42, carbs: 48, fat: 26 },
  },
  {
    id: 'tofu-wrap',
    title: 'Tofu Veggie Wrap',
    summary: 'A lighter lunch option with moderate protein and low fat.',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
    tags: ['low-fat', 'veggie', 'lunch'],
    ingredients: [
      { name: 'whole wheat tortilla', amount: '2', purchaseUrl: 'https://www.coupang.com/np/search?q=whole+wheat+tortilla' },
      { name: 'tofu', amount: '150g', purchaseUrl: 'https://www.coupang.com/np/search?q=tofu' },
      { name: 'lettuce', amount: '60g', purchaseUrl: 'https://www.coupang.com/np/search?q=lettuce' },
      { name: 'bell pepper', amount: '1/2', purchaseUrl: 'https://www.coupang.com/np/search?q=bell+pepper' },
    ],
    instructions: [
      'Season crumbled tofu with soy sauce and paprika.',
      'Cook tofu in a pan until dry and fragrant.',
      'Wrap with vegetables in the tortilla.',
    ],
    nutrition: { calories: 430, protein: 24, carbs: 41, fat: 17 },
  },
  {
    id: 'kimchi-egg-fried-rice',
    title: 'Kimchi Egg Fried Rice',
    summary: 'A pantry-cleanout rice bowl with familiar Korean flavors.',
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
    tags: ['home-style', 'pantry', 'korean'],
    ingredients: [
      { name: 'kimchi', amount: '120g', purchaseUrl: 'https://www.coupang.com/np/search?q=kimchi' },
      { name: 'egg', amount: '2', purchaseUrl: 'https://www.coupang.com/np/search?q=egg' },
      { name: 'rice', amount: '200g', purchaseUrl: 'https://www.coupang.com/np/search?q=rice' },
      { name: 'green onion', amount: '1/2 stalk', purchaseUrl: 'https://www.coupang.com/np/search?q=green+onion' },
    ],
    instructions: [
      'Cook kimchi and green onion in a hot pan.',
      'Add rice, then scramble in the egg.',
      'Finish with sesame oil if desired.',
    ],
    nutrition: { calories: 540, protein: 19, carbs: 63, fat: 18 },
  },
  {
    id: 'chicken-yogurt-salad',
    title: 'Chicken Yogurt Salad',
    summary: 'A filling cutting-phase salad with lean protein.',
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80',
    tags: ['cutting', 'salad', 'high-protein'],
    ingredients: [
      { name: 'chicken breast', amount: '150g', purchaseUrl: 'https://www.coupang.com/np/search?q=chicken+breast' },
      { name: 'greek yogurt', amount: '80g', purchaseUrl: 'https://www.coupang.com/np/search?q=greek+yogurt' },
      { name: 'romaine', amount: '80g', purchaseUrl: 'https://www.coupang.com/np/search?q=romaine' },
      { name: 'cherry tomato', amount: '8', purchaseUrl: 'https://www.coupang.com/np/search?q=cherry+tomato' },
    ],
    instructions: [
      'Cook and slice the chicken breast.',
      'Make a yogurt dressing with lemon and pepper.',
      'Toss with greens and tomatoes.',
    ],
    nutrition: { calories: 360, protein: 39, carbs: 14, fat: 12 },
  },
];

export function recommendDemoRecipes(items: string[]): Recipe[] {
  const normalizedItems = items.map((item) => item.toLowerCase().trim()).filter(Boolean);

  return [...demoRecipes]
    .map((recipe) => ({
      recipe,
      matches: recipe.ingredients.filter((ingredient) =>
        normalizedItems.some((item) => ingredient.name.toLowerCase().includes(item)),
      ).length,
    }))
    .filter(({ matches }) => matches > 0)
    .sort((left, right) => right.matches - left.matches)
    .map(({ recipe }) => recipe);
}

export function buildDemoMealPlan(request: MealPlanRequest): MealPlan {
  const targetCalories = calculateTargetCalories(request);
  const macroTargets = calculateMacroTargets(targetCalories, request.goal);
  const preferredFocus = request.preferredIngredients[0] ?? 'salmon';
  const dislikedText = request.dislikedIngredients.length > 0 ? request.dislikedIngredients.join(', ') : 'none';

  return {
    user: request.name,
    targetCalories,
    macroTargets,
    meals: [
      {
        mealType: 'Breakfast',
        title: `${preferredFocus} open toast`,
        rationale: 'The first meal leans on preferred ingredients for easier adherence.',
        ingredients: [preferredFocus, 'whole grain bread', 'egg', 'cherry tomato'],
        nutrition: splitNutrition(targetCalories, 0.28, 0.25, 0.35),
      },
      {
        mealType: 'Lunch',
        title: 'Balanced protein bowl',
        rationale: 'Lunch anchors the day with lean protein and complex carbohydrates.',
        ingredients: ['brown rice', 'chicken breast', 'broccoli', preferredFocus],
        nutrition: splitNutrition(targetCalories, 0.4, 0.35, 0.3),
      },
      {
        mealType: 'Dinner',
        title: 'Pantry cleanup skillet',
        rationale: 'Dinner keeps prep simple and improves pantry utilization.',
        ingredients: [preferredFocus, 'tofu', 'onion', 'mushroom'],
        nutrition: splitNutrition(targetCalories, 0.32, 0.4, 0.35),
      },
    ],
    notes: [
      'Target calories are based on TDEE.',
      `Disliked ingredients: ${dislikedText}`,
      'This deployment uses an in-browser demo planner when the backend API is unavailable.',
    ],
  };
}

function calculateTargetCalories(request: MealPlanRequest): number {
  const bmr =
    request.sex === 'MALE'
      ? 10 * request.weightKg + 6.25 * request.heightCm - 5 * request.age + 5
      : 10 * request.weightKg + 6.25 * request.heightCm - 5 * request.age - 161;

  const multiplierMap: Record<ActivityLevel, number> = {
    LOW: 1.2,
    LIGHT: 1.375,
    MODERATE: 1.55,
    HIGH: 1.725,
  };

  const goalAdjustment: Record<Goal, number> = {
    LOSE_FAT: -350,
    MAINTAIN: 0,
    GAIN_MUSCLE: 250,
  };

  return Math.round(bmr * multiplierMap[request.activityLevel] + goalAdjustment[request.goal]);
}

function calculateMacroTargets(calories: number, goal: Goal): MacroTargets {
  const proteinRatio = goal === 'GAIN_MUSCLE' ? 0.3 : 0.28;
  const fatRatio = 0.25;
  const carbsRatio = 1 - proteinRatio - fatRatio;

  return {
    protein: gramsFromCalories(calories * proteinRatio, 4),
    carbs: gramsFromCalories(calories * carbsRatio, 4),
    fat: gramsFromCalories(calories * fatRatio, 9),
  };
}

function splitNutrition(totalCalories: number, calorieRatio: number, proteinRatio: number, carbRatio: number): Nutrition {
  const calories = Math.round(totalCalories * calorieRatio);
  const protein = gramsFromCalories(calories * proteinRatio, 4);
  const carbs = gramsFromCalories(calories * carbRatio, 4);
  const fatCalories = calories - (protein * 4 + carbs * 4);

  return {
    calories,
    protein,
    carbs,
    fat: Math.max(1, gramsFromCalories(fatCalories, 9)),
  };
}

function gramsFromCalories(calories: number, divisor: number): number {
  return Math.round(calories / divisor);
}
