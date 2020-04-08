import { findLatest } from '../../mongo/helpers';

const getLatestState = () => ({ mongo: { SpotifyEntry } }) =>
  findLatest(SpotifyEntry);

export default getLatestState;
