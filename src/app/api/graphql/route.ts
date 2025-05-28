import { createYoga } from 'graphql-yoga'
import { createSchema } from 'graphql-yoga'

function generateMockData() {
  const now = new Date().toISOString()
  return Array.from({ length: 5 }).map(() => ({
    amount: Math.floor(Math.random() * 5000 + 100),
    price: parseFloat((Math.random() * 10).toFixed(2)),
    holders: Math.floor(Math.random() * 5000 + 100),
    lastUpdated: now,
  }))
}

const typeDefs = `
  type Ticker {
    amount: Int
    price: Float
    holders: Int
    lastUpdated: String
  }

  type Query {
    tickers: [Ticker]
  }
`

const resolvers = {
  Query: {
    tickers: () => generateMockData(),
  },
}

const schema = createSchema({
  typeDefs,
  resolvers,
})

const yoga = createYoga({
  graphqlEndpoint: '/api/graphql',
  schema,
  fetchAPI: { Request, Response },
})

export { yoga as GET, yoga as POST }
