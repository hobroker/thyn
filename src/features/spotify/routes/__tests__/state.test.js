import { always } from 'ramda';
import request from 'supertest';
import { OK } from 'http-status-codes';
import { mockExpress, mockFindToken } from '../../../../../test';
import { getLatestPlayableState, syncState } from '../../resolvers/state';

jest.mock('../../resolvers/state');

mockFindToken({ user: { _id: 'uno' } });

afterEach(() => {
  syncState.mockClear();
  getLatestPlayableState.mockClear();
});

const app = mockExpress();

describe('spotify/state', () => {
  it('should return result from syncState', async () => {
    const data = { one: 1 };
    syncState.mockReturnValueOnce(always(Promise.resolve(data)));

    await request(app).get('/api/spotify/state').expect(OK, data);

    expect(syncState).toBeCalledWith({ userId: 'uno' });
  });
});

describe('latestState', () => {
  it('should return result from getLatestPlayableState', async () => {
    const data = { one: 1 };
    getLatestPlayableState.mockReturnValueOnce(always(data));

    await request(app).get('/api/spotify/latest').expect(OK, data);

    expect(getLatestPlayableState).toHaveBeenCalledWith({ userId: 'uno' });
  });
});
