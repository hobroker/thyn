import { createUser, findUser } from '../../user/resolvers/user';

const syncSpotifyUser = ({ spotifyId, userId }) => async oxi => {
  const filter = userId ? { userId } : { spotifyId };
  const user = await oxi(findUser(filter));

  return user || oxi(createUser({ spotifyId }));
};

export { syncSpotifyUser };
