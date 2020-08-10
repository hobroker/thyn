import { gql } from 'apollo-server-express';

export default gql`
  type SpotifyImage {
    height: Int
    width: Int
    url: String
  }

  type SpotifyArtist {
    id: String
    name: String
    type: String
  }

  type SpotifyItem {
    id: String
    name: String
    type: String
    totalTracks: Int
    releaseDate: Date
    images: [SpotifyImage]
  }

  type SpotifyDevice {
    id: String
    name: String
    type: String
  }

  type SpotifyEntry {
    id: String
    user: [User]
    volumePercent: Int
    shuffleState: Boolean
    repeatState: String
    progressMs: Int
    timestamp: Date
    type: String
    isPlaying: Boolean
    device: SpotifyDevice
    item: SpotifyItem
    artists: [SpotifyArtist]
    createdAt: Date
    updatedAt: Date
  }
`;
