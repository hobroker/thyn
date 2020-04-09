import { findLatest } from '../../mongo/helpers';
import isTokenValid from '../util/isTokenValid';

export const saveToken = data => ({ mongo: { SpotifyAccessToken } }) =>
  SpotifyAccessToken.create(data);

export const getLatestToken = () => async ({ mongo: { SpotifyAccessToken } }) =>
  findLatest(SpotifyAccessToken);

export const isLatestTokenValid = () => async oxi => {
  const token = await oxi(getLatestToken());

  return isTokenValid(token);
};
