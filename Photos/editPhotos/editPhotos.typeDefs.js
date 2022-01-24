import { gql } from 'apollo-server-express';


export default gql`
    type EditPhotoRes {
        ok: Boolean!
        error: String
    }
    type Mutation {
        editPhoto(id:Int!,caption:String!):EditPhotoRes!
    }

`