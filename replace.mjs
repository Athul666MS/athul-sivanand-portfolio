import fs from 'fs';
import path from 'path';

const filesToUpdate = [
  'src/sections/Hero.tsx',
  'src/components/layout/Navbar.tsx',
  'src/components/ui/CustomCursor.tsx',
  'src/components/ui/MagneticButton.tsx',
  'src/sections/Skills.tsx',
  'src/sections/Projects.tsx',
  'src/sections/Contact.tsx',
];

for (const file of filesToUpdate) {
  const filePath = path.resolve(file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace motion import
  content = content.replace(/import \{([\s\S]*?)motion([\s\S]*?)\} from 'framer-motion';/g, "import {$1m$2} from 'framer-motion';");
  
  // Replace motion tags
  content = content.replace(/<motion\./g, '<m.');
  content = content.replace(/<\/motion\./g, '</m.');
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
}
