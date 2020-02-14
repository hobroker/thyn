import { parseArgv } from './util/argv';
import run from './run';
import config from './config';
import * as features from './features';

const argv = parseArgv(process.argv);

run({ config, features, argv });
