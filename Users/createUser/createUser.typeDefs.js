import { gql } from 'apollo-server';

export default gql`
type createUserResponse {
  ok: Boolean!
  message: String
  error: String
}
  type Mutation {
    createAccount(
      firstName: String!
      lastName: String
      username: String!
      email: String!
      password: String
    ): createUserResponse!
  }
`;
