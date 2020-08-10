import { findSpotifyAccessToken } from './token';
import { debugIt } from '../../../util/debug';
import SpotifyClient from '../api';
import { createSpotifyEntry } from './entries';

export const syncState = ({ userId }) => async oxi => {
  const spotifyAccessToken = await oxi(findSpotifyAccessToken({ userId }));
  const spotify = new SpotifyClient(oxi, {
    token: spotifyAccessToken,
    onTokenUpdate: ({ accessToken, expiresAt }) =>
      spotifyAccessToken.updateOne({ accessToken, expiresAt }),
  });
  const data = await spotify.getCurrentState();

  if (!data) {
    debugIt('no data to save');

    return null;
  }

  debugIt('fetched new data');

  const entry = {
    ...data,
    user: userId,
  };

  return oxi(createSpotifyEntry(entry));
};

export const getLatestPlayableState = ({ userId }) => ({
  mongo: { SpotifyEntry },
}) =>
  SpotifyEntry.findOne({
    user: userId,
    isPlaying: true,
  }).sort({
    createdAt: 'desc',
  });
