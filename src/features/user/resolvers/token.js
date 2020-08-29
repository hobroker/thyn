import { getMongo } from '../../mongo/accessors';
import { jwtEncode } from '../util/jwt';
import { getJwtUserData } from './user';

export const generateToken = ({ userId }) => async oxi => {
  const { Token } = getMongo(oxi);
  const data = await oxi(getJwtUserData({ userId }));
  const token = oxi(jwtEncode(data));

  return Token.create({
    user: userId,
    token,
  });
};

export const findTokenWithUser = token => ({ mongo: { Token } }) =>
  token ? Token.findOne({ token }).populate('user') : null;
