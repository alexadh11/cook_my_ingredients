import * as fs from 'fs';
import * as path from 'path';
import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const progressPath = path.join(process.cwd(), 'src/additional_recipes_progress.json');
const finalPath = path.join(process.cwd(), 'src/additional_recipes.ts');

interface ProgressData {
  generatedRecipes: any[];
  generatedCourseOverrides: Record<string, string>;
  generatedNewIngredients: any[];
  completedBatches: string[];
}

// Load progress or initialize
let progress: ProgressData = {
  generatedRecipes: [],
  generatedCourseOverrides: {},
  generatedNewIngredients: [],
  completedBatches: []
};

if (fs.existsSync(progressPath)) {
  try {
    progress = JSON.parse(fs.readFileSync(progressPath, 'utf-8'));
    console.log(`Loaded existing progress. Recipes: ${progress.generatedRecipes.length}, Completed batches: ${progress.completedBatches.length}`);
  } catch (err) {
    console.warn("Could not parse progress file, starting fresh.");
  }
}

function saveProgress() {
  fs.writeFileSync(progressPath, JSON.stringify(progress, null, 2), 'utf-8');
  
  const additionalContent = `import { Recipe, Ingredient } from "./data";

export const ADDITIONAL_INGREDIENTS: Ingredient[] = ${JSON.stringify(progress.generatedNewIngredients, null, 2)};

export const ADDITIONAL_RECIPES: Recipe[] = ${JSON.stringify(progress.generatedRecipes, null, 2)};

export const ADDITIONAL_COURSE_OVERRIDES: Record<string, string> = ${JSON.stringify(progress.generatedCourseOverrides, null, 2)};
`;
  fs.writeFileSync(finalPath, additionalContent, 'utf-8');
  console.log(`Saved progress to disk. Total recipes: ${progress.generatedRecipes.length}`);
}

