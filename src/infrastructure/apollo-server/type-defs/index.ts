import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  scalar DateTime

  type User {
    id: String!
    firstName: String
    lastName: String
    email: String
    createdAt: DateTime
  }

  input CreateUserInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(user: CreateUserInput!): User!
  }
`
