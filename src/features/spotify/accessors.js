import { pipe, prop } from 'ramda';
import { SPOTIFY } from './constants';
import { getConfigFeatures } from '../../accessors/config';

export const getSpotify = prop(SPOTIFY);

export const getSpotifyConfig = pipe(getConfigFeatures, getSpotify);
