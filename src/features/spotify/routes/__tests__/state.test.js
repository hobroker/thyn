import { always } from 'ramda';
import { mockOxi } from '../../../../../test';
import { latestState, state } from '../state';
import { getLatestPlayableState, syncState } from '../../resolvers/state';

jest.mock('../../resolvers/state');

const oxi = mockOxi();

afterEach(() => {
  syncState.mockClear();
  getLatestPlayableState.mockClear();
});

describe('state', () => {
  it(`should return result from syncState`, async () => {
    const data = { one: 1 };
    syncState.mockReturnValueOnce(always(Promise.resolve(data)));

    const req = { user: { _id: 'uno' } };
    const result = await state(oxi, { req });

    expect(result).toEqual(data);
    expect(syncState).toHaveBeenCalledWith({ userId: 'uno' });
  });
});

describe('latestState', () => {
  it('should return result from getLatestPlayableState', async () => {
    const data = { one: 1 };
    getLatestPlayableState.mockReturnValueOnce(always(Promise.resolve(data)));

    const req = { user: { _id: 'uno' } };
    const result = await latestState(oxi, { req });

    expect(result).toEqual(data);
    expect(getLatestPlayableState).toHaveBeenCalledWith({ userId: 'uno' });
  });
});
