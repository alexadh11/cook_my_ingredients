import { RECIPES, INGREDIENTS } from './src/data';

console.log("Total ingredients in INGREDIENTS list:", INGREDIENTS.length);
console.log("Total recipes currently in RECIPES:", RECIPES.length);

const cuisines = new Map<string, number>();
const categories = new Map<string, number>();

for (const recipe of RECIPES) {
  cuisines.set(recipe.cuisine, (cuisines.get(recipe.cuisine) || 0) + 1);
  categories.set(recipe.category, (categories.get(recipe.category) || 0) + 1);
}

console.log("\nCuisines count:");
const sortedCuisines = Array.from(cuisines.entries()).sort((a, b) => b[1] - a[1]);
for (const [cuisine, count] of sortedCuisines.slice(0, 30)) {
  console.log(`  - ${cuisine}: ${count}`);
}
if (sortedCuisines.length > 30) {
  console.log(`  ... and ${sortedCuisines.length - 30} more cuisines`);
}

console.log("\nCategories count:");
for (const [category, count] of categories.entries()) {
  console.log(`  - ${category}: ${count}`);
}

console.log("\nSample of 5 existing recipe IDs:");
for (const recipe of RECIPES.slice(0, 5)) {
  console.log(`  - ${recipe.id}: ${recipe.name} (${recipe.cuisine})`);
}
console.log("\nSample of last 5 existing recipe IDs:");
for (const recipe of RECIPES.slice(-5)) {
  console.log(`  - ${recipe.id}: ${recipe.name} (${recipe.cuisine})`);
}
