import { gql } from 'apollo-server';

export default gql `
scalar Upload
type User {
    id: String!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    bio: String
    avatar: Upload
    createdAt: String!
    updatedAt: String!
    totalFollowings: Int
    totalFollowers: Int
    isMe:Boolean
    isFollowing:Boolean
  }


`
  
  