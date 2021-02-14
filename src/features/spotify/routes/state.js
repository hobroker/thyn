import { always } from 'ramda';
import { get } from '../../express/methods';
import { SPOTIFY } from '../constants';
import { getLatestPlayableState, syncState } from '../resolvers/state';
import { getReqUserId, withAuthorization } from '../../user/accessors';

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
    example: get(
      always({
        user: {
          id: 'one',
        },
      }),
    ),
  },
};