// Classification helpers exactly matching src/data.ts
function getRecipeRegion(recipe: any): string {
  const cuisine = (recipe.cuisine || "").toLowerCase();
  const id = (recipe.id || "").toLowerCase();
  if (
    cuisine.includes("nigerian") || cuisine.includes("ghanaian") || cuisine.includes("african") ||
    cuisine.includes("senegalese") || cuisine.includes("ethiopian") || cuisine.includes("moroccan") ||
    cuisine.includes("tunisian") || cuisine.includes("egyptian") || cuisine.includes("algerian") ||
    cuisine.includes("libyan") || cuisine.includes("somali") || cuisine.includes("south african") ||
    cuisine.includes("zimbabwean") || cuisine.includes("angolan") || cuisine.includes("cameroonian") ||
    cuisine.includes("congolese") || cuisine.includes("ivory coast") || cuisine.includes("mozambican") ||
    cuisine.includes("tanzanian") || cuisine.includes("mauritian") || cuisine.includes("kenyan") ||
    cuisine.includes("sudanese") || cuisine.includes("madagascan") || id.includes("jollof") ||
    id.includes("maffe") || id.includes("chakalaka") || id.includes("bobotie") || id.includes("harissa") ||
    id.includes("koshary") || id.includes("koshari") || id.startsWith("african-") || id.startsWith("africa-")
  ) {
    return "African Cuisines";
  } else if (
    cuisine.includes("middle eastern") || cuisine.includes("turkish") || cuisine.includes("lebanese") ||
    cuisine.includes("persian") || cuisine.includes("jordanian") || cuisine.includes("syrian") ||
    cuisine.includes("iraqi") || cuisine.includes("palestinian") || cuisine.includes("saudi") ||
    cuisine.includes("yemeni") || (cuisine.includes("omani") && !cuisine.includes("romanian")) || cuisine.includes("kuwaiti") ||
    cuisine.includes("iranian") || cuisine.includes("qatari") || cuisine.includes("bahraini") ||
    id.includes("falafel") || id.includes("hummus") || id.includes("shakshuka") || id.includes("mujadara") ||
    id.includes("sabzi-polo") || id.includes("saksuka") || id.includes("limonana") || id.startsWith("middleeast-") || id.startsWith("middleeastern-")
  ) {
    return "Middle Eastern Cuisines";
  } else if (
    cuisine.includes("australian") || cuisine.includes("oceanian") || cuisine.includes("fijian") ||
    cuisine.includes("maori") || cuisine.includes("tongan") || cuisine.includes("samoan") ||
    cuisine.includes("tahitian") || cuisine.includes("hawaiian") || cuisine.includes("polynesian") ||
    cuisine.includes("new zealand") || cuisine.includes("vanuatu") || cuisine.includes("cook islands") ||
    cuisine.includes("solomon islands") || cuisine.includes("kiribati") || cuisine.includes("palauan") ||
    cuisine.includes("niuean") || cuisine.includes("tuvaluan") || cuisine.includes("marshallese") ||
    cuisine.includes("nauruan") || cuisine.includes("tokelauan") || cuisine.includes("wallisian") ||
    cuisine.includes("guamanian") || id.includes("kangaroo") || id.includes("cooler") ||
    id.includes("parai") || id.includes("maori") || id.startsWith("oceanian-") || id.startsWith("oceania-")
  ) {
    return "Oceanian Cuisines";
  } else if (
    cuisine.includes("romanian") || cuisine.includes("swedish") || cuisine.includes("french") || cuisine.includes("spanish") ||
    cuisine.includes("italian") || cuisine.includes("greek") || cuisine.includes("ukrainian") ||
    cuisine.includes("british") || cuisine.includes("german") || cuisine.includes("hungarian") ||
    cuisine.includes("austrian") || cuisine.includes("polish") || cuisine.includes("irish") ||
    cuisine.includes("swiss") || cuisine.includes("belgian") || cuisine.includes("portuguese") ||
    cuisine.includes("georgian") || cuisine.includes("cypriot") || id.includes("carbonara") ||
    id.includes("goulash") || id.includes("cacio-e-pepe") || id.includes("meatballs") ||
    id.includes("caldo-verde") || id.includes("pierogi") || id.includes("waffles") ||
    id.includes("crepes") || id.includes("borscht") || id.includes("colcannon") ||
    id.includes("rosti") || id.includes("bubble-squeak") || id.includes("halloumi") || id.startsWith("european-") || id.startsWith("europe-")
  ) {
    return "European Cuisines";
  } else if (
    cuisine.includes("mexican") || cuisine.includes("cuban") || cuisine.includes("colombian") ||
    cuisine.includes("peruvian") || cuisine.includes("brazilian") || cuisine.includes("jamaican") ||
    cuisine.includes("canadian") || cuisine.includes("argentinian") || cuisine.includes("salvadoran") ||
    cuisine.includes("ecuadorian") || cuisine.includes("costa rican") || cuisine.includes("caribbean") ||
    cuisine.includes("american") || cuisine.includes("usa") || cuisine.includes("bolivian") ||
    cuisine.includes("venezuelan") || cuisine.includes("chilean") || cuisine.includes("puerto rican") ||
    cuisine.includes("guatemalan") || id.includes("guacamole") || id.includes("pupusas") ||
    id.includes("arepas") || id.includes("ropa-vieja") || id.includes("poutine") ||
    id.includes("gallo-pinto") || id.includes("moqueca") || id.includes("chimichurri") ||
    id.includes("lomo-saltado") || id.includes("llapingachos") || id.startsWith("americas-") || id.startsWith("american-") || id.startsWith("centralamerica-") || id.startsWith("southamerica-") || id.startsWith("northamerica-")
  ) {
    return "American Cuisines";
  } else {
    return "Asian Cuisines";
  }
}

function getRecipeCourse(recipe: any, overrides: Record<string, string>): string {
  const id = recipe.id.toLowerCase();
  if (overrides[recipe.id]) {
    return overrides[recipe.id];
  }
  if (id.includes("-snack") || id.includes("snack")) {
    return "Snacks";
  }
  if (id.includes("-appetizer") || id.includes("appetizer")) {
    return "Appetizers";
  }
  if (id.includes("-main") || id.includes("main")) {
    return "Main Courses";
  }
  if (id.includes("-condiment") || id.includes("condiment") || id.includes("sauce") || id.includes("chutney")) {
    return "Condiments";
  }
  if (id.includes("-drink") || id.includes("drink") || id.includes("beverage")) {
    return "Drinks";
  }
  if (id.includes("-dessert") || id.includes("dessert") || id.includes("sweet") || (recipe.category as string) === "Dessert") {
    return "Desserts";
  }
  if ((recipe.category as string) === "Dessert") return "Desserts";
  if ((recipe.category as string) === "Snacks") return "Snacks";
  return "Main Courses";
}

