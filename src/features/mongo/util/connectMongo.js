import mongoose from 'mongoose';
import { MONGOOSE_CONNECT_OPTIONS } from '../constants';
import { debugIt } from '../../../util/debug';

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
