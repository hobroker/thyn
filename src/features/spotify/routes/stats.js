import { applyTo } from 'ramda';
import { get } from '../../express/methods';
import { SPOTIFY } from '../constants';
import getDataFromToday from '../resolvers/getDataFromToday';

const stats = applyTo(getDataFromToday());

export default {
  [SPOTIFY]: {
    stats: get(stats),
  },
};
