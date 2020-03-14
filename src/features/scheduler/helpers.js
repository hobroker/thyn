import { when } from 'ramda';
import hasRequiredFeatures from '../../util/hasRequiredFeatures';

export const whenSchedulerExists = when(hasRequiredFeatures(['scheduler']));
