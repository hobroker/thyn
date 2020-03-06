import mongoose from 'mongoose';
import { pipe } from 'ramda';
import { debugIt } from '../../util/debug';
import { whenDying } from '../death/helpers';
import connectMongo from './util/connectMongo';
import loadModels from './util/loadModels';
import { getAllModels } from './accessors';
import readSecret from '../vault/resolvers/readSecret';
import { MONGO } from './constants';

mongoose.Promise = Promise;

const Mongo = async (oxi, features) => {
  const { connectionString } = await oxi(readSecret(MONGO));

  const mongo = await connectMongo(connectionString);
  const models = pipe(getAllModels, loadModels(mongo))(features);

  oxi(
    whenDying(() => {
      debugIt('stopping');

      mongo.disconnect();
    }),
  );

  return { mongo: models };
};

export default Mongo;
