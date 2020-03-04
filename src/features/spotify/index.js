import SpotifyApi from 'spotify-web-api-node';
import { pipe } from 'ramda';
import { SPOTIFY } from './constants';
import * as models from './models';
import authRoutes from './routes/auth';
import stateRoutes from './routes/state';
import { addRoutes } from '../express/accessors';
import { getSpotifyConfig } from './accessors';
import { setModels } from '../mongo/accessors';

const Spotify = oxi => {
  const config = getSpotifyConfig(oxi);
  const spotify = new SpotifyApi(config.api);

  return {
    [SPOTIFY]: spotify,
  };
};

export default pipe(
  setModels(models),
  addRoutes(authRoutes),
  addRoutes(stateRoutes),
)(Spotify);
