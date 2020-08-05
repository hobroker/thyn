import { getLatestToken } from '../../resolvers/token';
import getLatestState from '../../resolvers/getLatestState';
import { withResolver } from '../../../apollo/helpers';
import getLatestPlayableState from '../../resolvers/getLatestPlayableState';

export default {
  Query: {
    latestToken: withResolver(getLatestToken),
    latestState: withResolver(getLatestState),
    latestPlayableState: withResolver(getLatestPlayableState),
  },
};
