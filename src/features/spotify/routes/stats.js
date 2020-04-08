import { get } from '../../express/methods';
import { SPOTIFY } from '../constants';

export default {
  [SPOTIFY]: {
    stats: get(() => 'ofc'),
  },
};
