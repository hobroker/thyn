import mongoose from 'mongoose';
import { pipe } from 'ramda';
import { getAllModels } from '../../accessors/root';
import connectMongo from './util/connectMongo';
import loadModels from './util/loadModels';
import { getMongoConfig } from './accessors';
import { MONGO } from './constants';

mongoose.Promise = Promise;

const Mongo = async oxi => {
  const { connectionString } = getMongoConfig(oxi);

  const mongo = await connectMongo(connectionString);
  const models = pipe(getAllModels, loadModels(mongo))(oxi);

  return {
    [MONGO]: models,
  };
};

export default Mongo;
