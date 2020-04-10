import { compose, map, omit, path, prop, uniqBy } from 'ramda';
import getTodayPlayableEntries from '../getTodayPlayableEntries';

const mapAlbum = compose(
  map(omit(['type', 'id', 'releaseDate', 'totalTracks'])),
  uniqBy(prop('name')),
  map(path(['album'])),
);

const albumsToday = () => async oxi => {
  const list = await oxi(getTodayPlayableEntries());

  return mapAlbum(list);
};

export default albumsToday;
