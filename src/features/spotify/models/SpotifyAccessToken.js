import { gt, identity, ifElse, not, pipe, prop } from 'ramda';

export const schema = {
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
};

export const isTokenValid = ifElse(
  identity,
  pipe(prop('expiresAt'), gt(new Date()), not),
  Boolean,
);
