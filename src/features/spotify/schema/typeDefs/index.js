import { gql } from 'apollo-server-express';
import SpotifyAccessToken from './SpotifyAccessToken';
import SpotifyEntry from './SpotifyEntry';

export default [
  gql`
    extend type Query {
      latestToken: SpotifyAccessToken
      latestState: SpotifyEntry
      latestPlayableState: SpotifyEntry
    }
  `,
  SpotifyAccessToken,
  SpotifyEntry,
];
