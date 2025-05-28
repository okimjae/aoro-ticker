# Token Ticker Component

A React client-side component to fetch and display token ticker data using GraphQL.

## Overview

This component fetches a list of tokens with their amount, price, and holders count from a GraphQL API endpoint and displays them in a styled table. It includes:

- Data fetching with GraphQL using `graphql-request`
- Loading skeleton placeholders while data is fetched
- Auto-refresh every 20 seconds
- Manual refresh button with loading state
- Dark mode support with custom CSS variables
- Memoized rendering for performance optimization

---

## Features

- **GraphQL Data Fetching**: Uses `graphql-request` to query token data.
- **Auto Refresh**: Data refreshes automatically every 20 seconds.
- **Manual Refresh**: Update button to fetch latest data on demand.
- **Loading UI**: Displays skeleton rows while fetching data.
- **Memoization**: Uses `useCallback` and `useMemo` to optimize renders.
- **Responsive & Accessible**: Table layout adapts and uses semantic HTML.
- **Dark Mode**: Supports light and dark themes.

---