import { getRecipeCourse, COURSE_OVERRIDES } from './src/data';
import { BASE_RECIPES } from './src/base_recipes';
import { ADDITIONAL_RECIPES } from './src/additional_recipes';

console.log("=== Course Override Examples ===");
const targetIds = [
  "asian-appetizer-korean-gyeran-mari",
  "asian-appetizer-vietnamese-goi-cuon",
  "asian-appetizer-taiwanese-popcorn-chicken",
  "asian-nepal-curry-aloo-dum-v1",
  "japanese-agedashi-tofu-appetizer",
  "asian-snack-chinese-cong-you-bing"
];

for (const id of targetIds) {
  const r = BASE_RECIPES.find(x => x.id === id) || ADDITIONAL_RECIPES.find(x => x.id === id);
  if (r) {
    console.log(`ID: ${id} | Course: ${getRecipeCourse(r)} | Category: ${r.category}`);
  } else {
    console.log(`ID: ${id} | Not Found`);
  }
}
