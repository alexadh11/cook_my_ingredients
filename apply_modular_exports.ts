import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(process.cwd(), 'src/data.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Rename INGREDIENTS to BASE_INGREDIENTS
if (content.includes('export const INGREDIENTS: Ingredient[] = [')) {
  content = content.replace('export const INGREDIENTS: Ingredient[] = [', 'export const BASE_INGREDIENTS: Ingredient[] = [');
  console.log('Renamed INGREDIENTS to BASE_INGREDIENTS');
} else {
  console.log('INGREDIENTS already renamed or not found');
}

// 2. Rename RECIPES to BASE_RECIPES
if (content.includes('export const RECIPES: Recipe[] = [')) {
  content = content.replace('export const RECIPES: Recipe[] = [', 'export const BASE_RECIPES: Recipe[] = [');
  console.log('Renamed RECIPES to BASE_RECIPES');
} else {
  console.log('RECIPES already renamed or not found');
}

// 3. Rename COURSE_OVERRIDES to BASE_COURSE_OVERRIDES
if (content.includes('export const COURSE_OVERRIDES: Record<string, string> = {') || content.includes('export const COURSE_OVERRIDES: Record<string, string> = {};')) {
  content = content.replace('export const COURSE_OVERRIDES: Record<string, string> = {', 'export const BASE_COURSE_OVERRIDES: Record<string, string> = {');
  content = content.replace('export const COURSE_OVERRIDES: Record<string, string> = {};', 'export const BASE_COURSE_OVERRIDES: Record<string, string> = {};');
  console.log('Renamed COURSE_OVERRIDES to BASE_COURSE_OVERRIDES');
} else {
  console.log('COURSE_OVERRIDES already renamed or not found');
}

// 4. Check if we already appended our merge block. If so, remove it to prevent duplicates
const mergeBlockStart = '// --- BEGIN MERGED EXPORTS ---';
const mergeStartIndex = content.indexOf(mergeBlockStart);
if (mergeStartIndex !== -1) {
  content = content.substring(0, mergeStartIndex).trim() + '\n';
}

// Ensure BASE_COURSE_OVERRIDES is defined
if (!content.includes('export const BASE_COURSE_OVERRIDES')) {
  content = content.trim() + '\n\nexport const BASE_COURSE_OVERRIDES: Record<string, string> = {};\n';
}

// 5. Append the fresh merge exports block
const mergeBlock = `
// --- BEGIN MERGED EXPORTS ---
import { ADDITIONAL_INGREDIENTS, ADDITIONAL_RECIPES, ADDITIONAL_COURSE_OVERRIDES } from "./additional_recipes";

export const INGREDIENTS: Ingredient[] = [
  ...BASE_INGREDIENTS,
  ...ADDITIONAL_INGREDIENTS
];

export const RECIPES: Recipe[] = [
  ...BASE_RECIPES,
  ...ADDITIONAL_RECIPES
];

export const COURSE_OVERRIDES: Record<string, string> = {
  ...BASE_COURSE_OVERRIDES,
  ...ADDITIONAL_COURSE_OVERRIDES
};
`;

content = content.trim() + '\n' + mergeBlock;
fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully updated src/data.ts with modular merged exports!');
