"use client"

import type { DialogProps } from "@radix-ui/react-dialog"
import {
	AlignLeft,
	BookOpen01,
	ArrowRight as IconArrowRight,
	Tool02
} from "@untitledui/icons"
import { useDocsSearch } from "fumadocs-core/search/client"
import { BoxesIcon, CornerDownLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import * as React from "react"

import { AtomIcon } from "@/components/icons/atom-icon"
import { SnippetIcon } from "@/components/icons/snippet-icon"
import { Button } from "@/components/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from "@/components/ui/command"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Spinner } from "@/components/ui/spinner"
import type { source } from "@/lib/fumadocs"
import { cn } from "@/lib/utils"

export function SpotlightSearch({
	tree,
	blocks,
	navItems,
	className,
	...props
}: DialogProps & {
	className?: string
	tree: typeof source.pageTree
	blocks?: { name: string; description: string; categories: string[] }[]
	navItems?: { href: string; label: string }[]
}) {
	const router = useRouter()
	const [open, setOpen] = React.useState(false)
	const {
		search,
		setSearch: handleSearchChange,
		query
	} = useDocsSearch({
		type: "fetch",
		delayMs: 500
	})

	const runCommand = React.useCallback((command: () => unknown) => {
		setOpen(false)
		command()
	}, [])

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
				if (
					(e.target instanceof HTMLElement && e.target.isContentEditable) ||
					e.target instanceof HTMLInputElement ||
					e.target instanceof HTMLTextAreaElement ||
					e.target instanceof HTMLSelectElement
				) {
					return
				}

				e.preventDefault()
				setOpen((open) => !open)
			}
		}

		document.addEventListener("keydown", down)
		return () => document.removeEventListener("keydown", down)
	}, [])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="secondary"
					className={cn(
						"relative h-8 w-full justify-start bg-secondary pl-3 text-foreground shadow-none sm:pr-12 md:w-48 lg:w-56 xl:w-64",
						className
					)}
					onClick={() => setOpen(true)}
					{...props}
				>
					<span className="hidden lg:inline-flex">Search documentation...</span>
					<span className="inline-flex lg:hidden">Search...</span>
					<div className="absolute top-1.5 right-1.5 hidden gap-1 sm:flex">
						<KbdGroup>
							<Kbd className="border">⌘</Kbd>
							<Kbd className="border">K</Kbd>
						</KbdGroup>
					</div>
				</Button>
			</DialogTrigger>
			<DialogContent
				showCloseButton={false}
				className="rounded-xl border-none bg-clip-padding p-2 pb-11 shadow-2xl ring-4 ring-neutral-200/80 dark:bg-neutral-900 dark:ring-neutral-800"
			>
				<DialogHeader className="sr-only">
					<DialogTitle>Search documentation...</DialogTitle>
					<DialogDescription>Search for a command to run...</DialogDescription>
				</DialogHeader>
				<Command
					className="rounded-none bg-transparent **:data-[slot=command-input-wrapper]:mb-0 **:data-[slot=command-input-wrapper]:h-9! **:data-[slot=command-input]:h-9! **:data-[slot=command-input-wrapper]:rounded-md **:data-[slot=command-input-wrapper]:border **:data-[slot=command-input-wrapper]:border-input **:data-[slot=command-input-wrapper]:bg-input/50 **:data-[slot=command-input]:py-0"
					filter={(value, search, keywords) => {
						handleSearchChange(search)
						const extendValue = `${value} ${keywords?.join(" ") || ""}`
						if (extendValue.toLowerCase().includes(search.toLowerCase())) {
							return 1
						}
						return 0
					}}
				>
					<div className="relative">
						<CommandInput placeholder="Search documentation..." />
						{query.isLoading && (
							<div className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3 z-10 flex items-center justify-center">
								<Spinner className="size-4 text-muted-foreground" />
							</div>
						)}
					</div>
					<CommandList className="no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5">
						<CommandEmpty className="py-12 text-center text-muted-foreground text-sm">
							{query.isLoading ? "Searching..." : "No results found."}
						</CommandEmpty>
						{navItems && navItems.length > 0 && (
							<CommandGroup
								heading="Pages"
								className="p-0! **:[[cmdk-group-heading]]:scroll-mt-16 **:[[cmdk-group-heading]]:p-3! **:[[cmdk-group-heading]]:pb-1!"
							>
								{navItems.map((item) => (
									<CommandMenuItem
										key={item.href}
										value={`Navigation ${item.label}`}
										keywords={["nav", "navigation", item.label.toLowerCase()]}
										onSelect={() => {
											runCommand(() => router.push(item.href))
										}}
									>
										<IconArrowRight />
										{item.label}
									</CommandMenuItem>
								))}
							</CommandGroup>
						)}
						{tree.children.map((group) => (
							<CommandGroup
								key={group.$id}
								heading={group.name}
								className="p-0! **:[[cmdk-group-heading]]:scroll-mt-16 **:[[cmdk-group-heading]]:p-3! **:[[cmdk-group-heading]]:pb-1!"
							>
								{group.type === "folder" &&
									group.children.map((item) => {
										// fix type: `isPublished` is manually added @fumadocs.ts
										const typedItem = item as typeof item & { isPublished: boolean }
										if (item.type === "page") {
											if (typedItem.isPublished === false) return null
											const isComponent = item.url.includes("/components/")
											const isUtils = item.url.includes("/utils/")
											const isHooks = item.url.includes("/hooks/")
											const isSnippets = item.url.includes("/snippets/")

											return (
												<CommandMenuItem
													key={item.url}
													value={
														item.name?.toString() ? `${group.name} ${item.name}` : ""
													}
													keywords={isComponent ? ["component"] : undefined}
													onSelect={() => {
														runCommand(() => router.push(item.url))
													}}
												>
													{isComponent ? (
														<BoxesIcon className="size-4 stroke-1" />
													) : isUtils ? (
														<Tool02 className="size-4" />
													) : isHooks ? (
														<AtomIcon className="size-4" />
													) : isSnippets ? (
														<SnippetIcon className="size-4" />
													) : (
														<BookOpen01 />
													)}
													{item.name}
												</CommandMenuItem>
											)
										}
										return null
									})}
							</CommandGroup>
						))}

						<SearchResults open={open} setOpen={setOpen} query={query} search={search} />
					</CommandList>
				</Command>
				<div
					data-id="command-footer"
					className="absolute inset-x-0 bottom-0 z-20 flex h-10 items-center gap-2 rounded-b-xl border-t border-t-neutral-100 bg-neutral-50 px-4 font-medium text-muted-foreground text-xs dark:border-t-neutral-700 dark:bg-neutral-800"
				>
					<div className="flex items-center gap-2">
						<CommandMenuKbd>
							<CornerDownLeftIcon />
						</CommandMenuKbd>{" "}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

