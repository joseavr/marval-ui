"use client"

import Link from "next/link"
import { useState, useTransition } from "react"

interface SearchResult {
	title: string
	description: string
	path: string
	score: number
}

export function Search() {
	const [query, setQuery] = useState("")
	const [results, setResults] = useState<SearchResult[]>([])
	const [isPending, startTransition] = useTransition()

	const handleSearch = (value: string) => {
		setQuery(value)
		startTransition(async () => {
			if (!value.trim()) {
				setResults([])
				return
			}

			try {
				const response = await fetch(`/api/search?q=${encodeURIComponent(value)}`)
				const data = await response.json()
				setResults(data.results || [])
			} catch (error) {
				console.error("Search error:", error)
				setResults([])
			}
		})
	}

	return (
		<div className="relative w-full max-w-md">
			<input
				type="search"
				placeholder="Search documentation..."
				value={query}
				onChange={(e) => handleSearch(e.target.value)}
				className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
			/>
			{query && (
				<div className="absolute top-full z-50 mt-2 w-full rounded-md border bg-background shadow-lg">
					{isPending ? (
						<div className="p-4 text-center text-muted-foreground text-sm">
							Searching...
						</div>
					) : results.length > 0 ? (
						<div className="max-h-96 overflow-y-auto">
							{results.map((result) => (
								<Link
									key={result.path}
									href={result.path}
									className="block border-b p-4 transition-colors hover:bg-accent"
									onClick={() => setQuery("")}
								>
									<div className="font-semibold">{result.title}</div>
									<div className="text-muted-foreground text-sm">
										{result.description}
									</div>
								</Link>
							))}
						</div>
					) : (
						<div className="p-4 text-center text-muted-foreground text-sm">
							No results found
						</div>
					)}
				</div>
			)}
		</div>
	)
}
