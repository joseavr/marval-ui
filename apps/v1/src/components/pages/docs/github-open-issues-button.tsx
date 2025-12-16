"use client"

import { useEffect, useState } from "react"

import { OpenIssueIcon } from "@/components/icons/issue-icon"
import { ExternalLink } from "@/components/shared/external-link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type GitHubOpenIssuesLinkProps = {
	query: string
	href: string
	className?: string
}

export function GitHubOpenIssuesLink({
	className,
	query,
	href
}: GitHubOpenIssuesLinkProps) {
	const [count, setCount] = useState<number | null>(null)

	useEffect(() => {
		const controller = new AbortController()
		
		async function fetchIssues() {
			try {
				const q = `repo:joseavr/marval-ui is:issue is:open in:title ${query}`
				const res = await fetch(
					`https://api.github.com/search/issues?q=${encodeURIComponent(q)}`,
					{
						headers: {
							Accept: "application/vnd.github+json"
						},
						signal: controller.signal
					}
				)

				if (!res.ok) console.error("GitHub API error: no count returned")

				const data = await res.json()
				console.log('\nCONSOLE Github Data:\n', data, '\n\n')
				setCount(data.total_count)
			} catch {
				console.error("Error 500 at GitHubOpenIssuesLink")
			}
		}

		fetchIssues()

		return () => controller.abort()
	}, [query])

	return (
		<Button
			asChild
			variant="ghost"
			size="default"
			className={cn(
				"flex h-6 w-[135px] items-center gap-1 px-1.5! font-normal underline-offset-4 hover:underline",
				className
			)}
		>
			<ExternalLink href={href}>
				<OpenIssueIcon />
				<span>Open Issues {count ?? 0}</span>
			</ExternalLink>
		</Button>
	)
}
