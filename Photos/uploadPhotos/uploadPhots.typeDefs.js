import { gql } from 'apollo-server';

export default gql`

    type UploadPhotoResponse {
        ok: Boolean!
        error: String
        photo: Photo
    }
    type Mutation {
        uploadPhoto(caption:String,file:String!):UploadPhotoResponse!
    }
`