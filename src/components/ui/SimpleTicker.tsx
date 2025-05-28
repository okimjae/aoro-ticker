'use client'

import { useEffect, useState } from 'react'

interface TickerData {
  tokenAmount: number
  tokenPrice: number
  tokenHolders: number
  lastUpdated: string
}

const generateMockData = (): TickerData => {
  const now = new Date().toISOString()
  return {
    tokenAmount: Math.floor(1000 + Math.random() * 500),
    tokenPrice: parseFloat((0.5 + Math.random()).toFixed(2)),
    tokenHolders: Math.floor(900 + Math.random() * 200),
    lastUpdated: now,
  }
}

export default function SimpletTicker() {
  const [data, setData] = useState<TickerData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    setLoading(true)
    setTimeout(() => {
      const newData = generateMockData()
      setData(newData)
      setLoading(false)
    }, 1000) // simulate network delay
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30_000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-md mx-auto p-6 rounded-xl shadow-md  mt-10 border border-gray-200">
      <h2 className="text-xl font-bold mb-4 flex items-center justify-between">
        Token Ticker
        <button
          onClick={fetchData}
          disabled={loading}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Refresh
        </button>
      </h2>

      {loading ? (
        <div className="text-gray-500">Loading data...</div>
      ) : (
        data && (
          <ul className="space-y-2 text-white">
            <li>
              <strong>🪙 Token Amount:</strong> {data.tokenAmount.toLocaleString()}
            </li>
            <li>
              <strong>💰 Token Price:</strong> ${data.tokenPrice.toFixed(2)} USD
            </li>
            <li>
              <strong>👥 Token Holders:</strong> {data.tokenHolders.toLocaleString()} users
            </li>
            <li>
              <strong>🕒 Last Updated:</strong>{' '}
              {new Date(data.lastUpdated).toLocaleString()}
            </li>
          </ul>
        )
      )}
    </div>
  )
}
