import { applyTo } from 'ramda';
import { get } from '../../express/methods';
import { SPOTIFY } from '../constants';
import minutesToday from '../resolvers/stats/minutesToday';
import artistsToday from '../resolvers/stats/artistsToday';
import albumsToday from '../resolvers/stats/albumsToday';

export default {
  [SPOTIFY]: {
    stats: {
      today: {
        minutes: get(applyTo(minutesToday())),
        artists: get(applyTo(artistsToday())),
        albums: get(applyTo(albumsToday())),
      },
    },
  },
};
