import currentPlaybackFacade from '../currentPlayback';
import myCurrentPlaybackState from '../__mocks__/myCurrentPlaybackState.json';

const expected = {
  device: {
    id: 'e371924b86d4f088fb21ebb270fb35257baa5bc2',
    name: 'ileahu-mlt',
    type: 'Computer',
  },
  album: {
    id: '0nCRRcaqMHBnb0hfKnfTPO',
    name: 'PUMPED UP KICKS',
    type: 'album',
    images: myCurrentPlaybackState.body.item.album.images,
    releaseDate: new Date('2019-06-28T00:00:00.000Z'),
    totalTracks: 1,
  },
  artists: [{ id: '4GHi4xklo0FT0l2CNuLFh2', name: '3TEETH', type: 'artist' }],
  item: {
    id: '3ncucOcYMOd7VQ1jyAA6BU',
    name: 'PUMPED UP KICKS',
    type: 'track',
    durationMs: 271666,
    discNumber: 1,
    explicit: false,
    externalIds: { isrc: 'USQX91900130' },
    isLocal: false,
    popularity: 51,
    trackNumber: 1,
  },
  entry: {
    shuffleState: false,
    repeatState: 'track',
    progressMs: 130732,
    isPlaying: true,
    volumePercent: 100,
  },
};

describe('spotify-item facade', () => {
  it('should return expected object', () => {
    expect(currentPlaybackFacade(myCurrentPlaybackState)).toEqual(expected);
  });

  it('should return null on empty object', () => {
    expect(currentPlaybackFacade(null)).toEqual(null);
  });
});
