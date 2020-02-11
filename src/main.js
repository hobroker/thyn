import runWith from './runWith';
import config from './config';
import * as features from './features';
import parseEnv from './util/parseEnv';

const env = parseEnv(process.argv);

runWith({ config, features, env });
