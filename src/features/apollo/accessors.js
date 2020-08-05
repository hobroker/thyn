import path from 'path';
import { assocM } from 'oxium';
import { compose, converge, prop } from 'ramda';
import { APOLLO, SCHEMA } from './constants';
import {
  getConfigAppRootPath,
  getConfigFeatures,
} from '../../accessors/config';

export const addSchema = assocM(SCHEMA);
export const getApollo = prop(APOLLO);
export const getSchemaFilename = compose(
  prop('schemaFilename'),
  getApollo,
  getConfigFeatures,
);

export const getGqlSchemaFilepath = converge(path.join, [
  getConfigAppRootPath,
  getSchemaFilename,
]);
