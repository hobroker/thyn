import jwt from 'jsonwebtoken';
import { getJwtSecret } from '../accessors';
import { JWT_EXPIRES_IN } from '../constants';

export const jwtEncode = data => oxi =>
  jwt.sign({ data }, getJwtSecret(oxi), {
    expiresIn: JWT_EXPIRES_IN,
  });

export const jwtDecode = token => () => jwt.decode(token).data;
