import { curry, mapObjIndexed } from 'ramda';
import { debugMongo } from '..';

const loadModels = curry((mongo, models) =>
  mapObjIndexed((schema, name) => {
    debugMongo('load model', name);

    return mongo.model(name, schema);
  }, models),
);

export default loadModels;
