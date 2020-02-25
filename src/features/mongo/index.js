import mongoose from 'mongoose';
import connectMongo from './util/connectMongo';
import loadModels from './util/loadModels';
import { getAllMongoModels, getMongoConfig } from './accessors';
import weaveReader from '../../util/weaveReader';

mongoose.Promise = Promise;

const Mongo = async root => {
  const { connectionString } = getMongoConfig(root);
  const models = getAllMongoModels(root);

  const mongo = await connectMongo(connectionString);
  const loadedModels = loadModels(mongo, models);

  return {
    wMongo: weaveReader(loadedModels),
  };
};

export default Mongo;
