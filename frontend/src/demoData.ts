export type Locale = 'ko' | 'en';

export type LocalizedText = {
  ko: string;
  en: string;
};

export type Ingredient = {
  key: string;
  name: LocalizedText;
  amount: string;
  purchaseUrl: string;
};

export type Nutrition = {
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
};

export type MacroTargets = {
  protein: number;
  carbs: number;
  fat: number;
};

export type Recipe = {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  imageUrl: string;
  tags: LocalizedText[];
  ingredients: Ingredient[];
  instructions: LocalizedText[];
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

type SeedRecipe = {
  id: string;
  titleKo: string;
  titleEn: string;
  summaryKo: string;
  summaryEn: string;
  imageUrl: string;
  tagsKo: string[];
  tagsEn: string[];
  ingredients: Array<{ key: string; ko: string; en: string; amount: string; query: string }>;
  instructionsKo: string[];
  instructionsEn: string[];
  nutrition: Nutrition;
};

const seeds: SeedRecipe[] = [
  {
    id: 'salmon-bowl',
    titleKo: '연어 단백질 보울',
    titleEn: 'Salmon Protein Bowl',
    summaryKo: '운동 후 회복에 맞춘 고단백 보울입니다.',
    summaryEn: 'A high-protein balanced bowl for post-workout meals.',
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    tagsKo: ['고단백', '운동식', '간편'],
    tagsEn: ['high-protein', 'fitness', 'quick'],
    ingredients: [
      { key: 'salmon', ko: '연어', en: 'salmon', amount: '180g', query: 'salmon' },
      { key: 'brown rice', ko: '현미밥', en: 'brown rice', amount: '180g', query: 'brown+rice' },
      { key: 'avocado', ko: '아보카도', en: 'avocado', amount: '1/2', query: 'avocado' },
      { key: 'broccoli', ko: '브로콜리', en: 'broccoli', amount: '100g', query: 'broccoli' },
    ],
    instructionsKo: ['연어를 굽습니다.', '현미밥과 브로콜리를 담습니다.', '아보카도와 연어를 올립니다.'],
    instructionsEn: ['Season the salmon and pan-sear it.', 'Plate brown rice and steamed broccoli.', 'Top with sliced avocado and salmon.'],
    nutrition: { calories: 620, protein: 42, carbs: 48, fat: 26 },
  },
  {
    id: 'tofu-wrap',
    titleKo: '두부 채소 랩',
    titleEn: 'Tofu Veggie Wrap',
    summaryKo: '가벼운 점심에 맞춘 저지방 랩입니다.',
    summaryEn: 'A lighter lunch option with moderate protein and low fat.',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
    tagsKo: ['저지방', '채식', '점심'],
    tagsEn: ['low-fat', 'veggie', 'lunch'],
    ingredients: [
      { key: 'whole wheat tortilla', ko: '통밀 또띠아', en: 'whole wheat tortilla', amount: '2', query: 'whole+wheat+tortilla' },
      { key: 'tofu', ko: '두부', en: 'tofu', amount: '150g', query: 'tofu' },
      { key: 'lettuce', ko: '양상추', en: 'lettuce', amount: '60g', query: 'lettuce' },
      { key: 'bell pepper', ko: '파프리카', en: 'bell pepper', amount: '1/2', query: 'bell+pepper' },
    ],
    instructionsKo: ['두부에 간을 합니다.', '팬에 볶아 수분을 날립니다.', '채소와 함께 랩으로 말아줍니다.'],
    instructionsEn: ['Season crumbled tofu with soy sauce and paprika.', 'Cook tofu in a pan until dry and fragrant.', 'Wrap with vegetables in the tortilla.'],
    nutrition: { calories: 430, protein: 24, carbs: 41, fat: 17 },
  },
  {
    id: 'kimchi-egg-fried-rice',
    titleKo: '김치 계란 볶음밥',
    titleEn: 'Kimchi Egg Fried Rice',
    summaryKo: '냉장고 재료를 털기에 좋은 한 그릇 메뉴입니다.',
    summaryEn: 'A pantry-cleanout rice bowl with familiar Korean flavors.',
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
    tagsKo: ['집밥', '냉장고털이', '한식'],
    tagsEn: ['home-style', 'pantry', 'korean'],
    ingredients: [
      { key: 'kimchi', ko: '김치', en: 'kimchi', amount: '120g', query: 'kimchi' },
      { key: 'egg', ko: '계란', en: 'egg', amount: '2', query: 'egg' },
      { key: 'rice', ko: '밥', en: 'rice', amount: '200g', query: 'rice' },
      { key: 'green onion', ko: '대파', en: 'green onion', amount: '1/2 stalk', query: 'green+onion' },
    ],
    instructionsKo: ['김치와 대파를 볶습니다.', '밥과 계란을 넣고 마무리합니다.', '기호에 따라 참기름을 더합니다.'],
    instructionsEn: ['Cook kimchi and green onion in a hot pan.', 'Add rice, then scramble in the egg.', 'Finish with sesame oil if desired.'],
    nutrition: { calories: 540, protein: 19, carbs: 63, fat: 18 },
  },
  {
    id: 'chicken-yogurt-salad',
    titleKo: '치킨 요거트 샐러드',
    titleEn: 'Chicken Yogurt Salad',
    summaryKo: '감량기 포만감 유지에 좋은 샐러드입니다.',
    summaryEn: 'A filling cutting-phase salad with lean protein.',
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80',
    tagsKo: ['감량', '샐러드', '고단백'],
    tagsEn: ['cutting', 'salad', 'high-protein'],
    ingredients: [
      { key: 'chicken breast', ko: '닭가슴살', en: 'chicken breast', amount: '150g', query: 'chicken+breast' },
      { key: 'greek yogurt', ko: '그릭요거트', en: 'greek yogurt', amount: '80g', query: 'greek+yogurt' },
      { key: 'romaine', ko: '로메인', en: 'romaine', amount: '80g', query: 'romaine' },
      { key: 'cherry tomato', ko: '방울토마토', en: 'cherry tomato', amount: '8', query: 'cherry+tomato' },
    ],
    instructionsKo: ['닭가슴살을 익혀 썹니다.', '요거트 드레싱을 만듭니다.', '채소와 함께 버무립니다.'],
    instructionsEn: ['Cook and slice the chicken breast.', 'Make a yogurt dressing with lemon and pepper.', 'Toss with greens and tomatoes.'],
    nutrition: { calories: 360, protein: 39, carbs: 14, fat: 12 },
  },
  {
    id: 'shrimp-pasta',
    titleKo: '새우 레몬 파스타',
    titleEn: 'Shrimp Lemon Pasta',
    summaryKo: '상큼한 레몬 향이 나는 해산물 파스타입니다.',
    summaryEn: 'Seafood pasta brightened with lemon and garlic.',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03246963d29a?auto=format&fit=crop&w=900&q=80',
    tagsKo: ['해산물', '파스타', '저녁'],
    tagsEn: ['seafood', 'pasta', 'dinner'],
    ingredients: [
      { key: 'shrimp', ko: '새우', en: 'shrimp', amount: '150g', query: 'shrimp' },
      { key: 'spaghetti', ko: '스파게티면', en: 'spaghetti', amount: '120g', query: 'spaghetti' },
      { key: 'lemon', ko: '레몬', en: 'lemon', amount: '1', query: 'lemon' },
      { key: 'garlic', ko: '마늘', en: 'garlic', amount: '3 cloves', query: 'garlic' },
    ],
    instructionsKo: ['면을 삶습니다.', '새우와 마늘을 볶습니다.', '레몬즙으로 마무리합니다.'],
    instructionsEn: ['Boil the pasta.', 'Saute shrimp with garlic.', 'Finish with lemon juice and zest.'],
    nutrition: { calories: 510, protein: 31, carbs: 58, fat: 16 },
  },
  {
    id: 'beef-bulgogi-bowl',
    titleKo: '소불고기 덮밥',
    titleEn: 'Beef Bulgogi Bowl',
    summaryKo: '달콤짭짤한 소불고기를 올린 덮밥입니다.',
    summaryEn: 'A sweet and savory bulgogi rice bowl.',
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80',
    tagsKo: ['한식', '덮밥', '단백질'],
    tagsEn: ['korean', 'rice-bowl', 'protein'],
    ingredients: [
      { key: 'beef', ko: '소고기', en: 'beef', amount: '160g', query: 'beef' },
      { key: 'soy sauce', ko: '간장', en: 'soy sauce', amount: '2 tbsp', query: 'soy+sauce' },
      { key: 'onion', ko: '양파', en: 'onion', amount: '1/2', query: 'onion' },
      { key: 'rice', ko: '밥', en: 'rice', amount: '200g', query: 'rice' },
    ],
    instructionsKo: ['고기를 양념합니다.', '양파와 함께 볶습니다.', '밥 위에 올립니다.'],
    instructionsEn: ['Marinate the beef.', 'Stir-fry with sliced onion.', 'Serve over rice.'],
    nutrition: { calories: 670, protein: 34, carbs: 62, fat: 29 },
  },
  {
    id: 'avocado-toast',
    titleKo: '아보카도 에그 토스트',
    titleEn: 'Avocado Egg Toast',
    summaryKo: '브런치로 좋은 간단한 오픈 토스트입니다.',
    summaryEn: 'A quick brunch toast with creamy avocado and egg.',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80',
    tagsKo: ['브런치', '간단식', '아침'],
    tagsEn: ['brunch', 'quick', 'breakfast'],
    ingredients: [
      { key: 'avocado', ko: '아보카도', en: 'avocado', amount: '1/2', query: 'avocado' },
      { key: 'egg', ko: '계란', en: 'egg', amount: '2', query: 'egg' },
      { key: 'sourdough bread', ko: '식빵', en: 'sourdough bread', amount: '2 slices', query: 'bread' },
      { key: 'chili flakes', ko: '고춧가루', en: 'chili flakes', amount: '1 tsp', query: 'chili+flakes' },
    ],
    instructionsKo: ['빵을 굽습니다.', '아보카도를 으깹니다.', '달걀과 함께 올립니다.'],
    instructionsEn: ['Toast the bread.', 'Mash the avocado with seasoning.', 'Top with eggs and chili flakes.'],
    nutrition: { calories: 390, protein: 17, carbs: 26, fat: 24 },
  },
  {
    id: 'miso-cod',
    titleKo: '미소 대구 구이',
    titleEn: 'Miso Glazed Cod',
    summaryKo: '짭조름한 미소 소스의 생선 구이입니다.',
    summaryEn: 'Tender cod coated with a savory miso glaze.',
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
    tagsKo: ['생선', '오븐', '일식'],
    tagsEn: ['fish', 'oven', 'japanese'],
    ingredients: [
      { key: 'cod', ko: '대구', en: 'cod', amount: '180g', query: 'cod' },
      { key: 'miso', ko: '미소', en: 'miso', amount: '1 tbsp', query: 'miso' },
      { key: 'honey', ko: '꿀', en: 'honey', amount: '1 tsp', query: 'honey' },
      { key: 'asparagus', ko: '아스파라거스', en: 'asparagus', amount: '80g', query: 'asparagus' },
    ],
    instructionsKo: ['미소 양념을 만듭니다.', '대구에 발라 굽습니다.', '아스파라거스를 곁들입니다.'],
    instructionsEn: ['Mix the miso glaze.', 'Brush it over cod and bake.', 'Serve with asparagus.'],
    nutrition: { calories: 340, protein: 32, carbs: 12, fat: 17 },
  },
  {
    id: 'turkey-sandwich',
    titleKo: '터키 샌드위치',
    titleEn: 'Turkey Club Sandwich',
    summaryKo: '점심으로 좋은 든든한 샌드위치입니다.',
    summaryEn: 'A hearty sandwich that works well for lunch.',
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80',
    tagsKo: ['샌드위치', '점심', '간편'],
    tagsEn: ['sandwich', 'lunch', 'quick'],
    ingredients: [
      { key: 'turkey', ko: '터키햄', en: 'turkey', amount: '120g', query: 'turkey' },
      { key: 'bread', ko: '식빵', en: 'bread', amount: '3 slices', query: 'bread' },
      { key: 'tomato', ko: '토마토', en: 'tomato', amount: '1', query: 'tomato' },
      { key: 'lettuce', ko: '상추', en: 'lettuce', amount: '40g', query: 'lettuce' },
    ],
    instructionsKo: ['빵을 굽습니다.', '재료를 층층이 쌓습니다.', '반으로 자릅니다.'],
    instructionsEn: ['Toast the bread.', 'Layer turkey and vegetables.', 'Slice the sandwich in half.'],
    nutrition: { calories: 450, protein: 29, carbs: 38, fat: 18 },
  },
  {
    id: 'bibimbap',
    titleKo: '채소 비빔밥',
    titleEn: 'Vegetable Bibimbap',
    summaryKo: '다양한 채소를 한 그릇에 담은 비빔밥입니다.',
    summaryEn: 'A mixed rice bowl with colorful vegetables.',
    imageUrl: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=900&q=80',
    tagsKo: ['한식', '채소', '밸런스'],
    tagsEn: ['korean', 'vegetable', 'balanced'],
    ingredients: [
      { key: 'rice', ko: '밥', en: 'rice', amount: '200g', query: 'rice' },
      { key: 'spinach', ko: '시금치', en: 'spinach', amount: '50g', query: 'spinach' },
      { key: 'carrot', ko: '당근', en: 'carrot', amount: '40g', query: 'carrot' },
      { key: 'egg', ko: '계란', en: 'egg', amount: '1', query: 'egg' },
    ],
    instructionsKo: ['채소를 각각 볶습니다.', '밥 위에 올립니다.', '고추장과 함께 비빕니다.'],
    instructionsEn: ['Cook each vegetable separately.', 'Arrange them over rice.', 'Mix with egg and gochujang.'],
    nutrition: { calories: 560, protein: 21, carbs: 77, fat: 17 },
  },
  {
    id: 'oatmeal-bowl',
    titleKo: '베리 오트밀 볼',
    titleEn: 'Berry Oatmeal Bowl',
    summaryKo: '아침용으로 좋은 따뜻한 오트밀입니다.',
    summaryEn: 'A warm breakfast bowl with berries and nuts.',
    imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=900&q=80',
    tagsKo: ['아침', '오트밀', '간단식'],
    tagsEn: ['breakfast', 'oatmeal', 'quick'],
    ingredients: [
      { key: 'oats', ko: '오트밀', en: 'oats', amount: '60g', query: 'oats' },
      { key: 'milk', ko: '우유', en: 'milk', amount: '200ml', query: 'milk' },
      { key: 'blueberry', ko: '블루베리', en: 'blueberry', amount: '50g', query: 'blueberry' },
      { key: 'almond', ko: '아몬드', en: 'almond', amount: '15g', query: 'almond' },
    ],
    instructionsKo: ['오트밀을 끓입니다.', '베리와 견과를 올립니다.', '따뜻하게 먹습니다.'],
    instructionsEn: ['Simmer oats with milk.', 'Top with berries and almonds.', 'Serve warm.'],
    nutrition: { calories: 320, protein: 12, carbs: 42, fat: 11 },
  },
  {
    id: 'steak-potatoes',
    titleKo: '스테이크와 감자',
    titleEn: 'Steak and Potatoes',
    summaryKo: '클래식한 단백질 중심 저녁 메뉴입니다.',
    summaryEn: 'A classic protein-forward dinner plate.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    tagsKo: ['스테이크', '저녁', '고단백'],
    tagsEn: ['steak', 'dinner', 'high-protein'],
    ingredients: [
      { key: 'steak', ko: '스테이크', en: 'steak', amount: '200g', query: 'steak' },
      { key: 'potato', ko: '감자', en: 'potato', amount: '200g', query: 'potato' },
      { key: 'butter', ko: '버터', en: 'butter', amount: '10g', query: 'butter' },
      { key: 'rosemary', ko: '로즈마리', en: 'rosemary', amount: '1 sprig', query: 'rosemary' },
    ],
    instructionsKo: ['감자를 굽습니다.', '스테이크를 시어링합니다.', '허브 버터로 마무리합니다.'],
    instructionsEn: ['Roast the potatoes.', 'Sear the steak to desired doneness.', 'Finish with rosemary butter.'],
    nutrition: { calories: 690, protein: 46, carbs: 39, fat: 37 },
  },
  {
    id: 'pesto-gnocchi',
    titleKo: '페스토 뇨끼',
    titleEn: 'Pesto Gnocchi',
    summaryKo: '부드러운 뇨끼에 페스토를 더한 메뉴입니다.',
    summaryEn: 'Soft gnocchi tossed in basil pesto.',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80',
    tagsKo: ['이탈리안', '뇨끼', '저녁'],
    tagsEn: ['italian', 'gnocchi', 'dinner'],
    ingredients: [
      { key: 'gnocchi', ko: '뇨끼', en: 'gnocchi', amount: '220g', query: 'gnocchi' },
      { key: 'pesto', ko: '페스토', en: 'pesto', amount: '2 tbsp', query: 'pesto' },
      { key: 'parmesan', ko: '파마산', en: 'parmesan', amount: '15g', query: 'parmesan' },
      { key: 'spinach', ko: '시금치', en: 'spinach', amount: '40g', query: 'spinach' },
    ],
    instructionsKo: ['뇨끼를 삶습니다.', '페스토와 버무립니다.', '치즈를 뿌립니다.'],
    instructionsEn: ['Boil the gnocchi.', 'Toss with pesto and spinach.', 'Top with parmesan.'],
    nutrition: { calories: 560, protein: 15, carbs: 67, fat: 24 },
  },
  {
    id: 'tuna-melt',
    titleKo: '참치 멜트 토스트',
    titleEn: 'Tuna Melt Toast',
    summaryKo: '참치와 치즈를 올린 든든한 토스트입니다.',
    summaryEn: 'Toasted bread topped with tuna and melted cheese.',
    imageUrl: 'https://images.unsplash.com/photo-1525351326368-efbb5cb6814d?auto=format&fit=crop&w=900&q=80',
    tagsKo: ['토스트', '참치', '점심'],
    tagsEn: ['toast', 'tuna', 'lunch'],
    ingredients: [
      { key: 'tuna', ko: '참치', en: 'tuna', amount: '1 can', query: 'tuna' },
      { key: 'cheddar', ko: '체다치즈', en: 'cheddar', amount: '2 slices', query: 'cheddar' },
      { key: 'bread', ko: '식빵', en: 'bread', amount: '2 slices', query: 'bread' },
      { key: 'celery', ko: '샐러리', en: 'celery', amount: '20g', query: 'celery' },
    ],
    instructionsKo: ['참치 소를 만듭니다.', '빵 위에 올립니다.', '치즈를 녹여 마무리합니다.'],
    instructionsEn: ['Mix the tuna filling.', 'Spread over bread.', 'Broil until the cheese melts.'],
    nutrition: { calories: 410, protein: 30, carbs: 27, fat: 18 },
  },
  {
    id: 'ramen-upgrade',
    titleKo: '업그레이드 라면',
    titleEn: 'Upgraded Ramen Bowl',
    summaryKo: '라면에 단백질과 채소를 더한 한 그릇입니다.',
    summaryEn: 'Instant ramen upgraded with protein and greens.',
    imageUrl: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=900&q=80',
    tagsKo: ['면요리', '간편식', '야식'],
    tagsEn: ['noodles', 'quick', 'comfort'],
    ingredients: [
      { key: 'ramen', ko: '라면', en: 'ramen', amount: '1 pack', query: 'ramen' },
      { key: 'egg', ko: '계란', en: 'egg', amount: '1', query: 'egg' },
      { key: 'bok choy', ko: '청경채', en: 'bok choy', amount: '60g', query: 'bok+choy' },
      { key: 'tofu', ko: '두부', en: 'tofu', amount: '80g', query: 'tofu' },
    ],
    instructionsKo: ['면을 끓입니다.', '두부와 채소를 넣습니다.', '계란으로 마무리합니다.'],
    instructionsEn: ['Cook the noodles in broth.', 'Add tofu and greens.', 'Finish with a soft egg.'],
    nutrition: { calories: 510, protein: 20, carbs: 56, fat: 22 },
  },
  {
    id: 'falafel-plate',
    titleKo: '팔라펠 플레이트',
    titleEn: 'Falafel Plate',
    summaryKo: '중동풍 채소 플레이트입니다.',
    summaryEn: 'A Middle Eastern style plate with falafel and salad.',
    imageUrl: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=900&q=80',
    tagsKo: ['비건', '중동', '플레이트'],
    tagsEn: ['vegan', 'middle-eastern', 'plate'],
    ingredients: [
      { key: 'falafel', ko: '팔라펠', en: 'falafel', amount: '6 pieces', query: 'falafel' },
      { key: 'hummus', ko: '후무스', en: 'hummus', amount: '3 tbsp', query: 'hummus' },
      { key: 'cucumber', ko: '오이', en: 'cucumber', amount: '1/2', query: 'cucumber' },
      { key: 'tomato', ko: '토마토', en: 'tomato', amount: '1', query: 'tomato' },
    ],
    instructionsKo: ['팔라펠을 굽습니다.', '채소를 썹니다.', '후무스와 함께 담습니다.'],
    instructionsEn: ['Bake or air-fry the falafel.', 'Slice the vegetables.', 'Serve with hummus.'],
    nutrition: { calories: 480, protein: 17, carbs: 46, fat: 24 },
  },
  {
    id: 'pancake-stack',
    titleKo: '바나나 팬케이크',
    titleEn: 'Banana Pancake Stack',
    summaryKo: '주말 브런치용 달콤한 팬케이크입니다.',
    summaryEn: 'A sweet weekend brunch pancake stack.',
    imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=80',
    tagsKo: ['브런치', '디저트', '팬케이크'],
    tagsEn: ['brunch', 'sweet', 'pancake'],
    ingredients: [
      { key: 'banana', ko: '바나나', en: 'banana', amount: '1', query: 'banana' },
      { key: 'flour', ko: '밀가루', en: 'flour', amount: '120g', query: 'flour' },
      { key: 'milk', ko: '우유', en: 'milk', amount: '160ml', query: 'milk' },
      { key: 'maple syrup', ko: '메이플시럽', en: 'maple syrup', amount: '2 tbsp', query: 'maple+syrup' },
    ],
    instructionsKo: ['반죽을 만듭니다.', '팬에 노릇하게 굽습니다.', '바나나와 시럽을 올립니다.'],
    instructionsEn: ['Make the pancake batter.', 'Cook until golden on both sides.', 'Serve with banana and maple syrup.'],
    nutrition: { calories: 520, protein: 11, carbs: 78, fat: 17 },
  },
  {
    id: 'chili-con-carne',
    titleKo: '칠리 콘 카르네',
    titleEn: 'Chili Con Carne',
    summaryKo: '콩과 소고기를 넣은 진한 칠리입니다.',
    summaryEn: 'A rich chili with beef and beans.',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80',
    tagsKo: ['스튜', '매콤', '단백질'],
    tagsEn: ['stew', 'spicy', 'protein'],
    ingredients: [
      { key: 'ground beef', ko: '다진 소고기', en: 'ground beef', amount: '180g', query: 'ground+beef' },
      { key: 'kidney beans', ko: '강낭콩', en: 'kidney beans', amount: '120g', query: 'kidney+beans' },
      { key: 'tomato sauce', ko: '토마토소스', en: 'tomato sauce', amount: '150g', query: 'tomato+sauce' },
      { key: 'onion', ko: '양파', en: 'onion', amount: '1/2', query: 'onion' },
    ],
    instructionsKo: ['고기와 양파를 볶습니다.', '콩과 소스를 넣습니다.', '약불로 졸입니다.'],
    instructionsEn: ['Brown the beef with onion.', 'Add beans and tomato sauce.', 'Simmer until thick.'],
    nutrition: { calories: 590, protein: 38, carbs: 36, fat: 31 },
  },
  {
    id: 'caprese-salad',
    titleKo: '카프레제 샐러드',
    titleEn: 'Caprese Salad',
    summaryKo: '토마토와 모차렐라 중심의 가벼운 샐러드입니다.',
    summaryEn: 'A light salad with tomato, mozzarella, and basil.',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
    tagsKo: ['샐러드', '이탈리안', '가벼움'],
    tagsEn: ['salad', 'italian', 'light'],
    ingredients: [
      { key: 'mozzarella', ko: '모차렐라', en: 'mozzarella', amount: '100g', query: 'mozzarella' },
      { key: 'tomato', ko: '토마토', en: 'tomato', amount: '2', query: 'tomato' },
      { key: 'basil', ko: '바질', en: 'basil', amount: '10 leaves', query: 'basil' },
      { key: 'olive oil', ko: '올리브오일', en: 'olive oil', amount: '1 tbsp', query: 'olive+oil' },
    ],
    instructionsKo: ['토마토와 치즈를 자릅니다.', '바질을 곁들입니다.', '올리브오일을 뿌립니다.'],
    instructionsEn: ['Slice tomato and mozzarella.', 'Layer with basil leaves.', 'Drizzle olive oil on top.'],
    nutrition: { calories: 280, protein: 16, carbs: 9, fat: 21 },
  },
  {
    id: 'teriyaki-chicken',
    titleKo: '데리야키 치킨',
    titleEn: 'Teriyaki Chicken Plate',
    summaryKo: '달콤한 소스를 입힌 치킨 플레이트입니다.',
    summaryEn: 'A glossy chicken plate with teriyaki sauce.',
    imageUrl: 'https://images.unsplash.com/photo-1604909053197-4a14b7f2a3c2?auto=format&fit=crop&w=900&q=80',
    tagsKo: ['치킨', '일식풍', '저녁'],
    tagsEn: ['chicken', 'japanese-style', 'dinner'],
    ingredients: [
      { key: 'chicken thigh', ko: '닭다리살', en: 'chicken thigh', amount: '180g', query: 'chicken+thigh' },
      { key: 'teriyaki sauce', ko: '데리야키소스', en: 'teriyaki sauce', amount: '2 tbsp', query: 'teriyaki+sauce' },
      { key: 'rice', ko: '밥', en: 'rice', amount: '180g', query: 'rice' },
      { key: 'sesame', ko: '참깨', en: 'sesame', amount: '1 tsp', query: 'sesame' },
    ],
    instructionsKo: ['치킨을 굽습니다.', '소스를 입혀 졸입니다.', '밥과 함께 담습니다.'],
    instructionsEn: ['Cook the chicken until browned.', 'Reduce with teriyaki sauce.', 'Serve over rice with sesame.'],
    nutrition: { calories: 610, protein: 33, carbs: 52, fat: 28 },
  },
  {
    id: 'veggie-curry',
    titleKo: '채소 카레',
    titleEn: 'Vegetable Curry',
    summaryKo: '부드러운 향신료 풍미의 채소 카레입니다.',
    summaryEn: 'A mild vegetable curry with warm spices.',
    imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=900&q=80',
    tagsKo: ['카레', '채소', '밥반찬'],
    tagsEn: ['curry', 'vegetable', 'rice'],
    ingredients: [
      { key: 'potato', ko: '감자', en: 'potato', amount: '120g', query: 'potato' },
      { key: 'carrot', ko: '당근', en: 'carrot', amount: '60g', query: 'carrot' },
      { key: 'curry roux', ko: '카레', en: 'curry roux', amount: '1 block', query: 'curry' },
      { key: 'rice', ko: '밥', en: 'rice', amount: '180g', query: 'rice' },
    ],
    instructionsKo: ['채소를 볶습니다.', '물과 카레를 넣습니다.', '밥과 함께 제공합니다.'],
    instructionsEn: ['Saute the vegetables.', 'Add water and curry roux.', 'Serve with steamed rice.'],
    nutrition: { calories: 530, protein: 11, carbs: 82, fat: 16 },
  },
  {
    id: 'berry-smoothie',
    titleKo: '베리 프로틴 스무디',
    titleEn: 'Berry Protein Smoothie',
    summaryKo: '운동 전후로 마시기 좋은 스무디입니다.',
    summaryEn: 'A protein smoothie for before or after training.',
    imageUrl: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=900&q=80',
    tagsKo: ['스무디', '운동식', '간편'],
    tagsEn: ['smoothie', 'fitness', 'quick'],
    ingredients: [
      { key: 'protein powder', ko: '프로틴 파우더', en: 'protein powder', amount: '1 scoop', query: 'protein+powder' },
      { key: 'banana', ko: '바나나', en: 'banana', amount: '1', query: 'banana' },
      { key: 'berry', ko: '믹스베리', en: 'berry', amount: '80g', query: 'mixed+berry' },
      { key: 'milk', ko: '우유', en: 'milk', amount: '250ml', query: 'milk' },
    ],
    instructionsKo: ['모든 재료를 블렌더에 넣습니다.', '부드럽게 갈아줍니다.', '차갑게 마십니다.'],
    instructionsEn: ['Add all ingredients to a blender.', 'Blend until smooth.', 'Serve chilled.'],
    nutrition: { calories: 310, protein: 27, carbs: 31, fat: 8 },
  },
];

export const demoRecipes: Recipe[] = seeds.map((seed) => ({
  id: seed.id,
  title: { ko: seed.titleKo, en: seed.titleEn },
  summary: { ko: seed.summaryKo, en: seed.summaryEn },
  imageUrl: seed.imageUrl,
  tags: seed.tagsKo.map((tag, index) => ({ ko: tag, en: seed.tagsEn[index] ?? tag })),
  ingredients: seed.ingredients.map((ingredient) => ({
    key: ingredient.key,
    name: { ko: ingredient.ko, en: ingredient.en },
    amount: ingredient.amount,
    purchaseUrl: `https://www.coupang.com/np/search?q=${ingredient.query}`,
  })),
  instructions: seed.instructionsKo.map((step, index) => ({ ko: step, en: seed.instructionsEn[index] ?? step })),
  nutrition: seed.nutrition,
}));

export function localizeText(value: LocalizedText, locale: Locale): string {
  return value[locale];
}

export function recommendDemoRecipes(items: string[]): Recipe[] {
  const normalizedItems = items.map((item) => item.toLowerCase().trim()).filter(Boolean);

  return [...demoRecipes]
    .map((recipe) => ({
      recipe,
      matches: recipe.ingredients.filter((ingredient) => {
        const candidateNames = [ingredient.key, ingredient.name.ko, ingredient.name.en].map((value) => value.toLowerCase());
        return normalizedItems.some((item) => candidateNames.some((candidate) => candidate.includes(item)));
      }).length,
    }))
    .filter(({ matches }) => matches > 0)
    .sort((left, right) => right.matches - left.matches)
    .map(({ recipe }) => recipe);
}

export function buildDemoMealPlan(request: MealPlanRequest, locale: Locale): MealPlan {
  const targetCalories = calculateTargetCalories(request);
  const macroTargets = calculateMacroTargets(targetCalories, request.goal);
  const preferredFocus = request.preferredIngredients[0] ?? (locale === 'ko' ? '연어' : 'salmon');
  const dislikedText = request.dislikedIngredients.length > 0 ? request.dislikedIngredients.join(', ') : locale === 'ko' ? '없음' : 'none';

  return {
    user: request.name,
    targetCalories,
    macroTargets,
    meals: [
      {
        mealType: locale === 'ko' ? '아침' : 'Breakfast',
        title: locale === 'ko' ? `${preferredFocus} 오픈 토스트` : `${preferredFocus} open toast`,
        rationale:
          locale === 'ko'
            ? '첫 끼는 선호 재료를 중심에 둬서 식단 유지 난이도를 낮췄습니다.'
            : 'The first meal leans on preferred ingredients for easier adherence.',
        ingredients:
          locale === 'ko'
            ? [preferredFocus, '통곡물빵', '계란', '방울토마토']
            : [preferredFocus, 'whole grain bread', 'egg', 'cherry tomato'],
        nutrition: splitNutrition(targetCalories, 0.28, 0.25, 0.35),
      },
      {
        mealType: locale === 'ko' ? '점심' : 'Lunch',
        title: locale === 'ko' ? '밸런스 프로틴 볼' : 'Balanced protein bowl',
        rationale:
          locale === 'ko'
            ? '점심은 단백질과 복합탄수를 균형 있게 배치해 하루 컨디션을 받쳐줍니다.'
            : 'Lunch anchors the day with lean protein and complex carbohydrates.',
        ingredients:
          locale === 'ko'
            ? ['현미밥', '닭가슴살', '브로콜리', preferredFocus]
            : ['brown rice', 'chicken breast', 'broccoli', preferredFocus],
        nutrition: splitNutrition(targetCalories, 0.4, 0.35, 0.3),
      },
      {
        mealType: locale === 'ko' ? '저녁' : 'Dinner',
        title: locale === 'ko' ? '팬트리 클린업 스킬렛' : 'Pantry cleanup skillet',
        rationale:
          locale === 'ko'
            ? '저녁은 조리 부담을 줄이고 남은 재료 활용도를 높이는 방향으로 잡았습니다.'
            : 'Dinner keeps prep simple and improves pantry utilization.',
        ingredients: locale === 'ko' ? [preferredFocus, '두부', '양파', '버섯'] : [preferredFocus, 'tofu', 'onion', 'mushroom'],
        nutrition: splitNutrition(targetCalories, 0.32, 0.4, 0.35),
      },
    ],
    notes:
      locale === 'ko'
        ? [
            '목표 열량은 TDEE 기반입니다.',
            `기피 재료: ${dislikedText}`,
            '배포 환경에서 API가 없으면 브라우저 내장 추천 로직으로 동작합니다.',
          ]
        : [
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
