import { gql } from 'apollo-server';

export default gql`
 type User {
        id: String!
        firstName: String!
        lastName: String
        username: String!
        email: String!
        createdAt: String!
        updatedAt: String!
    }
    
    type loginResponse {
        ok: Boolean!
        token: String
        error: String
    }
   
    type Mutation {
        createAccount(firstName:String!,lastName:String,username:String!,email:String!,password:String): User
        login(username: String!,password:String!): loginResponse!
    }

    type Query {
        seeProfile(username: String): User
    }

`;
