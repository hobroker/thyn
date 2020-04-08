import getCurrentState from './getCurrentState';
import createSpotifyEntry from './createSpotifyEntry';

const syncState = () => async oxi => {
  const data = await oxi(getCurrentState());

  if (!data) {
    return null;
  }

  return oxi(createSpotifyEntry(data));
};

export default syncState;
