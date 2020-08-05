import { compose, prop } from 'ramda';

export const getConfig = prop('config');
export const getConfigFeatures = compose(prop('features'), getConfig);

export const getConfigApp = compose(prop('app'), getConfig);
export const getConfigAppRootPath = compose(prop('rootPath'), getConfigApp);
