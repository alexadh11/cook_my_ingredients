import * as fs from 'fs';
import * as path from 'path';

const jsPath = path.join(process.cwd(), 'dist/assets/index-Ofq9NdN5.js');
const content = fs.readFileSync(jsPath, 'utf-8');

// Search for deadline and see what is in the array or object
const indices: number[] = [];
let pos = content.indexOf("deadline:");
while (pos !== -1) {
  indices.push(pos);
  pos = content.indexOf("deadline:", pos + 1);
}

console.log("Found occurrences of 'deadline:' at:", indices);
for (const idx of indices) {
  console.log(`\nSurrounding of 'deadline:' at index ${idx}:`);
  console.log(content.substring(Math.max(0, idx - 150), Math.min(content.length, idx + 150)));
}
