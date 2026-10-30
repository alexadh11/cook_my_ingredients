import { BASE_RECIPES } from './src/base_recipes';
import { ADDITIONAL_RECIPES } from './src/additional_recipes';

const searchTerms = [
  "milk tea", "kesar pista", "lemongrass", "egg coffee", "ca phe trung", "creamy iced coffee",
  "hot and sour", "red lentil", "tom kha", "tempeh", "summer rice rolls", "summer roll", "nasu dengaku",
  "egg drop", "miso soup", "scallion oil", "mo hanh", "mỡ hành", "barley tea", "boricha", "chili oil",
  "chaas", "sambol", "nimbu soda", "tuk trey", "suutei tsai", "kaya", "sikhye", "jeow som",
  "samosa", "shishito", "chanh muoi", "smashed cucumber", "buttermilk", "wood ear", "chickpea chaat",
  "kimchi pancake", "graham", "crispy mushroom", "green chicken curry", "green curry", "gaeng keow wan gai",
  "adobo", "misua", "nasi lemak", "yam kai dao"
];

const allRecipes = [
  ...BASE_RECIPES.map(r => ({ ...r, source: 'base' })),
  ...ADDITIONAL_RECIPES.map(r => ({ ...r, source: 'additional' }))
];

console.log("=== Recipe Search Results ===");
for (const r of allRecipes) {
  const nameLower = r.name.toLowerCase();
  const idLower = r.id.toLowerCase();
  
  const matched = searchTerms.filter(term => {
    const t = term.toLowerCase();
    return nameLower.includes(t) || idLower.includes(t);
  });
  
  if (matched.length > 0) {
    console.log(`Matched [${matched.join(', ')}]: ID="${r.id}" | Name="${r.name}" | Source="${r.source}" | Category="${r.category}" | Cuisine="${r.cuisine}"`);
  }
}
