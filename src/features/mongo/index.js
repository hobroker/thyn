import mongoose from 'mongoose';
import { compose, converge } from 'ramda';
import { weave } from 'ramda-adjunct';
import { createDebug } from '../../util/debug';
import {
  setDefaultWeave,
  setHandler,
  setHandlerResult,
  setId,
} from '../../lens/feature';
import { geAlltModels } from '../../lens/app';
import { callReader } from '../../util/reader';
import { MONGO } from './constants';
import { connectMongo, loadModels } from './util';
import { getMongoConfig } from './lens';

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
  [getMongoConfig, geAlltModels],
);

const Mongo = compose(setId(MONGO), setHandler(handler));

export { debugIt as debugMongo };

export default Mongo;
