import { gql } from 'apollo-server';

export default gql`
  type Photo {
    id: Int!
    file: String!
    caption: String
    user: User!
    hashtags: [HashTag]
    createdAt: String!
    updatedAt: String!
  }
  type PhotosResponse {
    ok: Boolean!
    error: String
    photos: [Photo]
  }
  type HashTag {
    id: Int!
    hashtag: String!
    photos(lastId: String, perPage:Int!): PhotosResponse
    totalPhots:Int!
    createdAt: String!
    updatedAt: String!
  }
`;
