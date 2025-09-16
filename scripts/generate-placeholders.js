const fs = require('fs');
const path = require('path');

// Create placeholder images for projects
const projects = [
  'curriculum-builder',
  'direct-dad', 
  'kids-call-home',
  'mindmaster-pro',
  'soundscape-studio',
  'box-breather'
];

const svgTemplate = (projectName, color) => `
<svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="450" fill="${color}"/>
  <text x="400" y="200" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="white">
    ${projectName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
  </text>
  <text x="400" y="250" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="rgba(255,255,255,0.8)">
    Project Preview
  </text>
</svg>`;

const colors = [
  '#3B82F6', // Blue
  '#10B981', // Green  
  '#F59E0B', // Yellow
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#06B6D4'  // Cyan
];

projects.forEach((project, index) => {
  const color = colors[index % colors.length];
  const svg = svgTemplate(project, color);
  const filePath = path.join(__dirname, '..', 'public', 'images', `${project}.svg`);
  
  fs.writeFileSync(filePath, svg);
  console.log(`Generated placeholder for ${project}`);
});

console.log('All placeholder images generated!');