function findIngredientId(name: string, allIngredients: {id: string, name: string}[]): string {
  const lowerName = name.toLowerCase().trim();
  let match = allIngredients.find(i => i.name.toLowerCase() === lowerName || i.id === lowerName);
  if (match) return match.id;

  match = allIngredients.find(i => lowerName.includes(i.name.toLowerCase()) || i.name.toLowerCase().includes(lowerName));
  if (match) return match.id;

  const words = lowerName.split(/\s+/);
  for (const word of words) {
    if (word.length > 3) {
      match = allIngredients.find(i => i.name.toLowerCase() === word || i.id === word);
      if (match) return match.id;
    }
  }

  return lowerName.replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
}

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    recipes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: "Unique snake_case id prefix with region prefix, e.g. 'african-nigeria-appetizer-sambusa-v3'" },
          name: { type: Type.STRING, description: "Clean, elegant, authentic dish name" },
          cuisine: { type: Type.STRING, description: "Specific country or style, e.g. 'Ethiopian', 'Lebanese', 'Spanish', 'New Zealand', 'Mexican', 'Taiwanese'" },
          category: { type: Type.STRING, description: "MUST be one of: Curry, Rice & Grain, Dessert, Global, Snacks" },
          prepTime: { type: Type.INTEGER, description: "Preparation time in minutes" },
          cookTime: { type: Type.INTEGER, description: "Cooking time in minutes" },
          baseServings: { type: Type.INTEGER, description: "Base servings, default to 4" },
          ingredients: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "Name of the ingredient, e.g. 'Taro leaves' or 'Ground cardamom'" },
                baseAmount: { type: Type.NUMBER, description: "Decimal value of the amount for base servings" },
                unit: { type: Type.STRING, description: "Unit, e.g. 'g', 'tsp', 'tbsp', 'cup', 'ml', 'pcs', or 'pinch'" }
              },
              required: ["name", "baseAmount", "unit"]
            }
          },
          steps: {
            type: Type.ARRAY,
            items: { type: Type.STRING, description: "Clear, sequential preparation step" }
          },
          story: { type: Type.STRING, description: "A brief, elegant 2-3 sentence cultural description detailing history, traditions, and flavour notes of the dish" },
          difficulty: { type: Type.STRING, description: "MUST be one of: Easy, Medium, Expert" },
          author: { type: Type.STRING, description: "Authentic origin kitchen/chef name, e.g. 'Addis Family Kitchen', 'Cuzco Traditional Cook'" },
          courseOverride: { type: Type.STRING, description: "MUST be one of: Snacks, Appetizers, Main Courses, Condiments, Drinks, Desserts" },
          suggestedNewIngredients: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING, description: "Unique lowercase snake_case id, e.g., 'teff_flour' or 'orange_blossom_water'" },
                name: { type: Type.STRING, description: "Human-readable name" },
                category: { type: Type.STRING, description: "MUST be one of: Proteins, Vegetables, Pantry & Grains, Spices & Herbs, Oils" }
              },
              required: ["id", "name", "category"]
            },
            description: "List of ingredients used in this recipe that do not exist in the current database"
          }
        },
        required: [
          "id", "name", "cuisine", "category", "prepTime", "cookTime", "baseServings",
          "ingredients", "steps", "story", "difficulty", "author", "courseOverride"
        ]
      }
    }
  },
  required: ["recipes"]
};

const regionMapping: Record<string, { prefix: string, promptInfo: string }> = {
  "African Cuisines": { prefix: "african-", promptInfo: "African countries (e.g. Nigeria, Ethiopia, Senegal, South Africa, Egypt, Morocco, Ghana)" },
  "Middle Eastern Cuisines": { prefix: "middleeastern-", promptInfo: "Middle Eastern countries (e.g. Lebanon, Turkey, Syria, Iran, Yemen, Jordan, Palestine, Oman)" },
  "Oceanian Cuisines": { prefix: "oceanian-", promptInfo: "Oceanian islands and countries (e.g. Fiji, Samoa, Tonga, New Zealand Maori, Hawaii, Papua New Guinea)" },
  "European Cuisines": { prefix: "european-", promptInfo: "European countries (e.g. Greece, Spain, Italy, France, Portugal, Georgia, Poland, Hungary, Sweden)" },
  "American Cuisines": { prefix: "american-", promptInfo: "The Americas (e.g. Peru, Mexico, Brazil, Colombia, Argentina, El Salvador, Costa Rica, Jamaica, Canada)" },
  "Asian Cuisines": { prefix: "asian-", promptInfo: "Asian countries (e.g. Japan, Korea, China, Vietnam, Thailand, Malaysia, Indonesia, Philippines)" }
};

