import { findLatest } from '../../mongo/helpers';
import { MONGO } from '../../mongo/constants';

export const createToken = data => ({ [MONGO]: { SpotifyAccessToken } }) =>
  SpotifyAccessToken.create(data);

export const getLatestToken = () => async ({
  [MONGO]: { SpotifyAccessToken },
}) => findLatest(SpotifyAccessToken);

export const findSpotifyAccessToken = filter => async ({
  [MONGO]: { SpotifyAccessToken },
}) => findLatest(SpotifyAccessToken, filter);
