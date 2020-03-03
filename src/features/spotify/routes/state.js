import { andThen, applyTo, pipe } from 'ramda';
import { SPOTIFY } from '../constants';
import { get } from '../../express/methods';
import { currentState } from '../resolvers/current-activity';
import currentPlaybackFacade from '../facades/currentPlayback';

const state = pipe(applyTo(currentState(), andThen(currentPlaybackFacade)));

export default {
  [SPOTIFY]: {
    state: get(state),
  },
};
