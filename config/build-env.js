/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const templateFilename = 'template.env';

const templatePath = path.join(__dirname, templateFilename);
const template = fs.readFileSync(templatePath, 'utf8');

const readValue = varName => {
  const value = process.env[varName];
  if (value === undefined) {
    throw new Error(`did not find value for "${varName}"`);
  }

  return value;
};

const finalEnv = template.replace(/{{.*}}/g, item => {
  const varName = item.replace(/({{|}})/g, '');

  return readValue(varName);
});

console.log(finalEnv);
