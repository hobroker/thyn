import SpotifyApi from 'spotify-web-api-node';
import { pipe } from 'ramda';
import { addRoutes } from '../express/accessors';
import { setModels } from '../mongo/accessors';
import readSecret from '../vault/resolvers/readSecret';
import * as models from './models';
import authRoutes from './routes/auth';
import stateRoutes from './routes/state';
import { SPOTIFY } from './constants';
import scheduleCurrentState from './schedules/scheduleCurrentState';

const Spotify = async oxi => {
  const { clientId, clientSecret } = await oxi(readSecret(SPOTIFY));
  const spotify = new SpotifyApi({ clientId, clientSecret });

  await oxi(scheduleCurrentState());

  return { spotify };
};

export default pipe(
  setModels(models),
  addRoutes(authRoutes),
  addRoutes(stateRoutes),
)(Spotify);
