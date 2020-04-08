import { applyTo } from 'ramda';
import { get } from '../../express/methods';
import { SPOTIFY } from '../constants';
import todaySummary from '../resolvers/stats/todaySummary';

const today = applyTo(todaySummary());

export default {
  [SPOTIFY]: {
    stats: {
      today: get(today),
    },
  },
};
