import { compose, equals, not, prop } from 'ramda';
import { assocM } from 'oxium';
import { DEPENDENCIES, ARGV_EXEC, WEB } from './constants';

export const ensureDependencies = assocM(DEPENDENCIES);

export const isWebApp = compose(equals(WEB), prop(ARGV_EXEC));

export const isNotWebApp = compose(not, isWebApp);
