'use client'

import { useState, useEffect } from 'react'

const PASSWORD = 'TestTest21' // cambia qui la tua password

export default function Dashboard() {
    const [access, setAccess] = useState(false)
    const [input, setInput] = useState('')
    type ClickEntry = {
        id: string
        type: string
        ip: string
        user_agent: string
        timestamp: string
    }

    type Stats = {
        total: number
        amazon: number
        download: number
        bounceRate: number
        views: number
        clicks: number
        last: ClickEntry[]
    }

    const [stats, setStats] = useState<Stats | null>(null)

    const handleAuth = () => {
        if (input === PASSWORD) {
            setAccess(true)
        } else {
            alert('Incorrect password')
        }
    }

    useEffect(() => {
        if (!access) return
        fetch('/api/stats?landing=lost-in-the-shell')
            .then(res => res.json())
            .then(setStats)
    }, [access])

    if (!access) {
        return (
            <main className="min-h-screen flex items-center justify-center flex-col gap-4 bg-black text-white">
                <h1 className="text-2xl font-bold">Admin Access</h1>
                <input
                    type="password"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="px-4 py-2 text-black rounded"
                    placeholder="Enter password"
                />
                <button onClick={handleAuth} className="bg-purple-600 px-4 py-2 rounded text-white">
                    Access Dashboard
                </button>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-zinc-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-4">📊 Dashboard – Lost in the Shell</h1>
            {stats ? (
                <>
                    <p>🧠 Amazon Clicks: <strong>{stats.amazon}</strong></p>
                    <p>📄 Sample Clicks: <strong>{stats.download}</strong></p>
                    <p>📉 Bounce Rate: <strong>{stats.bounceRate}%</strong></p>
                    <p className="text-sm opacity-70">
                        Based on total views ({stats.views}) vs interactive clicks ({stats.clicks})
                    </p>
                    <h2 className="text-xl mt-6 mb-2">🕵️ Last 10 Clicks</h2>
                    <ul className="space-y-1">
                        {stats.last.map((entry: ClickEntry) => (
                            <li key={entry.id}>
                                [{entry.timestamp}] {entry.type} – {entry.ip} – {entry.user_agent.slice(0, 40)}...
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Loading stats...</p>
            )}
        </main>
    )
}
