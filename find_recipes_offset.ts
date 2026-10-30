import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(process.cwd(), 'src/data.ts');
const content = fs.readFileSync(filePath, 'utf-8');

console.log("Total length of content:", content.length);

const recipesIndex = content.indexOf('export const RECIPES: Recipe[] = [');
if (recipesIndex === -1) {
  console.log("Could not find RECIPES export!");
} else {
  console.log("Found RECIPES export at index:", recipesIndex);
  console.log("Context around export const RECIPES: Recipe[] = [");
  console.log(content.substring(recipesIndex, recipesIndex + 300));
}

const tipsIndex = content.indexOf('export const TIPS: Tip[] = [');
if (tipsIndex === -1) {
  console.log("Could not find TIPS export!");
} else {
  console.log("Found TIPS export at index:", tipsIndex);
  console.log("Context before TIPS export (last 200 chars):");
  console.log(JSON.stringify(content.substring(tipsIndex - 200, tipsIndex)));
}
