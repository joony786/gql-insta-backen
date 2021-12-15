import { gql } from 'apollo-server-express';

export default gql`
  type SeeFollowingResults {
    ok: Boolean!
    error: String
    following: [User]
  }

  type Query {
    seeFollowing(
      username: String!
      lastId: Int
      perPage: Int!
    ): SeeFollowingResults
  }
`;
