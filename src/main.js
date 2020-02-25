import run from './run';
import config from './config';
import * as apps from './apps';
import features from './features';

run(features, { config }, apps);
