import { startOfToday } from 'date-fns';

const getTodayPlayableEntries = () => async oxi => {
  const {
    mongo: { SpotifyEntry },
  } = oxi;

  return SpotifyEntry.find({
    isPlaying: true,
    createdAt: {
      $gte: startOfToday(),
    },
  });
};

export default getTodayPlayableEntries;
