import SpotifyApi from 'spotify-web-api-node';
import { pipe } from 'ramda';
import { addRoutes } from '../express/accessors';
import { setModels } from '../mongo/accessors';
import * as models from './models';
import routes from './routes';
import { SPOTIFY } from './constants';
import spotifySummary from './summary';
import { getSpotifyConfig } from './accessors';
import { addSchema } from '../apollo/accessors';
import schema from './schema';

const Spotify = async oxi => {
  const { summary } = oxi;
  const { clientId, clientSecret } = oxi(getSpotifyConfig);
  const spotify = new SpotifyApi({ clientId, clientSecret });
  const createSpotify = () => new SpotifyApi({ clientId, clientSecret });

  summary.set(SPOTIFY, spotifySummary);

  return { spotify, createSpotify };
};

export default pipe(
  setModels(models),
  addRoutes(routes),
  addSchema(schema),
)(Spotify);
