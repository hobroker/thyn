import request from 'supertest';
import { always } from 'ramda';
import { OK } from 'http-status-codes';
import Express from '../../../express';
import { mockOxi } from '../../../../../test';
import features from '../../../index';
import SpotifyClient from '../../api';
import { spotifyLogin } from '../../resolvers/auth';

jest.mock('../../api');
jest.mock('../../resolvers/auth');

afterEach(() => {
  SpotifyClient.mockClear();
  spotifyLogin.mockClear();
});

describe('spotify/auth', () => {
  const oxi = mockOxi();
  const { express } = Express(oxi, features);

  it('should redirect to spotify auth', async () => {
    SpotifyClient.prototype.generateAuthorizeURL.mockReturnValueOnce('/some');

    await request(express)
      .get('/api/spotify/auth')
      .set('Authorization', 'test')
      .expect(302)
      .expect('Location', '/some');
  });
});

describe('spotify/auth/callback', () => {
  const oxi = mockOxi();
  const { express } = Express(oxi, features);

  it('should call spotifyLogin()', async () => {
    const data = { one: 1 };
    spotifyLogin.mockReturnValueOnce(always(data));

    const { body } = await request(express)
      .get('/api/spotify/auth/callback')
      .expect(OK);

    expect(body).toEqual(data);
  });
});
