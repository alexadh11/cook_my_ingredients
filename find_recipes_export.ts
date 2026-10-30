import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(process.cwd(), 'src/data.ts');
const content = fs.readFileSync(filePath, 'utf-8');

const searchStr = 'export const RECIPES: Recipe[] =';
const index = content.indexOf(searchStr);
if (index === -1) {
  console.log("Could not find RECIPES export!");
} else {
  console.log("Found RECIPES export at index:", index);
  // Let's print the line number
  const linesBefore = content.substring(0, index).split('\n').length;
  console.log("Line number:", linesBefore);
}
