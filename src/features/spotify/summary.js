import { andThen, compose, map, omit, path, prop } from 'ramda';
import mapTo from '../../util/mapTo';
import minutesToday from './resolvers/stats/minutesToday';
import getLatestState from './resolvers/getLatestState';

export default {
  default: compose(
    andThen(value => `${value} minutes today`),
    minutesToday(),
  ),
  'latest-entry': compose(
    andThen(
      mapTo({
        name: path(['item', 'name']),
        device: compose(omit(['id']), prop('device')),
        artists: compose(map(prop('name')), prop('artists')),
        album: compose(prop('name'), prop('album')),
      }),
    ),
    getLatestState(),
  ),
};
