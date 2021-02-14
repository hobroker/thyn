import { exitGracefully } from '../features/death/helpers';
import syncAllUsers from '../features/spotify/resolvers/syncAllUsers';

const spotify = async oxi => {
  await oxi(syncAllUsers());

  exitGracefully();
};

export default spotify;
