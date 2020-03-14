import { compose, equals, not, prop } from 'ramda';
import { assocM } from 'oxium';
import { DEPENDENCIES, EXEC, WEB } from './constants';

export const ensureDependencies = assocM(DEPENDENCIES);

export const isWebApp = compose(equals(WEB), prop(EXEC));

export const isNotWebApp = compose(not, isWebApp);
