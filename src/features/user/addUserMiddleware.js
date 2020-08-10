import { compose } from 'ramda';
import { getUserByToken } from './resolvers/token';
import withConstraint from '../express/helpers/withConstraint';
import { getReqUserId } from './accessors';
import { getResolverReq } from '../express/accessors';
import { UnauthorizedError } from '../express/errors';
import throwNew from '../../util/throwNew';

const addUserMiddleware = oxi => async (req, res, next) => {
  const { authorization = null } = req.headers;
  const response = await oxi(getUserByToken(authorization));
  const user = response ? response.user : null;
  req.user = user;

  next();
};

export const withAuthorization = withConstraint(
  compose(getReqUserId, getResolverReq),
  throwNew(UnauthorizedError),
);

export default addUserMiddleware;
