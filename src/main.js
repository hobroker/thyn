import { parseEnv } from './util/cli';
import runWith from './runWith';
import config from './config';
import * as features from './features';

const env = parseEnv(process.argv);

runWith({ config, features, env });
