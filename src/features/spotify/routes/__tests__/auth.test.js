import { always, identity, T } from 'ramda';
import { auth, authCallback, ping } from '../auth';
import { mockOxi } from '../../../../../test';
import { generateAuthorizationUrl, getTokenByCode } from '../../resolvers/auth';
import { syncSpotifyUser } from '../../resolvers/user';
import { isLatestTokenValid, saveToken } from '../../resolvers/token';

jest.mock('../../../spotify/resolvers/auth');
jest.mock('../../resolvers/user');
jest.mock('../../resolvers/token');

const oxi = mockOxi();
describe('auth', () => {
  it('should redirect to the expected url', () => {
    const redirect = jest.fn();
    const res = { redirect };

    generateAuthorizationUrl.mockReturnValue(always('/redirect'));

    auth(oxi, { res });

    expect(redirect).toHaveBeenCalledWith('/redirect');
  });
});

describe('authCallback', () => {
  it('should redirect to the expected url', async () => {
    const code = 'some';
    const token = { accessToken: 'one' };
    const req = { query: { code } };

    getTokenByCode.mockReturnValue(always(token));
    syncSpotifyUser.mockReturnValue(always({ _id: '1' }));
    saveToken.mockReturnValue(always(null));

    const result = await authCallback(oxi, { req });

    expect(result).toBeNull();
    expect(getTokenByCode).toHaveBeenCalledWith(code);
    expect(syncSpotifyUser).toHaveBeenCalledWith(token);
    expect(saveToken).toHaveBeenCalledWith({
      accessToken: 'one',
      userId: '1',
    });
  });
});

describe('ping', () => {
  it('should work as expected', async () => {
    const mongo = jest.fn().mockImplementation(identity);

    isLatestTokenValid.mockImplementation(T);

    const result = ping({ mongo });

    expect(result).toEqual(true);
    expect(isLatestTokenValid).toHaveBeenCalledTimes(1);
    expect(mongo).toHaveBeenCalledTimes(1);
  });
});
