const { ApolloServer, gql } = require("apollo-server-lambda")

const typeDefs = gql`
  type Query {
    bookmarks: [Bookmark!]
  }
  type Bookmark {
    id: ID!
    url: String!
    title: String!
  }
`

const bookmarks = [
  { id: 1, url: "www.google.com", title: "Google" },
  { id: 2, url: "www.twitter.com", title: "Twitter" },
  { id: 3, url: "www.github.com", title: "Github" },
]

const resolvers = {
  Query: {
    bookmarks: () => bookmarks,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
})

const handler = server.createHandler()

module.exports = { handler }
