import mongoose from 'mongoose';
import { MONGOOSE_CONNECT_OPTIONS } from '../constants';
import { debugMongo } from '..';

const connectMongo = async connectionString => {
  debugMongo('connecting to %s', connectionString);

  const mongo = await mongoose.connect(
    connectionString,
    MONGOOSE_CONNECT_OPTIONS,
  );

  debugMongo('connected');

  return mongo;
};

export default connectMongo;
