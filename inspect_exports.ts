import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(process.cwd(), 'src/data.ts');
const content = fs.readFileSync(filePath, 'utf-8');

const regex = /export\s+(const|interface|function|class|type)\s+([A-Za-z0-9_]+)/g;
let match;
console.log("Exports found in src/data.ts:");
while ((match = regex.exec(content)) !== null) {
  const keyword = match[1];
  const name = match[2];
  const index = match.index;
  const lineNo = content.substring(0, index).split('\n').length;
  console.log(`- ${keyword} ${name} at line ${lineNo} (index ${index})`);
}
