import { debugIt } from '../util/debug';
import { syncState } from '../features/spotify/resolvers/state';

const spotify = async oxi => {
  const data = await oxi(syncState());

  debugIt(data);
};

export default spotify;
