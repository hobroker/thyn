import mongoose from 'mongoose';
import { MONGO, MONGOOSE_CONNECT_OPTIONS } from '../constants';
import { createDebug } from '../../../util/debug';

const debugIt = createDebug(`${MONGO}:connect`);

const connectMongo = async connectionString => {
  debugIt('connecting to %s', connectionString);

  const mongo = await mongoose.connect(
    connectionString,
    MONGOOSE_CONNECT_OPTIONS,
  );

  debugIt('connected');

  return mongo;
};

export default connectMongo;
