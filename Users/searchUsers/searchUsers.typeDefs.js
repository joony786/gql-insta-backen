import { gql } from 'apollo-server-express';

export default gql `
type SearchResponse {
    ok: Boolean!,
    users: [User],
    error: String
}
type Query {
    searchUser(keyword:String!,perPage:Int!,lastId:Int) : SearchResponse!
}

`