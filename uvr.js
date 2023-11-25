const fs = require('fs');
const packageJson = require('./package.json');

// Leer la versión del package.json
const version = packageJson.version;

// Leer el archivo README.md
let readme = fs.readFileSync('README.md', 'utf8');

// Actualizar la versión en el archivo README
readme = readme.replace(/Version:.*/, `Version: ${version}`);

// Escribir el archivo README.md actualizado
fs.writeFileSync('README.md', readme, 'utf8');