import { compose, prop } from 'ramda';
import { getConfigFeatures } from '../../accessors/config';
import { USER } from './constants';

export const getUserConfig = compose(prop(USER), getConfigFeatures);
export const getJwtSecret = compose(prop('jwtSecret'), getUserConfig);
