import { identity, map, path, pick, pipe, prop, when } from 'ramda';
import mapTo from '../../../util/mapTo';
import { toDate } from '../../../util/date';

const currentPlaybackFacade = when(
  identity,
  pipe(
    prop('body'),
    mapTo({
      device: pipe(prop('device'), pick(['id', 'name', 'type'])),
      entry: {
        shuffleState: 'shuffle_state',
        repeatState: 'repeat_state',
        progressMs: 'progress_ms',
        isPlaying: 'is_playing',
        volumePercent: path(['device', 'volume_percent']),
      },
      item: pipe(
        prop('item'),
        mapTo({
          id: 'id',
          name: 'name',
          type: 'type',
          durationMs: 'duration_ms',
          discNumber: 'disc_number',
          externalIds: 'external_ids',
          isLocal: 'is_local',
          trackNumber: 'track_number',
          explicit: 'explicit',
          popularity: 'popularity',
        }),
      ),
      artists: pipe(
        path(['item', 'artists']),
        map(pick(['id', 'name', 'type'])),
      ),
      album: pipe(
        path(['item', 'album']),
        mapTo({
          id: 'id',
          name: 'name',
          type: 'type',
          images: 'images',
          totalTracks: 'total_tracks',
          releaseDate: pipe(prop('release_date'), toDate),
        }),
      ),
    }),
  ),
);

export default currentPlaybackFacade;
