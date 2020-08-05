import { printSchema } from 'graphql';
import { compose } from 'ramda';
import { debugIt } from '../util/debug';
import { getGqlSchemaFilepath } from '../features/apollo/accessors';
import getSchemas from '../features/apollo/helpers/getSchemas';
import { exitGracefully } from '../features/death/helpers';

const fs = require('fs').promises;

const getStringSchema = compose(printSchema, getSchemas);

const gqlSchema = async (oxi, features) => {
  const filepath = oxi(getGqlSchemaFilepath);
  const schema = getStringSchema(features);

  return fs
    .writeFile(filepath, schema)
    .then(debugIt.lazy('done'))
    .then(exitGracefully);
};

export default gqlSchema;
