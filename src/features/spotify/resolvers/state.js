import { NO_CONTENT } from 'http-status-codes';
import { path } from 'ramda';
import { ensureTokenIsValid } from './token';
import currentPlaybackFacade from '../facades/currentPlayback';
import { debugIt } from '../../../util/debug';
import createSpotifyEntry from './createSpotifyEntry';

const isPrivateSession = path(['body', 'device', 'is_private_session']);

export const getCurrentState = () => async oxi => {
  const { spotify } = oxi;
  await oxi(ensureTokenIsValid());
  const response = await spotify.getMyCurrentPlaybackState();

  if (response.statusCode === NO_CONTENT || isPrivateSession(response)) {
    return null;
  }

  const { entry, device, artists, album, item } = currentPlaybackFacade(
    response,
  );

  return {
    ...entry,
    item,
    artists,
    device,
    album,
  };
};

export const syncState = () => async oxi => {
  const data = await oxi(getCurrentState());

  if (!data) {
    debugIt('no data to save');

    return null;
  }

  debugIt('fetched new data');

  return oxi(createSpotifyEntry(data));
};

export const getLatestPlayableState = () => ({ mongo: { SpotifyEntry } }) =>
  SpotifyEntry.findOne({
    isPlaying: true,
  }).sort({
    createdAt: 'desc',
  });
