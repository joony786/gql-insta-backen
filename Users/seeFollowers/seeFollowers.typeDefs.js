import { gql } from 'apollo-server-express';

export default gql`
  type SeeFollowersResponse {
    ok: Boolean!
    error: String
    followers: [User]
    totalPages: Int
  }
  type Query {
    seeFollowers(
      username: String
      perPage: Int
      pageNumber: Int
    ): SeeFollowersResponse!
  }
`;
