import SpotifyApi from 'spotify-web-api-node';
import { pipe } from 'ramda';
import * as models from './models';
import authRoutes from './routes/auth';
import stateRoutes from './routes/state';
import { addRoutes } from '../express/accessors';
import { setModels } from '../mongo/accessors';
import readSecret from '../vault/resolvers/readSecret';
import { SPOTIFY } from './constants';

const Spotify = async oxi => {
  const { clientId, clientSecret } = await oxi(readSecret(SPOTIFY));
  const spotify = new SpotifyApi({ clientId, clientSecret });

  return { spotify };
};

export default pipe(
  setModels(models),
  addRoutes(authRoutes),
  addRoutes(stateRoutes),
)(Spotify);
