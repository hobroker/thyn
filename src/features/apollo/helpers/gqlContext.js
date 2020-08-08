import { getUserByToken } from '../../user/resolvers/token';

const gqlContext = oxi => async ({ req }) => {
  const { authorization } = req.headers;
  const { user } = await oxi(getUserByToken(authorization));

  return {
    oxi,
    user,
  };
};

export default gqlContext;
