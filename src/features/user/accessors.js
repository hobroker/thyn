import { compose, prop } from 'ramda';
import { getConfigFeatures } from '../../accessors/config';
import { USER } from './constants';
import withConstraint from '../express/helpers/withConstraint';
import { getResolverReq } from '../express/accessors';
import throwNew from '../../util/throwNew';
import { UnauthorizedError } from '../express/errors';

export const getUserConfig = compose(prop(USER), getConfigFeatures);
export const getJwtSecret = compose(prop('jwtSecret'), getUserConfig);

const getUser = prop('user');

export const getReqUserId = compose(prop('_id'), getUser);

export const withAuthorization = withConstraint(
  compose(getReqUserId, getResolverReq),
  throwNew(UnauthorizedError),
);
