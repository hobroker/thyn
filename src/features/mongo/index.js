import mongoose from 'mongoose';
import { pipe } from 'ramda';
import { debugIt } from '../../util/debug';
import { whenDying } from '../death/helpers';
import connectMongo from './util/connectMongo';
import loadModels from './util/loadModels';
import { getAllModels, getMongoConfig } from './accessors';

mongoose.Promise = Promise;

const Mongo = async (oxi, features) => {
  const { connectionString } = oxi(getMongoConfig);

  const mongo = await connectMongo(connectionString);
  const models = pipe(getAllModels, loadModels(mongo))(features);

  oxi(
    whenDying(() => {
      debugIt('stopping');

      return mongo.disconnect();
    }),
  );

  return { mongo: models };
};

export default Mongo;
