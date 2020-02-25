import SpotifyApi from 'spotify-web-api-node';
import { pipe } from 'ramda';
import { createDebug } from '../../util/debug';
import { SPOTIFY } from './constants';
import * as models from './models';
import * as routes from './routes';
import { setModels } from '../../accessors/feature';
import { setRoutes } from '../express/accessors';
import weaveReader from '../../util/weaveReader';
import { getSpotifyConfig } from './accessors';

// eslint-disable-next-line no-unused-vars
const debugIt = createDebug(SPOTIFY);

const Spotify = root => {
  const config = getSpotifyConfig(root);
  const api = new SpotifyApi(config.api);

  return {
    spotify: weaveReader(api),
  };
};

export default pipe(setModels(models), setRoutes(routes))(Spotify);
