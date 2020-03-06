import run from './run';
import config from './config';
import * as apps from './apps';
import features from './features';
import applyApps from './util/applyApps';

run(features, { config }).then(applyApps(apps));
