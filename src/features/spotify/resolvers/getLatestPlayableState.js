const getLatestPlayableState = () => ({ mongo: { SpotifyEntry } }) =>
  SpotifyEntry.findOne({
    isPlaying: true,
  }).sort({
    createdAt: 'desc',
  });

export default getLatestPlayableState;
