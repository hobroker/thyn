import { always } from 'ramda';
import { auth, authCallback } from '../auth';
import { mockOxi } from '../../../../../test';
import { getAuthorizeURL, spotifyLogin } from '../../resolvers/auth';

jest.mock('../../../spotify/resolvers/auth');

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
