import run from './run';
import config from './config';
import * as apps from './apps';
import * as features from './features';

const { argv } = process;

const root = { config, features, argv };

run(root, apps);
