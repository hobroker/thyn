import { compose, map, omit, path, prop, uniqBy } from 'ramda';
import getDataFromToday from '../getDataFromToday';

const mapAlbum = compose(
  map(omit(['type', 'id', 'releaseDate', 'totalTracks'])),
  uniqBy(prop('name')),
  map(path(['album'])),
);

const albumsToday = () => async oxi => {
  const list = await oxi(getDataFromToday());

  return mapAlbum(list);
};

export default albumsToday;
