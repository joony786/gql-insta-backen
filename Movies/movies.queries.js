import client from '../client';

export default {
    Query: {
        movies: () => client.movie.findMany(),
        movie: (id) => client.movie.findFirst({
          where : {
            id
          }
        }),
      },
    
}