import pipeAsync from 'oxium/src/util/pipeAsync';
import { execApp } from './util/execApp';
import load from './run';
import config from './config';
import * as apps from './apps';
import * as features from './features';

const { argv } = process;

const root = { config, features, argv };

pipeAsync(load, execApp(apps))(root);
