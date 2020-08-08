import { always } from 'ramda';
import { mockOxi } from '../../../../../test';
import { latestState, state } from '../state';
import { getLatestPlayableState, syncState } from '../../resolvers/state';

jest.mock('../../resolvers/state');

const oxi = mockOxi();
describe('state', () => {
  it('should call syncState()', () => {
    syncState.mockReturnValue(always(null));

    expect(state(oxi)).toBeNull();

    expect(syncState).toHaveBeenCalledTimes(1);
  });
});

describe('latestState', () => {
  it('should call getLatestPlayableState()', () => {
    getLatestPlayableState.mockReturnValue(always(null));

    expect(latestState(oxi)).toBeNull();

    expect(getLatestPlayableState).toHaveBeenCalledTimes(1);
  });
});
