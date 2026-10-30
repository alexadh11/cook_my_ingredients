import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(process.cwd(), 'src/data.ts');
const content = fs.readFileSync(filePath, 'utf-8');

const searchStr = 'COURSE_OVERRIDES';
const index = content.indexOf(searchStr);
if (index === -1) {
  console.log("Could not find COURSE_OVERRIDES");
} else {
  console.log("Found COURSE_OVERRIDES definition.");
  // Find closing curly brace
  let braceCount = 0;
  let started = false;
  let endPos = index;
  for (let i = index; i < content.length; i++) {
    if (content[i] === '{') {
      braceCount++;
      started = true;
    } else if (content[i] === '}') {
      braceCount--;
    }
    if (started && braceCount === 0) {
      endPos = i + 1;
      break;
    }
  }
  console.log("COURSE_OVERRIDES bounds:", index, "to", endPos);
  console.log("Ends with:");
  console.log(content.substring(endPos - 150, endPos));
}
