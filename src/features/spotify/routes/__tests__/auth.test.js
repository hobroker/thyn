import { always, identity, T } from 'ramda';
import { auth, authCallback, ping } from '../auth';
import { mockOxi } from '../../../../../test';
import { getAuthorizeURL, spotifyLogin } from '../../resolvers/auth';
import { isLatestTokenValid } from '../../resolvers/token';

jest.mock('../../../spotify/resolvers/auth');
jest.mock('../../resolvers/token');

const oxi = mockOxi();
describe('auth', () => {
  it('should redirect to the expected url', () => {
    const redirect = jest.fn();
    const res = { redirect };

    getAuthorizeURL.mockReturnValue(always('/somewhere'));

    auth(oxi, { res });

    expect(getAuthorizeURL).toHaveBeenCalledTimes(1);
  });
});

describe('authCallback', () => {
  it('should redirect to the expected url', async () => {
    const code = 'some';
    const req = { query: { code } };
    const generatedToken = { token: '123qwe' };

    spotifyLogin.mockReturnValue(always(generatedToken));

    const result = await authCallback(oxi, { req });

    expect(result).toBe(generatedToken);
    expect(spotifyLogin).toHaveBeenCalledWith({ code });
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
