import mongoose from 'mongoose';
import { pipe } from 'ramda';
import connectMongo from './util/connectMongo';
import loadModels from './util/loadModels';
import { getAllModels, getMongoConfig } from './accessors';
import { MONGO } from './constants';

mongoose.Promise = Promise;

const Mongo = async (oxi, features) => {
  const { connectionString } = getMongoConfig(oxi);

  const mongo = await connectMongo(connectionString);
  const models = pipe(getAllModels, loadModels(mongo))(features);

  return {
    [MONGO]: models,
  };
};

export default Mongo;
