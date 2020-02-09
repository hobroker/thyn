import { Schema } from 'mongoose';
import { MONGOOSE_SCHEMA_OPTIONS } from '../constants';

const createSchema = value => new Schema(value, MONGOOSE_SCHEMA_OPTIONS);

export default createSchema;
