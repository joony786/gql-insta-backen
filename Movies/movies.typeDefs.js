import { gql } from 'apollo-server';

export default gql`
  type Movie {
    id: Int!
    title: String!
    year: Int!
    createdAt: String!
    updatedAt: String!
    genre: String
  }
  interface createMovieResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }

  type Mutation {
    createMovie(title: String!, year: Int!, genre: String!): Movie!
    deleteMovie(id: Int!): Boolean
  }
`;
