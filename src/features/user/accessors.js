import { compose, prop } from 'ramda';
import { getConfigFeatures } from '../../accessors/config';
import { USER } from './constants';

export const getUserConfig = compose(prop(USER), getConfigFeatures);
export const getJwtSecret = compose(prop('jwtSecret'), getUserConfig);

const getUser = prop('user');

export const getReqUserId = compose(prop('_id'), getUser);
