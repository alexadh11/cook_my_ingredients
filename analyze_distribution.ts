import { RECIPES, getRecipeRegion, getRecipeCourse } from './src/data.js';

const counts: Record<string, Record<string, number>> = {};
const regions = [
  "African Cuisines",
  "Middle Eastern Cuisines",
  "Oceanian Cuisines",
  "European Cuisines",
  "American Cuisines",
  "Asian Cuisines"
];
const courses = [
  "Snacks",
  "Appetizers",
  "Main Courses",
  "Condiments",
  "Drinks",
  "Desserts"
];

for (const r of regions) {
  counts[r] = {};
  for (const c of courses) {
    counts[r][c] = 0;
  }
}

let uncategorizedRegion = 0;
for (const recipe of RECIPES) {
  const reg = getRecipeRegion(recipe);
  const crs = getRecipeCourse(recipe);
  if (counts[reg] && counts[reg][crs] !== undefined) {
    counts[reg][crs]++;
  } else {
    console.log(`Unknown region/course: ${reg} / ${crs} for recipe ${recipe.id}`);
  }
}

console.log("=== RECIPE DISTRIBUTION ===");
for (const r of regions) {
  console.log(`\nRegion: ${r}`);
  for (const c of courses) {
    const count = counts[r][c];
    console.log(`  - ${c}: ${count} ${count >= 45 ? '✅' : '❌ (Needs ' + (45 - count) + ')'}`);
  }
}
