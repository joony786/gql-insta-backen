import { gql } from 'apollo-server';

export default gql`
  

  type seeProfileResponse {
    ok:Boolean
    error:String
    user: User
  }

    type Query {
        seeProfile(username: String): seeProfileResponse
    }

`;