function CommandMenuItem({
	children,
	className,
	onHighlight,
	...props
}: React.ComponentProps<typeof CommandItem> & {
	onHighlight?: () => void
	"data-selected"?: string
	"aria-selected"?: string
}) {
	const ref = React.useRef<HTMLDivElement>(null)

	return (
		<CommandItem
			ref={ref}
			className={cn(
				"h-9 rounded-md border border-transparent px-3! font-medium data-[selected=true]:border-input data-[selected=true]:bg-input/50",
				className
			)}
			{...props}
		>
			{children}
		</CommandItem>
	)
}

function CommandMenuKbd({ className, ...props }: React.ComponentProps<"kbd">) {
	return (
		<kbd
			className={cn(
				"pointer-events-none flex h-5 select-none items-center justify-center gap-1 rounded border bg-background px-1 font-medium font-sans text-[0.7rem] text-muted-foreground [&_svg:not([class*='size-'])]:size-3",
				className
			)}
			{...props}
		/>
	)
}

type Query = Awaited<ReturnType<typeof useDocsSearch>>["query"]

function SearchResults({
	setOpen,
	query,
	search
}: {
	open: boolean
	setOpen: (open: boolean) => void
	query: Query
	search: string
}) {
	const router = useRouter()
	const uniqueResults =
		query.data && Array.isArray(query.data)
			? query.data.filter(
					(item, index, self) =>
						// if content is text and has <= 1 words
						!(item.type === "text" && item.content.trim().split(/\s+/).length <= 1) &&
						// get only unique content
						index === self.findIndex((t) => t.content === item.content)
				)
			: []

	if (!search.trim()) {
		return null
	}

	if (!query.data || query.data === "empty") {
		return null
	}

	if (query.data && uniqueResults.length === 0) {
		return null
	}

	return (
		<CommandGroup
			className="px-0! **:[[cmdk-group-heading]]:scroll-mt-16 **:[[cmdk-group-heading]]:p-3! **:[[cmdk-group-heading]]:pb-1!"
			heading="Search Results"
		>
			{uniqueResults.map((item) => {
				return (
					<CommandItem
						key={item.id}
						data-type={item.type}
						onSelect={() => {
							router.push(item.url)
							setOpen(false)
						}}
						className="group flex h-9 flex-row gap-2 border border-transparent px-3! data-[selected=true]:border-input data-[selected=true]:bg-input/50"
						keywords={[item.content]}
						value={`${item.content} ${item.type}`}
					>
						<AlignLeft className="size-4" />
						<div className="line-clamp-1 w-full rounded-md font-normal text-sm">
							{item.content}
						</div>
					</CommandItem>
				)
			})}
		</CommandGroup>
	)
}
