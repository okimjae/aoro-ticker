
import { gql } from 'graphql-request'

export const TICKER_QUERY = gql`
  query GetTicker {
    ticker {
      amount
      price
      holders
      lastUpdated
    }
  }
`
