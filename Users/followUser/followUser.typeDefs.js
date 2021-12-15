import { gql } from 'apollo-server';

export default gql `
type FollowResponse {
    ok: Boolean
    error: String
}
type Mutation {
    followUser(username:String): FollowResponse!
}

`