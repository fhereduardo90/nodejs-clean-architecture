import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type User {
    id: String!
    firstName: String
    lastName: String
    email: String
    createdAt: String
  }

  input CreateUserInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(user: CreateUserInput!): User!
  }
`
