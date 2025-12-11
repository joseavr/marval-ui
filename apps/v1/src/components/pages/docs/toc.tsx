"use client"

import { Menu03 } from "@untitledui/icons"
import { useAtomValue } from "jotai"
import React from "react"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { layoutAtom } from "@/store/layout-atom"

function useActiveItem(itemIds: string[]) {
	const [activeId, setActiveId] = React.useState<string | null>(null)

	React.useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id)
					}
				}
			},
			{ rootMargin: "0% 0% -80% 0%" }
		)

		for (const id of itemIds ?? []) {
			const element = document.getElementById(id)
			if (element) {
				observer.observe(element)
			}
		}

		return () => {
			for (const id of itemIds ?? []) {
				const element = document.getElementById(id)
				if (element) {
					observer.unobserve(element)
				}
			}
		}
	}, [itemIds])

	return activeId
}

export function DocsTableOfContents({
	toc,
	variant = "list",
	className
}: {
	toc: {
		title?: React.ReactNode
		url: string
		depth: number
	}[]
	variant?: "dropdown" | "list"
	className?: string
}) {
	const [open, setOpen] = React.useState(false)
	const itemIds = React.useMemo(
		() => toc?.map((item) => item.url.replace("#", "")),
		[toc]
	)
	const activeHeading = useActiveItem(itemIds)
	const layout = useAtomValue(layoutAtom)

	if (!toc?.length) {
		return null
	}

	if (variant === "dropdown") {
		return (
			<DropdownMenu open={open} onOpenChange={setOpen}>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className={cn("h-8 md:h-7", className)}>
						<Menu03 /> Table of content
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start" className="no-scrollbar max-h-[70svh]">
					{toc.map((item) => (
						<DropdownMenuItem
							key={item.url}
							asChild
							onClick={() => {
								setOpen(false)
							}}
							data-depth={item.depth}
							className="data-[depth=3]:pl-6 data-[depth=4]:pl-8"
						>
							<a href={item.url}>{item.title}</a>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}

	return (
		<div
			className={cn(
				"flex flex-col gap-2 p-4 pt-0 text-sm",
				layout === "zen" && "invisible",
				className
			)}
		>
			<p className="sticky top-0 flex h-6 items-center justify-start gap-1 bg-background text-muted-foreground text-sm [&>svg]:size-3.5">
				<Menu03 /> On this page
			</p>
			{toc.map((item) => (
				<a
					key={item.url}
					href={item.url}
					className="text-[0.8rem] text-muted-foreground no-underline transition-colors hover:text-foreground data-[depth=3]:pl-4 data-[depth=4]:pl-6 data-[active=true]:text-foreground"
					data-active={item.url === `#${activeHeading}`}
					data-depth={item.depth}
				>
					{item.title}
				</a>
			))}
		</div>
	)
}
