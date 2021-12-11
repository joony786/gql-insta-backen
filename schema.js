import { mergeTypeDefs,mergeResolvers } from '@graphql-tools/merge'
import {loadFilesSync} from "@graphql-tools/load-files";
import { makeExecutableSchema } from '@graphql-tools/schema'
// import path from 'path'
// const { print } = require('graphql')
// const fs = require('fs')

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
// const loadedTypes = loadFilesSync(path.join(__dirname, './**/*.typeDefs.js'))

// const printedTypeDefs = print(loadedTypes)
// console.log(printedTypeDefs);

const loadedResolvers = loadFilesSync(`${__dirname}/**/*.{queries,mutations}.js`)

const typeDefs = mergeTypeDefs(loadedTypes)
const resolvers = mergeResolvers(loadedResolvers)

 const schema = makeExecutableSchema({typeDefs,resolvers})

 export default schema