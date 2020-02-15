import { andThen, pipe } from 'ramda';
import { parseArgv } from './util/argv';
import { execApp } from './util/execApp';
import run from './run';
import config from './config';
import * as apps from './apps';
import * as features from './features';

const argv = parseArgv(process.argv);

pipe(run, andThen(execApp(apps)))({ config, features, argv });
