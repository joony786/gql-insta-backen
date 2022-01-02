
import { gql } from 'apollo-server-express';

export default gql`
type SeePhotRes {
    ok: Boolean!
    photo: Photo
    error: String
}
type Query {
    seePhotos(id:Int!):SeePhotRes!
}

`