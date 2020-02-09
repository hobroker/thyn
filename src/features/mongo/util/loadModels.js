import { curry, mapObjIndexed } from 'ramda';
import { createDebug } from '../../../util/debug';
import { MONGO } from '../constants';

const debugIt = createDebug(`${MONGO}:models`);

const loadModels = curry((mongo, models) =>
  mapObjIndexed((schema, name) => {
    debugIt('add', name);

    return mongo.model(name, schema);
  }, models),
);

export default loadModels;
