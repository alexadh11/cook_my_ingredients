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

const dataPath = path.join(process.cwd(), 'src/data.ts');
const additionalPath = path.join(process.cwd(), 'src/additional_recipes.ts');

async function run() {
  console.log("Loading existing recipes to prevent duplicates...");
  const { RECIPES, INGREDIENTS } = await import('./src/data.js');
  console.log(`Currently loaded: ${RECIPES.length} recipes, ${INGREDIENTS.length} ingredients.`);

  // Collect existing recipe names for reference
  const existingNames = RECIPES.map((r: any) => `${r.name} (${r.cuisine})`);

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      recipes: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING, description: "Unique snake_case id prefix with region and country, e.g., 'asian-korea-drink-sikhye-v2'" },
            name: { type: Type.STRING, description: "Clean, elegant, authentic dish name" },
            cuisine: { type: Type.STRING, description: "Specific country or sub-regional style, e.g. 'Korean', 'Syrian', 'Samoan', 'Greek', 'Peruvian', 'Senegalese'" },
            category: { type: Type.STRING, description: "MUST be one of: Curry, Rice & Grain, Dessert, Global, Snacks" },
            prepTime: { type: Type.INTEGER, description: "Preparation time in minutes" },
            cookTime: { type: Type.INTEGER, description: "Cooking time in minutes" },
            baseServings: { type: Type.INTEGER, description: "Base servings, default to 4" },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Name of the ingredient, e.g. 'Grated Ginger' or 'Beef brisket'" },
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
            author: { type: Type.STRING, description: "Authentic chef/country origin name, e.g. 'Seoul Street Market', 'Athens Family Cook'" },
            courseOverride: { type: Type.STRING, description: "MUST be one of: Snacks, Appetizers, Main Courses, Condiments, Drinks, Desserts" },
            suggestedNewIngredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING, description: "Unique lowercase snake_case id, e.g., 'sesame_oil' or 'sumac_spice'" },
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

  const regions = [
    {
      name: "Asian Cuisines",
      desc: "snack, appetizer, main course, condiment, drink, or dessert from Asian countries like Japan, South Korea, China, Vietnam, Thailand, Malaysia, Indonesia, Philippines, Sri Lanka, Nepal, Taiwan, Singapore.",
      constraint: "Strictly authentic Asian cuisine. No Western, European, Oceanian, Middle Eastern, or African fusion."
    },
    {
      name: "Middle Eastern Cuisines",
      desc: "snack, appetizer, main course, condiment, drink, or dessert from Middle Eastern countries like Turkey, Lebanon, Syria, Persia/Iran, Jordan, Yemen, Oman, Saudi Arabia, Palestine, Iraq, Kuwait.",
      constraint: "Strictly authentic Middle Eastern cuisine. Absolutely no Western, Asian, European, or African culinary overlap."
    },
    {
      name: "Oceanian Cuisines",
      desc: "snack, appetizer, main course, condiment, drink, or dessert from Oceanian countries and islands like Fiji, Samoa, Tonga, Hawaii, Tahiti, Vanuatu, Papua New Guinea, Cook Islands, Maori/New Zealand.",
      constraint: "Strictly authentic Oceanian/Island cuisine. Omit any Asian, European, American, or Middle Eastern fusion."
    },
    {
      name: "European Cuisines",
      desc: "snack, appetizer, main course, condiment, drink, or dessert from European countries like Greece, Portugal, Spain, Italy, France, Poland, Hungary, Germany, Sweden, Austria, Georgia, Ukraine, Ireland.",
      constraint: "Strictly authentic European cuisine. Absolutely no Asian, American, Oceanian, or African culinary overlap."
    },
    {
      name: "American Cuisines",
      desc: "snack, appetizer, main course, condiment, drink, or dessert from the Americas (North, Central, South) like Peru, Brazil, Colombia, Argentina, Mexico, El Salvador, Ecuador, Costa Rica, Canada, Jamaica, Cuba.",
      constraint: "Strictly authentic American continent cuisine. Absolutely no Oceanian, Middle Eastern, Asian, European, or African culinary overlap."
    },
    {
      name: "African Cuisines",
      desc: "snack, appetizer, main course, condiment, drink, or dessert from African sub-regions (North, South, East, West, Central) spanning Senegal, Ethiopia, Nigeria, Somalia, South Africa, Ghana, Morocco, Algeria, Kenya, Zimbabwe.",
      constraint: "Strictly authentic African cuisine. Absolutely no Asian, Middle Eastern, European, or American culinary overlap."
    }
  ];

  const generatedRecipes: any[] = [];
  const generatedCourseOverrides: Record<string, string> = {};
  const generatedNewIngredients: any[] = [];

  // Sequential generation with rate-limiting pauses
  for (const reg of regions) {
    console.log(`\n=== GENERATING RECIPES FOR: ${reg.name} ===`);
    
    // We will do 3 batches of 14 recipes each to reach 42 recipes for this region
    for (let batch = 1; batch <= 3; batch++) {
      console.log(`Starting Batch ${batch}/3 for ${reg.name}...`);
      
      const prompt = `You are a world-class culinary historian and master chef.
      Generate 14 entirely unique, highly authentic recipes for ${reg.name}.
      Course / category of each recipe: ${reg.desc}
      Strict rules: ${reg.constraint}
      
      To ensure absolutely zero duplication, do NOT generate any of the following existing recipes or previously generated recipes:
      ${existingNames.slice(-100).join(", ")}
      
      Make sure to cover a good mix of courses (Snacks, Appetizers, Main Courses, Condiments, Drinks, Desserts) within this batch.
      Ensure precise ingredient measurements and clear step-by-step preparation instructions.`;

      let success = false;
      let attempts = 3;
      while (attempts > 0 && !success) {
        try {
          const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
            config: {
              systemInstruction: "You verify each recipe with Google Search for extreme country-of-origin authenticity and accurate regional course categorization.",
              responseMimeType: "application/json",
              responseSchema: responseSchema,
              temperature: 0.3
            }
          });

          if (response && response.text) {
            const data = JSON.parse(response.text.trim());
            const recipes = data.recipes || [];
            console.log(`Successfully generated ${recipes.length} recipes in Batch ${batch}.`);
            
            for (const r of recipes) {
              // Collect suggested ingredients
              if (r.suggestedNewIngredients) {
                for (const ing of r.suggestedNewIngredients) {
                  const existsInGlobal = INGREDIENTS.some((i: any) => i.id === ing.id || i.name.toLowerCase() === ing.name.toLowerCase());
                  const existsInNew = generatedNewIngredients.some((i: any) => i.id === ing.id || i.name.toLowerCase() === ing.name.toLowerCase());
                  if (!existsInGlobal && !existsInNew) {
                    generatedNewIngredients.push({
                      id: ing.id,
                      name: ing.name,
                      category: ing.category
                    });
                  }
                }
              }

              // Map course overrides
              generatedCourseOverrides[r.id] = r.courseOverride;

              // Clean up properties not in Recipe interface
              const { courseOverride, suggestedNewIngredients, ...cleanRecipe } = r;

              // Map ingredient IDs in requiredIngredients
              const recipeRequiredIngredients: string[] = [];
              for (const ri of cleanRecipe.ingredients) {
                const allIngs = [...INGREDIENTS, ...generatedNewIngredients, ...(suggestedNewIngredients || [])];
                const matchedId = findIngredientId(ri.name, allIngs);
                if (!recipeRequiredIngredients.includes(matchedId)) {
                  recipeRequiredIngredients.push(matchedId);
                }
              }
              cleanRecipe.requiredIngredients = recipeRequiredIngredients;

              generatedRecipes.push(cleanRecipe);
              existingNames.push(`${cleanRecipe.name} (${cleanRecipe.cuisine})`);
            }
            success = true;
          }
        } catch (err) {
          console.error(`Error in batch ${batch} of ${reg.name}. Retrying...`, err);
          attempts--;
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
      }

      if (!success) {
        console.error(`Failed to generate batch ${batch} of ${reg.name} after 3 attempts.`);
      }

      // Pausing to stay well below the 15 RPM rate limits
      console.log("Pausing 10 seconds before next request...");
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }

  console.log(`\nTotal recipes generated: ${generatedRecipes.length}`);
  console.log(`Total new ingredients generated: ${generatedNewIngredients.length}`);

  // Create src/additional_recipes.ts content
  const additionalContent = `import { Recipe, Ingredient } from "./data";

export const ADDITIONAL_INGREDIENTS: Ingredient[] = ${JSON.stringify(generatedNewIngredients, null, 2)};

export const ADDITIONAL_RECIPES: Recipe[] = ${JSON.stringify(generatedRecipes, null, 2)};

export const ADDITIONAL_COURSE_OVERRIDES: Record<string, string> = ${JSON.stringify(generatedCourseOverrides, null, 2)};
`;

  fs.writeFileSync(additionalPath, additionalContent, 'utf-8');
  console.log("Successfully created src/additional_recipes.ts!");
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

run().catch(console.error);
