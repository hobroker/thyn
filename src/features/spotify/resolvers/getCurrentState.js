import { NO_CONTENT } from 'http-status-codes';
import { ensureTokenIsValid } from './auth';
import currentPlaybackFacade from '../facades/currentPlayback';

const getCurrentState = () => async oxi => {
  const { spotify } = oxi;

  await oxi(ensureTokenIsValid());
  const response = await spotify.getMyCurrentPlaybackState();

  if (response.statusCode === NO_CONTENT) {
    return null;
  }

  return currentPlaybackFacade(response);
};

export default getCurrentState;