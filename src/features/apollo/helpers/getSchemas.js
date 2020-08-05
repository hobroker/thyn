import {
  applySpec,
  chain,
  compose,
  filter,
  map,
  not,
  prepend,
  prop,
} from 'ramda';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { isNilOrEmpty } from 'ramda-adjunct';
import { SCHEMA } from '../constants';
import baseTypeDefs from '../schema/base';

const pickFeaturesSchemas = compose(
  filter(compose(not, isNilOrEmpty)),
  map(prop(SCHEMA)),
);

const mergeSchemas = applySpec({
  typeDefs: compose(
    mergeTypeDefs,
    prepend(baseTypeDefs),
    chain(prop('typeDefs')),
  ),
  resolvers: compose(mergeResolvers, map(prop('resolvers'))),
});

const getSchemas = features => {
  const featuresSchemas = pickFeaturesSchemas(features);
  const schema = mergeSchemas(featuresSchemas);

  return makeExecutableSchema(schema);
};

export default getSchemas;
