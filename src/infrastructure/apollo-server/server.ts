import 'reflect-metadata'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import logger, { expressLogger } from '../logger'
import { IOCContainerInit } from '../../interface/ioc/container'
import { typeDefs } from './type-defs'
import { resolvers } from './resolvers'

const PORT = process.env.API_PORT || 4000

// Initialize the app
const app = express()
app.use(expressLogger())

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    IOCContainer: IOCContainerInit(),
  }),
})
server.applyMiddleware({ app })

app.listen({ port: PORT }, () =>
  logger.info(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
  ),
)
