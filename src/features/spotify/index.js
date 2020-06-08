import SpotifyApi from 'spotify-web-api-node';
import { pipe } from 'ramda';
import { addRoutes } from '../express/accessors';
import { setModels } from '../mongo/accessors';
import * as models from './models';
import authRoutes from './routes/auth';
import stateRoutes from './routes/state';
import statsRoutes from './routes/stats';
import { SPOTIFY } from './constants';
import scheduleCurrentState from './schedules/scheduleCurrentState';
import spotifySummary from './summary';
import { getSpotifyConfig } from './accessors';

const Spotify = async oxi => {
  const { summary } = oxi;
  const { clientId, clientSecret } = oxi(getSpotifyConfig);
  const spotify = new SpotifyApi({ clientId, clientSecret });

  await oxi(scheduleCurrentState());

  summary.set(SPOTIFY, spotifySummary);

  return { spotify };
};

export default pipe(
  setModels(models),
  addRoutes(authRoutes),
  addRoutes(stateRoutes),
  addRoutes(statsRoutes),
)(Spotify);
