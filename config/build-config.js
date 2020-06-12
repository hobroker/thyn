const fs = require('fs');
const path = require('path');
const { defaultTo, compose, prop } = require('ramda');

const defaultBranch = 'stage';
const finalEnvFilename = '.env';
const templateFilename = 'template.env';
const parametersFilename = 'parameters.json';

const branch = defaultTo(defaultBranch, process.env.CIRCLE_BRANCH);
const read = filename => fs.readFileSync(filename, 'utf8');

const finalEnvPath = path.join(__dirname, '..', finalEnvFilename);
const templatePath = path.join(__dirname, templateFilename);
const parametersPath = path.join(__dirname, parametersFilename);
const template = read(templatePath);
const parameters = compose(prop(branch), JSON.parse, read)(parametersPath);

if (parameters === undefined) {
  throw new Error(`no parameters for branch ${branch}`);
}

const readValue = varName => {
  const sources = [parameters, process.env];
  for (let i = 0; i < sources.length; i += 1) {
    const value = sources[i][varName];
    if (value !== undefined) {
      return value;
    }
  }

  throw new Error(`did not find value for "${varName}"`);
};

const finalEnv = template.replace(/{{.*}}/g, item => {
  const varName = item.replace(/({{|}})/g, '');

  return readValue(varName);
});

fs.writeFileSync(finalEnvPath, finalEnv);
