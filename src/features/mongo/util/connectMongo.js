import mongoose from 'mongoose';
import { MONGOOSE_CONNECT_OPTIONS } from '../constants';
import { debugIt } from '../../../util/debug';
import protectString from '../../../util/protectString';

const connectMongo = async connectionString => {
  debugIt('connecting to %s', protectString(connectionString));

  const mongo = await mongoose.connect(
    connectionString,
    MONGOOSE_CONNECT_OPTIONS,
  );

  debugIt('connected');

  return mongo;
};

export default connectMongo;
