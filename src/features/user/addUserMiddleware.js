import { findTokenWithUser } from './resolvers/token';

const addUserMiddleware = oxi => async (req, res, next) => {
  const { authorization = null } = req.headers;
  const response = await oxi(findTokenWithUser(authorization));
  const user = response ? response.user : null;
  req.user = user;

  next();
};

export default addUserMiddleware;
