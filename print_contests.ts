import * as fs from 'fs';
import * as path from 'path';

const jsPath = path.join(process.cwd(), 'dist/assets/index-Ofq9NdN5.js');
const content = fs.readFileSync(jsPath, 'utf-8');

console.log(content.substring(1945300, 1946300));
