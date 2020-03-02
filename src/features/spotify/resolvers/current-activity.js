import { NO_CONTENT } from 'http-status-codes';
import { ensureTokenIsValid } from './auth';

const getMyCurrentPlaybackState = () => ({ spotify }) =>
  spotify.getMyCurrentPlaybackState().then(response => {
    if (response.statusCode === NO_CONTENT) {
      return null;
    }

    return response;
  });

export const currentState = () => async oxi => {
  await oxi(ensureTokenIsValid());
  const state = await oxi(getMyCurrentPlaybackState());
  if (!state) {
    return null;
  }

  return state;
};
