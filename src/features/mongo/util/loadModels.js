import { curry, mapObjIndexed } from 'ramda';
import { debugIt } from '../../../util/debug';

const loadModels = curry((mongo, models) =>
  mapObjIndexed((schema, name) => {
    debugIt('add', name);

    return mongo.model(name, schema);
  }, models),
);

export default loadModels;
