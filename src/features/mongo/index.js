import { setHandler, setId } from 'oxium';
import mongoose from 'mongoose';
import { compose, converge, mapObjIndexed, pipe } from 'ramda';
import { weave } from 'ramda-adjunct';
import { setDefaultWeave, setHandlerResult } from '../../lens/feature';
import { getAllModels } from '../../lens/root';
import callReader from '../../util/callReader';
import { MONGO } from './constants';
import { getMongoConfig, getSchema } from './lens';
import connectMongo from './util/connectMongo';
import loadModels from './util/loadModels';
import createSchema from './util/createSchema';

mongoose.Promise = Promise;

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
    compose(mapObjIndexed(compose(createSchema, getSchema)), getAllModels),
  ],
);

const Mongo = pipe(setId(MONGO), setHandler(handler));

export default Mongo;
