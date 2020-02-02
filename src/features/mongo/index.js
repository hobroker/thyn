import mongoose from 'mongoose';
import { compose, converge } from 'ramda';
import { weave } from 'ramda-adjunct';
import { setDefaultWeave, setHandlerResult } from '../../lens/feature';
import { callReader } from '../../util/reader';
import { getMongoConfig } from './lens';
import { MONGO, MONGOOSE_CONNECT_OPTIONS } from './constants';
import { collectModels, loadModels } from './util';
import { createDebug } from '../../util/debug';

mongoose.Promise = Promise;

const debug = createDebug(MONGO);

const connectMongo = async connectionString => {
  debug('connecting to %s', connectionString);

  const mongo = await mongoose.connect(
    connectionString,
    MONGOOSE_CONNECT_OPTIONS,
  );

  debug('connected');

  return mongo;
};

const handler = converge(
  async (config, models) => {
    const { connectionString } = config;

    const mongo = await connectMongo(connectionString);
    const loadedModels = loadModels(mongo, models);
    const wMongo = weave(callReader, loadedModels);

    return compose(setDefaultWeave(wMongo), setHandlerResult(mongo));
  },
  [getMongoConfig, collectModels],
);

const Mongo = {
  id: MONGO,
  handler,
};

export AbstractModel from './AbstractModel';

export { debug as debugMongo };

export default Mongo;
