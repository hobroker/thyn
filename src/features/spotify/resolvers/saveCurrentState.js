import { map } from 'ramda';
import {
  findOrCreateOne,
  getId,
  manyPickFindOrCreate,
} from '../../mongo/helpers';

const saveCurrentState = state => async ({
  mongo: {
    SpotifyDevice,
    SpotifyAlbum,
    SpotifyArtist,
    SpotifyItem,
    SpotifyEntry,
  },
}) => {
  const device = await findOrCreateOne(SpotifyDevice, state.device, 'id');

  const album = await findOrCreateOne(SpotifyAlbum, state.album, 'id');

  const artists = await manyPickFindOrCreate(
    SpotifyArtist,
    state.artists,
    'id',
  );

  const itemData = {
    ...state.item,
    album: getId(album),
    artists: map(getId, artists),
  };
  const item = await findOrCreateOne(SpotifyItem, itemData, 'id');

  const entryData = {
    ...state.entry,
    device: getId(device),
    item: getId(item),
  };
  const entry = await SpotifyEntry.create(entryData);

  return entry;
};

export default saveCurrentState;