const courseKeywords: Record<string, string> = {
  "Snacks": "snack",
  "Appetizers": "appetizer",
  "Main Courses": "main",
  "Condiments": "condiment",
  "Drinks": "drink",
  "Desserts": "dessert"
};

async function run() {
  const isDryRun = process.env.DRY_RUN === 'true';
  const targetCount = 45;

  console.log("Loading current data from src/data.ts...");
  const { RECIPES, INGREDIENTS } = await import('./src/data.js');

  console.log(`Loaded base database: ${RECIPES.length} recipes, ${INGREDIENTS.length} ingredients.`);

  // Calculate current counts for every Region and Course combination
  const counts: Record<string, Record<string, number>> = {};
  const regions = Object.keys(regionMapping);
  const courses = Object.keys(courseKeywords);

  for (const r of regions) {
    counts[r] = {};
    for (const c of courses) {
      counts[r][c] = 0;
    }
  }

  // Combine overrides for checking
  const allOverrides = {
    ...progress.generatedCourseOverrides
  };

  for (const recipe of RECIPES) {
    const r = getRecipeRegion(recipe);
    const c = getRecipeCourse(recipe, allOverrides);
    if (counts[r] && counts[r][c] !== undefined) {
      counts[r][c]++;
    }
  }

  console.log("\n=== CURRENT RECIPE BALANCES ===");
  const deficitTasks: { region: string; course: string; needed: number }[] = [];

  for (const r of regions) {
    console.log(`Region: ${r}`);
    for (const c of courses) {
      const count = counts[r][c];
      const deficit = Math.max(0, targetCount - count);
      console.log(`  - ${c}: ${count} / ${targetCount} ${deficit === 0 ? '✅' : `❌ (Deficit: ${deficit})`}`);
      if (deficit > 0) {
        deficitTasks.push({ region: r, course: c, needed: deficit });
      }
    }
  }

  if (deficitTasks.length === 0) {
    console.log("\n🎉 Database is perfectly balanced! Every single course in every single region has at least 45 recipes.");
    return;
  }

  console.log(`\nFound ${deficitTasks.length} deficit combinations. Total deficit recipes to generate: ${deficitTasks.reduce((sum, t) => sum + t.needed, 0)}.`);

  if (isDryRun) {
    console.log("\n[DRY RUN] Exiting without making API calls.");
    return;
  }

  // Create list of existing recipe names for deduplication
  const existingNames = [
    ...RECIPES.map((r: any) => `${r.name} (${r.cuisine})`),
    ...progress.generatedRecipes.map((r: any) => `${r.name} (${r.cuisine})`)
  ];

  // Run generation for each deficit task
  for (const task of deficitTasks) {
    const { region, course, needed } = task;
    console.log(`\n--- Balancing ${region} for ${course} (Needs ${needed} recipes) ---`);

    // Split needed into batches of max 22 recipes
    const batchSize = 22;
    const numBatches = Math.ceil(needed / batchSize);

    for (let b = 1; b <= numBatches; b++) {
      const currentBatchSize = (b === numBatches) ? (needed - (b - 1) * batchSize) : batchSize;
      const batchId = `${region.replace(/\s+/g, '')}-${course}-${b}`;

      if (progress.completedBatches.includes(batchId)) {
        console.log(`Batch ${batchId} already completed. Skipping.`);
        continue;
      }

      console.log(`Generating Batch ${b}/${numBatches} of size ${currentBatchSize} for ${region} - ${course}...`);

      const prefix = regionMapping[region].prefix;
      const idKeyword = courseKeywords[course];
      const promptInfo = regionMapping[region].promptInfo;

      const prompt = `You are an elite culinary anthropologist and master chef specializing in ${region}.
      Generate exactly ${currentBatchSize} highly authentic recipes from ${promptInfo} for the course '${course}'.
      
      STRICT RULES:
      1. Every recipe MUST be genuinely authentic to the culture and country of origin.
      2. The 'courseOverride' property of each recipe MUST be set to exactly: '${course}'.
      3. The 'id' property of each recipe MUST be unique, lowercase, snake_case, start with '${prefix}', and contain '-${idKeyword}-', e.g., '${prefix}countryname-${idKeyword}-dishname'.
      4. To ensure zero duplicate entries, do NOT generate any of the following existing recipes:
         ${existingNames.slice(-150).join(", ")}
      5. Provide rich, accurate, and realistic ingredient amounts, correct units (use standard units: 'g', 'ml', 'pcs', 'tsp', 'tbsp', 'cup', 'pinch'), and complete cooking steps.
      6. Provide a beautifully written 2-3 sentence story for each recipe explaining its origins, context, and traditional role.`;

      let success = false;
      let attempts = 5;
      while (attempts > 0 && !success) {
        // Alternating models to utilize different model quotas:
        // Attempt 1: gemini-3.5-flash
        // Attempt 2: gemini-2.5-flash
        // Attempt 3: gemini-3.1-flash-lite
        // Attempt 4: gemini-3.5-flash
        // Attempt 5: gemini-2.5-flash
        let modelToUse = "gemini-3.5-flash";
        if (attempts === 4) modelToUse = "gemini-2.5-flash";
        else if (attempts === 3) modelToUse = "gemini-3.1-flash-lite";
        else if (attempts === 2) modelToUse = "gemini-3.5-flash";
        else if (attempts === 1) modelToUse = "gemini-2.5-flash";

        console.log(`Using model ${modelToUse} (Attempt ${6 - attempts}/5)...`);
        try {
          const response = await ai.models.generateContent({
            model: modelToUse,
            contents: prompt,
            config: {
              systemInstruction: `You verify each recipe for perfect cultural authenticity and ensure that courseOverride is set exactly to '${course}' and unique IDs start with '${prefix}' and contain '-${idKeyword}-'.`,
              responseMimeType: "application/json",
              responseSchema: responseSchema,
              temperature: 0.25
            }
          });

          if (response && response.text) {
            const data = JSON.parse(response.text.trim());
            const recipes = data.recipes || [];

            if (recipes.length !== currentBatchSize) {
              console.warn(`Expected ${currentBatchSize} recipes, but got ${recipes.length}. Processing them anyway.`);
            }

            console.log(`Successfully parsed ${recipes.length} generated recipes.`);

            for (const r of recipes) {
              // Add suggested new ingredients
              if (r.suggestedNewIngredients) {
                for (const ing of r.suggestedNewIngredients) {
                  const existsInGlobal = INGREDIENTS.some((i: any) => i.id === ing.id || i.name.toLowerCase() === ing.name.toLowerCase());
                  const existsInNew = progress.generatedNewIngredients.some((i: any) => i.id === ing.id || i.name.toLowerCase() === ing.name.toLowerCase());
                  if (!existsInGlobal && !existsInNew) {
                    progress.generatedNewIngredients.push({
                      id: ing.id,
                      name: ing.name,
                      category: ing.category
                    });
                  }
                }
              }

              // Update course overrides
              progress.generatedCourseOverrides[r.id] = r.courseOverride;

              // Clean up properties before saving
              const { courseOverride, suggestedNewIngredients, ...cleanRecipe } = r;

              // Compute requiredIngredients array
              const recipeRequiredIngredients: string[] = [];
              for (const ri of cleanRecipe.ingredients || []) {
                if (!ri || !ri.name) continue;
                const allIngs = [...INGREDIENTS, ...progress.generatedNewIngredients, ...(suggestedNewIngredients || [])];
                const matchedId = findIngredientId(ri.name, allIngs);
                if (!recipeRequiredIngredients.includes(matchedId)) {
                  recipeRequiredIngredients.push(matchedId);
                }
              }
              cleanRecipe.requiredIngredients = recipeRequiredIngredients;

              progress.generatedRecipes.push(cleanRecipe);
              existingNames.push(`${cleanRecipe.name} (${cleanRecipe.cuisine})`);
            }

            progress.completedBatches.push(batchId);
            saveProgress();
            success = true;
          }
        } catch (err: any) {
          console.error(`Error in batch ${batchId} (Attempt ${5 - attempts}/5):`, err.message || err);
          attempts--;
          if (attempts > 0) {
            // If we are switching to a model we haven't used in this batch yet (attempts 4 or 3),
            // we don't need a long delay because the quota is separate.
            // If we are repeating a model (attempts 2 or 1), we wait 45 seconds for the quota window.
            const waitTime = (attempts >= 3) ? 2000 : 45000;
            console.log(`Waiting ${waitTime / 1000} seconds before retrying with a different model/quota...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
          }
        }
      }

      if (!success) {
        console.error(`Failed to generate batch ${batchId} after 5 attempts. Halting to prevent infinite loops.`);
        process.exit(1);
      }

      console.log("Pausing 12 seconds to respect API limits...");
      await new Promise(resolve => setTimeout(resolve, 12000));
    }
  }

  console.log("\n🎉 Database perfectly balanced successfully! All deficits have been resolved.");
}

run().catch(console.error);
