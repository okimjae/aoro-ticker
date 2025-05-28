'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { GraphQLClient, gql } from 'graphql-request'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"



const TICKER_QUERY = gql`
  query GetTickers {
    tickers {
      amount
      price
      holders
      lastUpdated
    }
  }
`

type TickerData = {
  amount: number
  price: number
  holders: number
  lastUpdated: string
}

export default function Ticker() {
  const [data, setData] = useState<TickerData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const endpoint = `${window.location.origin}/api/graphql`
      const client = new GraphQLClient(endpoint)

      await new Promise((resolve) => setTimeout(resolve, 1000)) // simulate latency
      const res = await client.request<{ tickers: TickerData[] }>(TICKER_QUERY)
      setData(res.tickers)
    } catch (error) {
      console.error('Failed to fetch:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 20_000)
    return () => clearInterval(interval)
  }, [])

  const renderedRows = useMemo(() => {
    return data.map((token, index) => (
      <TableRow key={index}>
        <TableCell>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>{`T${index + 1}`}</AvatarFallback>
            </Avatar>
            <span>{token.amount} tokens</span>
          </div>
        </TableCell>
        <TableCell>${token.price.toFixed(2)}</TableCell>
        <TableCell>{token.holders.toLocaleString()} users</TableCell>
      </TableRow>
    ))
  }, [data])

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-xl shadow-sm bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">💠 Token Ticker</h2>

      {loading ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Holders</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : data.length > 0 ? (
        <>
          <Table>
            <TableCaption className="text-sm text-muted-foreground">
              Updates every 20 seconds. Last refresh: {new Date().toLocaleTimeString()}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Holders</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renderedRows}
            </TableBody>
          </Table>
          <div className="flex justify-end mt-6">
            <Button disabled={loading} onClick={fetchData} variant="secondary"> {loading ? <Loader2 className="animate-spin" /> : 'Update'}</Button>
          </div>
        </>
      ) : (
        <p className="text-red-500 mt-4">No data available.</p>
      )}
      {error && <p className="text-red-600 my-4">{error}</p>}
    </div>
  )
}