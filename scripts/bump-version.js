const fs = require('fs');
const path = require('path');

const versionFilePath = path.join(__dirname, '../version.json');
const swFilePath = path.join(__dirname, '../sw.js');

// 1. Read and parse version.json
let versionData = { version: '1.0.0', timestamp: Date.now() };
if (fs.existsSync(versionFilePath)) {
  const rawData = fs.readFileSync(versionFilePath, 'utf-8');
  try {
    versionData = JSON.parse(rawData);
  } catch (e) {
    console.error('Error parsing version.json', e);
  }
}

// 2. Increment version (simple patch increment for this example)
const parts = versionData.version.split('.');
let patch = parseInt(parts[2]) || 0;
parts[2] = patch + 1;
const newVersion = parts.join('.');

versionData.version = newVersion;
versionData.timestamp = Date.now();

// 3. Write back to version.json
fs.writeFileSync(versionFilePath, JSON.stringify(versionData, null, 2));
console.log(`Updated version.json to version ${newVersion}`);

// 4. Update sw.js CACHE_VERSION
if (fs.existsSync(swFilePath)) {
  let swContent = fs.readFileSync(swFilePath, 'utf-8');
  // Replace the CACHE_VERSION line
  swContent = swContent.replace(/const CACHE_VERSION = '.*?';/, `const CACHE_VERSION = '${newVersion}';`);
  fs.writeFileSync(swFilePath, swContent);
  console.log(`Updated sw.js CACHE_VERSION to ${newVersion}`);
} else {
  console.error('sw.js not found!');
}

console.log('Version bump complete! You can now deploy your changes.');
