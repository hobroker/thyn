const fs = require('fs');
const path = require('path');

const branch = process.env.CIRCLE_BRANCH;

const finalEnvPath = path.join(__dirname, '../.env');
const templatePath = path.join(__dirname, '.template.env');
const parametersPath = path.join(__dirname, 'parameters.json');
const template = fs.readFileSync(templatePath, 'utf8');
const parameters = JSON.parse(fs.readFileSync(parametersPath, 'utf8'))[branch];

if (parameters === undefined) {
  throw new Error(`no parameters for branch ${branch}`);
}

const finalEnv = template.replace(/{{.*}}/g, item => {
  const varName = item.replace(/({{|}})/g, '');

  const value = parameters[varName] || process.env[varName];

  if (value === undefined) {
    throw new Error(`did not find value for "${varName}"`);
  }

  return value;
});

fs.writeFileSync(finalEnvPath, finalEnv);
