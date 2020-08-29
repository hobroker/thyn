const fs = require('fs').promises;

export const readFile = filename => fs.readFile(filename, 'utf-8');
