const fs = require('fs');
const path = require('path');

const branch = process.env.CIRCLE_BRANCH;
const finalEnvFilename = '.env';
const templateFilename = '.template.env';
const parametersFilename = 'parameters.json';

const read = filename => fs.readFileSync(filename, 'utf8');

const finalEnvPath = path.join(__dirname, '..', finalEnvFilename);
const templatePath = path.join(__dirname, templateFilename);
const parametersPath = path.join(__dirname, parametersFilename);
const template = read(templatePath);
const parameters = JSON.parse(read(parametersPath))[branch];

if (parameters === undefined) {
  throw new Error(`no parameters for branch ${branch}`);
}

const finalEnv = template.replace(/{{.*}}/g, item => {
  const varName = item.replace(/({{|}})/g, '');

  const value =
    parameters[varName] !== undefined
      ? parameters[varName]
      : process.env[varName];

  if (value === undefined) {
    throw new Error(`did not find value for "${varName}"`);
  }

  return value;
});

fs.writeFileSync(finalEnvPath, finalEnv);
