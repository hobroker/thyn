import { gql } from 'apollo-server-express';

export default gql`
  type SpotifyAccessToken {
    accessToken: String
    refreshToken: String
    expiresAt: String
  }
`;
