import { createYoga, createSchema } from 'graphql-yoga'
import { NextRequest } from 'next/server'

function generateMockData() {
  const now = new Date().toISOString()
  return Array.from({ length: 5 }).map(() => ({
    amount: Math.floor(Math.random() * 5000 + 100),
    price: parseFloat((Math.random() * 10).toFixed(2)),
    holders: Math.floor(Math.random() * 5000 + 100),
    lastUpdated: now,
  }))
}

const typeDefs = /* GraphQL */ `
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
  schema,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Request, Response },
})

export async function GET(request: NextRequest) {
  return yoga.handleRequest(request, {})
}

export async function POST(request: NextRequest) {
  return yoga.handleRequest(request, {})
}
