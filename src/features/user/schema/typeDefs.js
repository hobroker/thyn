import { gql } from 'apollo-server-express';

export default gql`
  type User {
    _id: String
    spotifyId: String
  }

  type Token {
    token: String
    user: User
  }
`;
