import { SPOTIFY } from '../constants';
import { get } from '../../express/methods';
import { currentState } from '../resolvers/current-activity';
import { saveCurrentState } from '../resolvers/state';

const state = async oxi => {
  const data = await oxi(currentState());

  return oxi(saveCurrentState(data));
};

export default {
  [SPOTIFY]: {
    state: get(state),
  },
};
