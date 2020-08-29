import request from 'supertest';
import { always } from 'ramda';
import { OK } from 'http-status-codes';
import { mockExpress, mockFindToken } from '../../../../../test';
import SpotifyClient from '../../api';
import { spotifyLogin } from '../../resolvers/auth';

jest.mock('../../api');
jest.mock('../../resolvers/auth');

afterEach(() => {
  SpotifyClient.mockClear();
  spotifyLogin.mockClear();
});

const app = mockExpress();

describe('spotify/auth', () => {
  mockFindToken({ user: { _id: 'uno' } });
  it('should redirect to spotify auth', async () => {
    SpotifyClient.prototype.generateAuthorizeURL.mockReturnValueOnce('/some');

    await request(app)
      .get('/api/spotify/auth')
      .expect(302)
      .expect('Location', '/some');
  });
});

describe('spotify/auth/callback', () => {
  it('should call spotifyLogin with query params', async () => {
    const data = { one: 1 };
    const query = { code: 'one', state: 'two' };
    spotifyLogin.mockReturnValueOnce(always(data));

    const { body } = await request(app)
      .get('/api/spotify/auth/callback')
      .query(query)
      .expect(OK);

    expect(body).toEqual(data);
    expect(spotifyLogin).toBeCalledWith(query);
  });
});
