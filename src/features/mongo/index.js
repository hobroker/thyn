import mongoose from 'mongoose';
import { compose, converge, mapObjIndexed } from 'ramda';
import { weave } from 'ramda-adjunct';
import { createDebug } from '../../util/debug';
import {
  setDefaultWeave,
  setHandler,
  setHandlerResult,
  setId,
} from '../../lens/feature';
import { geAllModels } from '../../lens/app';
import { callReader } from '../../util/reader';
import { MONGO } from './constants';
import { getMongoConfig, getSchema } from './lens';
import connectMongo from './util/connectMongo';
import loadModels from './util/loadModels';
import createSchema from './util/createSchema';

mongoose.Promise = Promise;

const debugIt = createDebug(MONGO);

const handler = converge(
  async (config, models) => {
    const { connectionString } = config;

    const mongo = await connectMongo(connectionString);
    const loadedModels = loadModels(mongo, models);
    const wMongo = weave(callReader, loadedModels);

    return compose(setDefaultWeave(wMongo), setHandlerResult(mongo));
  },
  [
    getMongoConfig,
    compose(mapObjIndexed(compose(createSchema, getSchema)), geAllModels),
  ],
);

const Mongo = compose(setId(MONGO), setHandler(handler));

export { debugIt as debugMongo };

export default Mongo;
