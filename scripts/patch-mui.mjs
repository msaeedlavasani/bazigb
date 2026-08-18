import fs from 'fs';
import path from 'path';

// MUI v9.3.0 compatibility patch for Next.js 14 Server Components
// Problem: @mui/system/useMediaQuery is marked 'use client' but called at module init
// Resulting in: TypeError: unstable_createUseMediaQuery is not a function

const filesToPatch = [
  'node_modules/@mui/system/useMediaQuery/useMediaQuery.js',
  'node_modules/@mui/system/useMediaQuery/useMediaQuery.mjs'
];

filesToPatch.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes("'use client'")) {
      content = content.replace(/'use client';?\n?/, '');
      fs.writeFileSync(filePath, content);
      console.log(`Patched: ${file}`);
    }
  } else {
    console.warn(`File not found, skipping patch: ${file}`);
  }
});
