const createSpotifyEntry = data => async ({ mongo: { SpotifyEntry } }) =>
  SpotifyEntry.create(data);

export default createSpotifyEntry;
