import { getSpotify } from '../accessors';
import { createUser, findUser } from '../../user/resolvers/user';
import profileFacade from '../facades/user';

export const getCurrentSpotifyUser = () => async oxi => {
  const spotify = getSpotify(oxi);
  const response = await spotify.getMe();

  return profileFacade(response);
};

const syncSpotifyUser = ({ accessToken }) => async oxi => {
  const spotify = getSpotify(oxi);
  spotify.setAccessToken(accessToken);

  const { id } = await oxi(getCurrentSpotifyUser());
  const user = await oxi(
    findUser({
      id,
    }),
  );

  return (
    user ||
    oxi(
      createUser({
        spotifyId: id,
      }),
    )
  );
};

export { syncSpotifyUser };
