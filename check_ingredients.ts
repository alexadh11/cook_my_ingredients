import { INGREDIENTS } from './src/data';

const list = [
  "ground-pork", "soy-sauce", "ginger", "scallions", "sesame-oil", "flour", "yeast", "sesame-seeds",
  "cabbage", "egg", "dashi", "oil",
  "pork-belly", "shallots", "five-spice-powder", "rice", "sugar",
  "eggs", "tomatoes", "green-peppers", "olive-oil", "oregano", "pepper-flakes",
  "lamb-shanks", "onion", "garlic", "cumin", "cardamom", "turmeric", "coriander",
  "cocoa-powder", "coconut-milk", "orange-zest",
  "cinnamon", "butter", "milk",
  "raspberries", "cherries", "cornstarch", "vanilla-extract",
  "pork-shoulder", "achiote-paste", "chili-powder", "pineapple", "cilantro", "corn-tortillas",
  "lamb-meat", "potatoes", "curry-powder", "white-bread",
  "teff-flour", "water", "salt",
  "beef-sirloin", "peanut-butter", "cayenne-pepper"
];

console.log("Checking ingredient existence:");
const missing: string[] = [];
for (const id of list) {
  const match = INGREDIENTS.find(i => i.id === id);
  if (match) {
    console.log(`- Found: "${id}" -> ${match.name} (${match.category})`);
  } else {
    console.log(`- MISSING: "${id}"`);
    missing.push(id);
  }
}
console.log("Total missing:", missing.length, missing);
