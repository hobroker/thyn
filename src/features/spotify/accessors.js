import { pipe, prop } from 'ramda';
import { SPOTIFY } from './constants';
import { getConfigFeatures } from '../../accessors/config';

export const getSpotifyConfig = pipe(getConfigFeatures, prop(SPOTIFY));
