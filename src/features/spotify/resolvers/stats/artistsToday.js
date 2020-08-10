import { compose, map, omit, path, prop, uniqBy } from 'ramda';
import { getTodayPlayableEntries } from '../entries';

const mapArtists = compose(
  map(omit(['type', 'id'])),
  uniqBy(prop('name')),
  map(path(['artists', '0'])),
);

const artistsToday = () => async oxi => {
  const list = await oxi(getTodayPlayableEntries());

  return mapArtists(list);
};

export default artistsToday;
