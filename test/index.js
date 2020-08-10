import oxi from 'oxium/src/util/oxi';
import config from '../src/config';

jest.mock('dotenv', () => ({
  __esModule: true,
  default: {
    config: () => ({
      parsed: {
        NODE_ENV: 'test',
      },
    }),
  },
}));

export const mockOxi = (data = {}) =>
  oxi({
    config: {
      ...config,
      env: 'TEST',
    },
    ...data,
  });

export const mockReq = (data = {}) => ({
  user: {
    _id: 'user1',
    spotifyId: 'userspotify',
  },
  ...data,
});
