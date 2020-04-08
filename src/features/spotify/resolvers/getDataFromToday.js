import { startOfToday } from 'date-fns';

const getDataFromToday = () => async oxi => {
  const {
    mongo: { SpotifyEntry },
  } = oxi;

  return SpotifyEntry.find({
    createdAt: {
      $gte: startOfToday(),
    },
  });
};

export default getDataFromToday;
