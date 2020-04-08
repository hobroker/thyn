import getCurrentState from './getCurrentState';
import createSpotifyEntry from './createSpotifyEntry';
import { debugIt } from '../../../util/debug';

const syncState = () => async oxi => {
  const data = await oxi(getCurrentState());

  if (!data) {
    debugIt('no data to save');

    return null;
  }

  debugIt('fetched new data');

  return oxi(createSpotifyEntry(data));
};

export default syncState;
