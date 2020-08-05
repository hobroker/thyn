import mergeDeepAll from '../../../util/mergeDeepAll';
import authRoutes from './auth';
import stateRoutes from './state';
import statsRoutes from './stats';

export default mergeDeepAll([authRoutes, stateRoutes, statsRoutes]);
