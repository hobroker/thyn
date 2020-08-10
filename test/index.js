import oxi from 'oxium/src/util/oxi';
import config from '../src/config';

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
