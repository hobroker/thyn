import SpotifyApi from 'spotify-web-api-node';
import { pipe } from 'ramda';
import { SPOTIFY } from './constants';
import * as models from './models';
import authRoutes from './routes/auth';
import stateRoutes from './routes/state';
import { setModels } from '../../accessors/feature';
import { addRoutes } from '../express/accessors';
import { getSpotifyConfig } from './accessors';

const Spotify = oxi => {
  const { api } = getSpotifyConfig(oxi);
  const spotify = new SpotifyApi(api);

  return {
    [SPOTIFY]: spotify,
  };
};

export default pipe(
  setModels(models),
  addRoutes(authRoutes),
  addRoutes(stateRoutes),
)(Spotify);
