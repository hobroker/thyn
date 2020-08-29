import path from 'path';
import { always, compose, converge, prop } from 'ramda';
import { SPOTIFY } from './constants';
import { getConfigFeatures, getFeatureRootPath } from '../../accessors/config';

export const getSpotify = prop(SPOTIFY);

export const getSpotifyConfig = compose(getSpotify, getConfigFeatures);

export const getCallbackHtmlContent = converge(path.join, [
  getFeatureRootPath(SPOTIFY),
  always('routes/static/callback.html'),
]);
