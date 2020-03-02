import { applyTo } from 'ramda';
import { SPOTIFY } from '../constants';
import { get } from '../../express/methods';
import { currentState } from '../resolvers/current-activity';

const state = applyTo(currentState());

export default {
  [SPOTIFY]: {
    state: get(state),
  },
};
