// import { ApolloServer } from 'apollo-server';
import schema from './schema';
import { getUser } from './Users/users.utils';
import express from 'express' ;
import { ApolloServer, gql } from 'apollo-server-express';
import {
  graphqlUploadExpress, // A Koa implementation is also exported.
} from 'graphql-upload' ;
import logger from 'morgan'
import makeDir from "make-dir";
// import UPLOAD_DIRECTORY_URL from "./Users/UPLOAD_DIRECTORY_URL";
import fs from "fs"
require('dotenv').config();

const PORT = process.env.PORT;


async function startServer() {
  // await makeDir(fileURLToPath(UPLOAD_DIRECTORY_URL));
  !fs.existsSync(`./assets/`) && fs.mkdirSync(`./assets/`, { recursive: true })
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      return {
        currentUser: await getUser(req.headers.jwt_token),
      };
    },
    exclude: { 
      user: {
        password: true 
      }
    }
  });

  await server.start();
  const app = express();
  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());
  app.use(logger('tiny'))
  server.applyMiddleware({ app });
  app.use("/assets",express.static("assets"))
  await new Promise (r => app.listen({ port: 4000 }, r));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();








// // server
// //   .listen(PORT)
// //   .then(() => console.log(`server running on local host ${PORT}`));
