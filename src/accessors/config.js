import path from 'path';
import { always, compose, converge, prop } from 'ramda';

export const getConfig = prop('config');
export const getConfigFeatures = compose(prop('features'), getConfig);

export const getConfigApp = compose(prop('app'), getConfig);
export const getConfigAppRootPath = compose(prop('rootPath'), getConfigApp);

export const getFeatureRootPath = feature =>
  converge(path.join, [
    getConfigAppRootPath,
    always(`src/features/${feature}`),
  ]);
