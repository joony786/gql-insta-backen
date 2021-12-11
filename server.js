import { ApolloServer } from 'apollo-server';
import schema from './schema'

require("dotenv").config()

const PORT = process.env.PORT
const server = new ApolloServer({ schema });

server.listen(PORT).then(() => console.log(`server running on local host ${PORT}`));
