import { createToken } from './token';
import { syncSpotifyUser } from './user';
import { generateToken } from '../../user/resolvers/token';
import SpotifyClient from '../api';

export const spotifyLogin = ({ code, state }) => async oxi => {
  const spotify = new SpotifyClient(oxi);
  const data = await spotify.fetchTokenByCode(code);
  spotify.setToken(data);
  const { id: spotifyId } = await spotify.fetchMe();
  const user = await oxi(
    syncSpotifyUser({
      spotifyId,
      userId: state,
    }),
  );
  const userId = user._id;

  await oxi(
    createToken({
      ...data,
      userId,
    }),
  );

  return oxi(generateToken({ userId }));
};
