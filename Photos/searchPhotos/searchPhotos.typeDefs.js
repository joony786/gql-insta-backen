import { gql } from 'apollo-server-express';

export default gql`
type searchPhotoRes {
    ok: Boolean
    error: String
    photos: [Photo]
}
    type Query {
        searchPhoto(keyword:String,perPage:Int!,lastId:Int): searchPhotoRes
    }

`;
