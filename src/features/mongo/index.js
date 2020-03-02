import mongoose from 'mongoose';
import { pipe } from 'ramda';
import connectMongo from './util/connectMongo';
import loadModels from './util/loadModels';
import { getAllMongoModels, getMongoConfig } from './accessors';
import { MONGO } from './constants';

mongoose.Promise = Promise;

const Mongo = async oxi => {
  const { connectionString } = getMongoConfig(oxi);

  const mongo = await connectMongo(connectionString);
  const models = pipe(getAllMongoModels, loadModels(mongo))(oxi);

  return {
    [MONGO]: models,
  };
};

export default Mongo;
