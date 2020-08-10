import { findAlUsers } from '../../user/resolvers/user';
import resolveSequentially from '../../../util/resolveSequentially';
import { debugIt } from '../../../util/debug';
import { syncState } from './state';

const syncAllUsers = () => async oxi => {
  const users = await oxi(findAlUsers());

  return resolveSequentially(async user => {
    const data = await oxi(syncState(user));

    debugIt(`userId=${user._id}`);
    debugIt(data);
  }, users);
};

export default syncAllUsers;
