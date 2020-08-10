import { get } from '../../express/methods';
import { SPOTIFY } from '../constants';
import { getLatestPlayableState, syncState } from '../resolvers/state';
import { getReqUserId } from '../../user/accessors';
import { withAuthorization } from '../../user/addUserMiddleware';

export const state = (oxi, { req }) => {
  const userId = getReqUserId(req);

  return oxi(syncState({ userId }));
};

export const latestState = (oxi, { req }) => {
  const userId = getReqUserId(req);

  return oxi(getLatestPlayableState({ userId }));
};

export default {
  [SPOTIFY]: {
    state: get(withAuthorization(state)),
    latest: get(withAuthorization(latestState)),
  },
};
