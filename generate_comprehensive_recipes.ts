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

// Paths
const dataPath = path.join(process.cwd(), 'src/data.ts');

// We need a helper to read the file and dynamically extract current RECIPES and INGREDIENTS
// to prevent duplicate API generation and ensure clean ID mapping.
async function run() {
  console.log("Loading current data from src/data.ts...");
  const fileContent = fs.readFileSync(dataPath, 'utf-8');

  // Dynamically import existing data to use for lookup
  // We can write a tiny temporary script to extract and dump existing names to avoid ts-node import complexities
  console.log("Extracting existing recipes and ingredients...");
  const { RECIPES, INGREDIENTS } = await import('./src/data.js');

  console.log(`Loaded ${RECIPES.length} existing recipes.`);
  console.log(`Loaded ${INGREDIENTS.length} existing ingredients.`);

  // Group existing recipes by region using the same criteria
  const regionalRecipes: Record<string, string[]> = {
    "Asian": [],
    "Middle Eastern": [],
    "Oceanian": [],
    "European": [],
    "Americas": [],
    "African": []
  };

  for (const r of RECIPES) {
    const cuisine = (r.cuisine || "").toLowerCase();
    const id = (r.id || "").toLowerCase();

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
      id.includes("koshary") || id.includes("koshari")
    ) {
      regionalRecipes["African"].push(`${r.name} (${r.cuisine})`);
    } else if (
      cuisine.includes("middle eastern") || cuisine.includes("turkish") || cuisine.includes("lebanese") ||
      cuisine.includes("persian") || cuisine.includes("jordanian") || cuisine.includes("syrian") ||
      cuisine.includes("iraqi") || cuisine.includes("palestinian") || cuisine.includes("saudi") ||
      cuisine.includes("yemeni") || cuisine.includes("omani") || cuisine.includes("kuwaiti") ||
      cuisine.includes("iranian") || cuisine.includes("qatari") || cuisine.includes("bahraini") ||
      id.includes("falafel") || id.includes("hummus") || id.includes("shakshuka") || id.includes("mujadara") ||
      id.includes("sabzi-polo") || id.includes("saksuka") || id.includes("limonana")
    ) {
      regionalRecipes["Middle Eastern"].push(`${r.name} (${r.cuisine})`);
    } else if (
      cuisine.includes("australian") || cuisine.includes("oceanian") || cuisine.includes("fijian") ||
      cuisine.includes("maori") || cuisine.includes("tongan") || cuisine.includes("samoan") ||
      cuisine.includes("tahitian") || cuisine.includes("hawaiian") || cuisine.includes("polynesian") ||
      cuisine.includes("new zealand") || cuisine.includes("vanuatu") || cuisine.includes("cook islands") ||
      cuisine.includes("solomon islands") || cuisine.includes("kiribati") || cuisine.includes("palauan") ||
      cuisine.includes("niuean") || cuisine.includes("tuvaluan") || cuisine.includes("marshallese") ||
      cuisine.includes("nauruan") || cuisine.includes("tokelauan") || cuisine.includes("wallisian") ||
      cuisine.includes("guamanian") || id.includes("kangaroo") || id.includes("cooler") ||
      id.includes("parai") || id.includes("maori")
    ) {
      regionalRecipes["Oceanian"].push(`${r.name} (${r.cuisine})`);
    } else if (
      cuisine.includes("swedish") || cuisine.includes("french") || cuisine.includes("spanish") ||
      cuisine.includes("italian") || cuisine.includes("greek") || cuisine.includes("ukrainian") ||
      cuisine.includes("british") || cuisine.includes("german") || cuisine.includes("hungarian") ||
      cuisine.includes("austrian") || cuisine.includes("polish") || cuisine.includes("irish") ||
      cuisine.includes("swiss") || cuisine.includes("belgian") || cuisine.includes("portuguese") ||
      cuisine.includes("georgian") || cuisine.includes("cypriot") || id.includes("carbonara") ||
      id.includes("goulash") || id.includes("cacio-e-pepe") || id.includes("meatballs") ||
      id.includes("caldo-verde") || id.includes("pierogi") || id.includes("waffles") ||
      id.includes("crepes") || id.includes("borscht") || id.includes("colcannon") ||
      id.includes("rosti") || id.includes("bubble-squeak") || id.includes("halloumi")
    ) {
      regionalRecipes["European"].push(`${r.name} (${r.cuisine})`);
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
      id.includes("lomo-saltado") || id.includes("llapingachos")
    ) {
      regionalRecipes["Americas"].push(`${r.name} (${r.cuisine})`);
    } else {
      regionalRecipes["Asian"].push(`${r.name} (${r.cuisine})`);
    }
  }

  const generatedRecipes: any[] = [];
  const generatedCourseOverrides: Record<string, string> = {};
  const generatedNewIngredients: any[] = [];

  // Define the JSON response schema for Gemini
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      recipes: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING, description: "Unique snake_case id. Prefix with region, country, and course, e.g., 'asian-japan-snack-goyoza-new'" },
            name: { type: Type.STRING, description: "Clean, elegant, authentic dish name" },
            cuisine: { type: Type.STRING, description: "Specific country or sub-regional style, e.g. 'Japanese', 'Syrian (Middle Eastern)', 'Samoan (Oceanian)'" },
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
            author: { type: Type.STRING, description: "Authentic chef/country origin name, e.g. 'Kyoto Kitchen', 'Damascus Family Kitchen'" },
            courseOverride: { type: Type.STRING, description: "MUST be one of: Snacks, Appetizers, Main Courses, Condiments, Drinks, Desserts" },
            suggestedNewIngredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING, description: "Unique lowercase snake_case id, e.g., 'dashi_powder' or 'sumac_powder'" },
                  name: { type: Type.STRING, description: "Human-readable name" },
                  category: { type: Type.STRING, description: "MUST be one of: Proteins, Vegetables, Pantry & Grains, Spices & Herbs, Oils" }
                },
                required: ["id", "name", "category"]
              },
              description: "List of ingredients used in this recipe that do not exist in the current database of ingredients"
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

  // Define regional generation targets
  const jobs = [
    {
      regionName: "Asian Cuisines",
      prompt: `Generate 8 entirely unique, highly authentic Asian recipes.
      Spanning different Asian countries (e.g., Vietnam, Philippines, Indonesia, Malaysia, Japan, Korea, China, Sri Lanka, Nepal).
      You must cover multiple courses: Snacks, Appetizers, Main Courses, Condiments, Drinks, and Desserts.
      Strictly avoid fusion and do not duplicate any of the following existing recipes in our database:
      ${regionalRecipes["Asian"].slice(-60).join(", ")}`
    },
    {
      regionName: "Middle Eastern Cuisines",
      prompt: `Generate 8 entirely unique, highly authentic Middle Eastern recipes.
      Spanning countries like Jordan, Syria, Iraq, Oman, Yemen, Saudi Arabia, Palestine, Lebanon, Persia, Turkey.
      You must cover multiple courses: Snacks, Appetizers, Main Courses, Condiments, Drinks, and Desserts.
      Ensure absolutely NO Western, Asian, or African culinary overlap or fusion.
      Strictly do not duplicate any of the following existing recipes in our database:
      ${regionalRecipes["Middle Eastern"].slice(-60).join(", ")}`
    },
    {
      regionName: "Oceanian Cuisines",
      prompt: `Generate 8 entirely unique, highly authentic Oceanian recipes.
      Spanning countries and islands like Fiji, Samoa, Tonga, Tahiti, Hawaii, Vanuatu, Papua New Guinea, Cook Islands, Maori/New Zealand.
      You must cover multiple courses: Snacks, Appetizers, Main Courses, Condiments, Drinks, and Desserts.
      Omit any Asian, European or American fusion. Ensure pure, authentic island ingredients (e.g. taro, coconut cream, native yams, tropical fruits, seafood).
      Strictly do not duplicate any of the following existing recipes in our database:
      ${regionalRecipes["Oceanian"].slice(-60).join(", ")}`
    },
    {
      regionName: "European Cuisines",
      prompt: `Generate 8 entirely unique, highly authentic European recipes spanning diverse European countries.
      Cover countries like Poland, Portugal, Georgia, Cyprus, Sweden, Germany, Hungary, Austria, France, Spain, Italy, Greece.
      You must cover multiple courses: Snacks, Appetizers, Main Courses, Condiments, Drinks, and Desserts.
      Ensure absolutely NO Asian, American, Oceanian, or African culinary overlap or fusion.
      Strictly do not duplicate any of the following existing recipes in our database:
      ${regionalRecipes["European"].slice(-60).join(", ")}`
    },
    {
      regionName: "American Cuisines",
      prompt: `Generate 8 entirely unique, highly authentic recipes from the Americas (North, Central, and South).
      Cover countries like Peru, Brazil, Colombia, Argentina, Mexico, Salvador, Ecuador, Costa Rica, Canada, and traditional US regions.
      You must cover multiple courses: Snacks, Appetizers, Main Courses, Condiments, Drinks, and Desserts.
      Ensure absolutely NO Oceanian, Middle Eastern, Asian, or African culinary overlap or fusion.
      Strictly do not duplicate any of the following existing recipes in our database:
      ${regionalRecipes["Americas"].slice(-60).join(", ")}`
    },
    {
      regionName: "African Cuisines (Set A)",
      prompt: `Generate 5 entirely unique, highly authentic African recipes.
      Focus on regional diversity across North, East, West, Central, and South Africa (e.g., Senegal, Ethiopia, Nigeria, Somalia, South Africa, Ghana, Morocco).
      Provide multiple courses: Snacks, Appetizers, Main Courses, Condiments, Drinks, and Desserts.
      Ensure absolutely NO Asian, Middle Eastern, European, or American culinary overlap or fusion.
      Strictly do not duplicate any of the following existing recipes in our database:
      ${regionalRecipes["African"].slice(-60).join(", ")}`
    },
    {
      regionName: "African Cuisines (Set B)",
      prompt: `Generate 5 more entirely unique, highly authentic African recipes to expand the African database high-volume goal.
      Cover different countries and recipes from Set A (e.g., Algeria, Kenya, Zimbabwe, Angola, Cameroon, Ivory Coast, Mozambique).
      Provide multiple courses: Snacks, Appetizers, Main Courses, Condiments, Drinks, and Desserts.
      Ensure absolutely NO Asian, Middle Eastern, European, or American culinary overlap or fusion.
      Strictly do not duplicate any of the following existing recipes in our database:
      ${regionalRecipes["African"].slice(-60).join(", ")}`
    }
  ];

  // Helper with exponential backoff retries for transient fetch timeout errors
  async function generateWithRetry(prompt: string, schema: any, regionName: string) {
    let attempts = 3;
    let delay = 5000;
    for (let i = 0; i < attempts; i++) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            systemInstruction: "You are an expert global culinary historian, verified chef, and meticulous database entry assistant. You verify each recipe with Google Search for extreme country-of-origin authenticity and accurate regional course categorization.",
            responseMimeType: "application/json",
            responseSchema: schema,
            temperature: 0.2
          }
        });
        return response;
      } catch (err) {
        console.warn(`Attempt ${i + 1} for ${regionName} failed. Error:`, err);
        if (i === attempts - 1) throw err;
        console.log(`Waiting ${delay}ms before retrying...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
      }
    }
    throw new Error(`Failed to generate after ${attempts} attempts`);
  }

  console.log("Launching sequential generation for all regions with rate-limiting pauses...");
  const allRegionRecipes: any[] = [];
  
  for (const job of jobs) {
    console.log(`Starting generation for ${job.regionName}...`);
    try {
      const response = await generateWithRetry(job.prompt, responseSchema, job.regionName);
      if (!response || !response.text) {
        console.warn(`Received empty response for ${job.regionName}`);
        allRegionRecipes.push(null);
      } else {
        const data = JSON.parse(response.text.trim());
        const recipes = data.recipes || [];
        console.log(`Successfully generated ${recipes.length} recipes for ${job.regionName}.`);
        allRegionRecipes.push(recipes);
      }
    } catch (err) {
      console.error(`Failed generating for ${job.regionName}:`, err);
      allRegionRecipes.push(null);
    }
    
    // 10-second delay between requests to stay well below the 15 RPM free-tier limit
    console.log("Pausing 10 seconds to respect API rate limits...");
    await new Promise(resolve => setTimeout(resolve, 10000));
  }

  console.log("\nAll API requests completed. Processing results sequentially...");

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const recipes = allRegionRecipes[i];
    if (!recipes) continue;

    for (const r of recipes) {
      // Collect suggested ingredients
      if (r.suggestedNewIngredients) {
        for (const ing of r.suggestedNewIngredients) {
          // Check if ingredient already exists in global list or in our generatedNewIngredients
          const existsInGlobal = INGREDIENTS.some(i => i.id === ing.id || i.name.toLowerCase() === ing.name.toLowerCase());
          const existsInNew = generatedNewIngredients.some(i => i.id === ing.id || i.name.toLowerCase() === ing.name.toLowerCase());
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

      // Clean up courseOverride from the actual recipe object as it doesn't exist in Recipe interface
      const { courseOverride, suggestedNewIngredients, ...cleanRecipe } = r;

      // Map ingredient IDs in requiredIngredients
      const recipeRequiredIngredients: string[] = [];
      for (const ri of cleanRecipe.ingredients) {
        // Find matching ID from global list, new ingredients, or suggestedNewIngredients
        const allIngs = [...INGREDIENTS, ...generatedNewIngredients, ...(suggestedNewIngredients || [])];
        const matchedId = findIngredientId(ri.name, allIngs);
        if (!recipeRequiredIngredients.includes(matchedId)) {
          recipeRequiredIngredients.push(matchedId);
        }
      }

      // Ensure we assign the clean mapped requiredIngredients array
      cleanRecipe.requiredIngredients = recipeRequiredIngredients;

      generatedRecipes.push(cleanRecipe);
    }
  }

  console.log(`\nAll generation cycles complete!`);
  console.log(`Total new recipes generated: ${generatedRecipes.length}`);
  console.log(`Total new ingredients to add: ${generatedNewIngredients.length}`);

  if (generatedRecipes.length === 0) {
    console.error("Zero recipes were generated! Aborting write.");
    return;
  }

  // Rewrite src/data.ts safely
  let updatedContent = fileContent;

  // 1. Add new ingredients if any
  if (generatedNewIngredients.length > 0) {
    console.log("Appending new ingredients to INGREDIENTS array...");
    const ingredientsEndMarker = '];\n\nexport const RECIPES';
    const markerIndex = updatedContent.indexOf(ingredientsEndMarker);
    if (markerIndex !== -1) {
      // Find the closing bracket before the marker
      const sub = updatedContent.substring(0, markerIndex);
      const lastBraceIndex = sub.lastIndexOf('}');
      if (lastBraceIndex !== -1) {
        const insertPos = lastBraceIndex + 1;
        // Construct ingredients string
        const ingStr = ',\n' + generatedNewIngredients.map(ing => `  {\n    "id": "${ing.id}",\n    "name": "${ing.name}",\n    "category": "${ing.category}"\n  }`).join(',\n');
        updatedContent = updatedContent.substring(0, insertPos) + ingStr + updatedContent.substring(insertPos);
        console.log(`Added ${generatedNewIngredients.length} new ingredients to src/data.ts.`);
      }
    } else {
      console.error("Could not find INGREDIENTS end marker!");
    }
  }

  // 2. Add new recipes to RECIPES array
  console.log("Appending new recipes to RECIPES array...");
  const recipesEndMarker = '];\n\nexport const TIPS';
  const recMarkerIndex = updatedContent.indexOf(recipesEndMarker);
  if (recMarkerIndex !== -1) {
    const sub = updatedContent.substring(0, recMarkerIndex);
    const lastBraceIndex = sub.lastIndexOf('}');
    if (lastBraceIndex !== -1) {
      const insertPos = lastBraceIndex + 1;
      const recStr = ',\n' + generatedRecipes.map(rec => JSON.stringify(rec, null, 2)).join(',\n');
      updatedContent = updatedContent.substring(0, insertPos) + recStr + updatedContent.substring(insertPos);
      console.log(`Added ${generatedRecipes.length} new recipes to src/data.ts.`);
    }
  } else {
    console.error("Could not find RECIPES end marker!");
  }

  // 3. Add course overrides to COURSE_OVERRIDES map
  console.log("Adding course overrides...");
  const overridesEndMarker = '\nexport const getRecipeRegion';
  const overMarkerIndex = updatedContent.indexOf(overridesEndMarker);
  if (overMarkerIndex !== -1) {
    const sub = updatedContent.substring(0, overMarkerIndex);
    const lastBraceIndex = sub.lastIndexOf('}');
    if (lastBraceIndex !== -1) {
      const insertPos = lastBraceIndex; // insert just before the closing brace '}' of the object
      const overStr = Object.entries(generatedCourseOverrides)
        .map(([id, val]) => `  "${id}": "${val}",`)
        .join('\n') + '\n';
      updatedContent = updatedContent.substring(0, insertPos) + overStr + updatedContent.substring(insertPos);
      console.log(`Added ${Object.keys(generatedCourseOverrides).length} overrides to src/data.ts.`);
    }
  } else {
    console.error("Could not find COURSE_OVERRIDES end marker!");
  }

  // Write changes back to src/data.ts
  fs.writeFileSync(dataPath, updatedContent, 'utf-8');
  console.log("src/data.ts updated successfully!");

  // Output a beautiful markdown report for compilation status and the recipe list
  console.log("\n--- GENERATED RECIPES SUMMARY ---");
  for (const r of generatedRecipes) {
    const course = generatedCourseOverrides[r.id];
    console.log(`- [${r.cuisine}] ${r.name} (${course})`);
  }
}

function findIngredientId(name: string, allIngredients: {id: string, name: string}[]): string {
  const lowerName = name.toLowerCase().trim();
  // Try exact match
  let match = allIngredients.find(i => i.name.toLowerCase() === lowerName || i.id === lowerName);
  if (match) return match.id;

  // Try substring matches
  match = allIngredients.find(i => lowerName.includes(i.name.toLowerCase()) || i.name.toLowerCase().includes(lowerName));
  if (match) return match.id;

  // Try fuzzy match on word boundaries
  const words = lowerName.split(/\s+/) as string[];
  for (const word of words) {
    if (word.length > 3) {
      match = allIngredients.find(i => i.name.toLowerCase() === word || i.id === word);
      if (match) return match.id;
    }
  }

  // Fallback: slugify the name
  return lowerName.replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
}

run().catch(console.error);
