import { always } from 'ramda';
import { auth, authCallback } from '../auth';
import { mockOxi } from '../../../../../test';
import { spotifyLogin } from '../../resolvers/auth';
import SpotifyClient from '../../api';

jest.mock('../../api');
jest.mock('../../resolvers/auth');

afterEach(() => {
  SpotifyClient.mockClear();
  spotifyLogin.mockClear();
});

const oxi = mockOxi();
describe('auth', () => {
  it('should redirect to the expected url', () => {
    const redirect = jest.fn();
    const res = { redirect };
    const req = { user: { _id: 'uno' } };

    SpotifyClient.prototype.generateAuthorizeURL.mockReturnValueOnce('/some');

    auth(oxi, { res, req });

    expect(SpotifyClient.prototype.generateAuthorizeURL).toHaveBeenCalledWith({
      userId: 'uno',
    });
    expect(redirect).toHaveBeenCalledWith('/some');
  });
});

describe('authCallback', () => {
  it('should redirect to the expected url', async () => {
    const code = 'some';
    const req = { query: { code } };
    const generatedToken = { token: '123qwe' };

    spotifyLogin.mockReturnValue(always(generatedToken));

    const result = authCallback(oxi, { req });

    expect(result).toBe(generatedToken);
    expect(spotifyLogin).toHaveBeenCalledWith({ code });
  });
});
