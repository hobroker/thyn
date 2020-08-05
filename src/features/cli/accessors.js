import { compose, equals, not, prop } from 'ramda';
import { assocM } from 'oxium';
import { ARGV_EXEC, CLI, DEPENDENCIES, WEB } from './constants';
import { DAEMON } from '../scheduler/constants';

export const ensureDependencies = assocM(DEPENDENCIES);

export const getCli = prop(CLI);

export const getArgvExec = prop(ARGV_EXEC);

export const isWebApp = compose(equals(WEB), getArgvExec);
export const isNotWebApp = compose(not, isWebApp);

export const getCliAppName = compose(prop('name'), getCli);
export const isOnSchedulerApp = compose(equals(DAEMON), getCliAppName);
