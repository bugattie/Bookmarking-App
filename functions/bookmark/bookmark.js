const { ApolloServer, gql } = require("apollo-server-lambda")
const faunadb = require("faunadb"),
  q = faunadb.query

const typeDefs = gql`
  type Query {
    bookmarks: [Bookmark!]
  }
  type Bookmark {
    id: ID!
    url: String!
    title: String!
  }
  type Mutation {
    addBookmark(url: String!, title: String!): Bookmark
    deleteBookmark(id: ID!): Bookmark
  }
`

const resolvers = {
  Query: {
    bookmarks: async (root, args, context) => {
      try {
        const client = new faunadb.Client({
          secret: process.env.FAUNADB_SECRET_KEY,
          domain: "db.us.fauna.com",
          scheme: "https",
        })

        const result = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("bookmarkIndex"))),
            q.Lambda(x => q.Get(x))
          )
        )

        return result.data.map(bookmark => {
          return {
            id: bookmark.ref.id,
            title: bookmark.data.title,
            url: bookmark.data.url,
          }
        })
      } catch (err) {
        console.log("**** Error ****", err)
      }
    },
  },

  Mutation: {
    addBookmark: async (_, { url, title }) => {
      try {
        const client = new faunadb.Client({
          secret: process.env.FAUNADB_SECRET_KEY,
          domain: "db.us.fauna.com",
          scheme: "https",
        })
        const result = await client.query(
          q.Create(q.Collection("bookmark"), {
            data: {
              title,
              url,
            },
          })
        )
        return result.data
      } catch (err) {
        console.log("**** Error ****", err)
      }
    },

    deleteBookmark: async (_, { id }) => {
      try {
        const client = new faunadb.Client({
          secret: process.env.FAUNADB_SECRET_KEY,
          domain: "db.us.fauna.com",
          scheme: "https",
        })

        await client.query(q.Delete(q.Ref(q.Collection("bookmark"), id)))
      } catch (err) {
        console.log("**** Error ****", err)
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
})

const handler = server.createHandler()

module.exports = { handler }
