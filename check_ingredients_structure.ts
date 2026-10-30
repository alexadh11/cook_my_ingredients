import * as fs from 'fs';
import * as path from 'path';

const content = fs.readFileSync(path.join(process.cwd(), 'src/data.ts'), 'utf-8');

const match = content.indexOf('export const INGREDIENTS');
if (match !== -1) {
  console.log('Found INGREDIENTS declaration at index:', match);
  console.log(content.substring(match, match + 500));
} else {
  console.log('No INGREDIENTS declaration found.');
}
