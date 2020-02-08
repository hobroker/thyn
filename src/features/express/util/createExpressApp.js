import express from 'express';
import { compose } from 'ramda';

const createExpressApp = (config, transformers) => {
  // const { prefix, port } = config;
  const app = express();

  return compose(...transformers)(app);
};

export default createExpressApp;
