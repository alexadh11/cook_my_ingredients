import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(process.cwd(), 'src/data.ts');
const content = fs.readFileSync(filePath, 'utf-8');

const recipesIndex = content.indexOf('export const RECIPES: Recipe[] =');
if (recipesIndex !== -1) {
  console.log("Context before export const RECIPES (last 200 chars):");
  console.log(JSON.stringify(content.substring(recipesIndex - 200, recipesIndex)));
}
