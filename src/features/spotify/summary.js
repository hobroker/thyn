import { andThen, compose, map, prop } from 'ramda';
import minutesToday from './resolvers/stats/minutesToday';
import artistsToday from './resolvers/stats/artistsToday';
import albumsToday from './resolvers/stats/albumsToday';

export default {
  'minutes-today': minutesToday(),
  'artists-today': compose(andThen(map(prop('name'))), artistsToday()),
  'albums-today': compose(andThen(map(prop('name'))), albumsToday()),
};
