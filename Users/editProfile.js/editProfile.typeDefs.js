import { gql } from 'apollo-server';

export default gql`
  type EditProfileResponse {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      username: String
      email: String
      bio: String
      avatar: Upload
      password: String
    ): EditProfileResponse
  }
`;
