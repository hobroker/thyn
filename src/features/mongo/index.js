import mongoose from 'mongoose';
import { pipe } from 'ramda';
import { debugIt } from '../../util/debug';
import { whenDying } from '../death/helpers';
import connectMongo from './util/connectMongo';
import loadModels from './util/loadModels';
import { getAllModels } from './accessors';
import readSecretSafe from '../vault/resolvers/readSecretSafe';
import { MONGO } from './constants';

mongoose.Promise = Promise;

const Mongo = async (oxi, features) => {
  const { connectionString } = await oxi(readSecretSafe(MONGO));

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
