import { startOfToday } from 'date-fns';

export const createSpotifyEntry = data => async ({ mongo: { SpotifyEntry } }) =>
  SpotifyEntry.create(data);

export const getDataFromToday = filter => async oxi => {
  const {
    mongo: { SpotifyEntry },
  } = oxi;

  return SpotifyEntry.find({
    createdAt: { $gte: startOfToday() },
    ...filter,
  });
};

export const getTodayPlayableEntries = () =>
  getDataFromToday({ isPlaying: true });
