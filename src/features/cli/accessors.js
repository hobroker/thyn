import { compose, equals, not, prop } from 'ramda';
import { ARGV_EXEC, CLI, DEPENDENCIES, WEB } from './constants';
import { assocM } from '../../util/mutable';

export const ensureDependencies = assocM(DEPENDENCIES);

export const getCli = prop(CLI);

export const getArgvExec = prop(ARGV_EXEC);

export const isWebApp = compose(equals(WEB), getArgvExec);
export const isNotWebApp = compose(not, isWebApp);

export const getCliAppName = compose(prop('name'), getCli);

export const ensureIsWebApp = assocM(DEPENDENCIES, [isWebApp]);
