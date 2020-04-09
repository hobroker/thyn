import { compose, map, omit, path, prop, uniqBy } from 'ramda';
import getDataFromToday from '../getDataFromToday';

const mapArtists = compose(
  map(omit(['type', 'id'])),
  uniqBy(prop('name')),
  map(path(['artists', '0'])),
);

const artistsToday = () => async oxi => {
  const list = await oxi(getDataFromToday());

  return mapArtists(list);
};

export default artistsToday;
