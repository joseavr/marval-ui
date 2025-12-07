"use client"

import React, { cloneElement, createContext, useContext, useState } from "react"

import { DEVICONS } from "@/components/icons/language-icons"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface CodeBlockContextType {
	language: string
	filepath: string
	showHeader: boolean
	raw: string
	isExpanded: boolean
	toggleExpand: () => void
}

const CodeBlockContext = createContext<CodeBlockContextType | undefined>(undefined)

function useCodeBlockContext() {
	const context = useContext(CodeBlockContext)
	if (context === undefined) {
		throw new Error(
			"\nCONTEXT ERROR: useCodeBlockContext must be used within a CodeBlockProvider"
		)
	}
	return context
}

function CodeBlockProvider({
	className,
	language,
	filepath,
	showHeader = false,
	raw,
	children,
	...props
}: {
	className?: string
	language: string
	filepath: string
	showHeader?: boolean
	raw: string
	children: React.ReactNode
}) {
	const [isExpanded, setIsExpanded] = useState(false)

	return (
		<CodeBlockContext
			value={{
				language,
				filepath,
				showHeader,
				raw,
				isExpanded,
				toggleExpand: () => setIsExpanded((prev) => !prev)
			}}
		>
			<figure
				className={cn(
					"relative my-4 rounded-lg bg-secondary py-1 font-geist-mono",
					className
				)}
				{...props}
			>
				{children}
			</figure>
		</CodeBlockContext>
	)
}

type CodeHeaderProps = {
	children: React.ReactNode
}

function CodeBlockHeader({ children }: CodeHeaderProps) {
	const { showHeader } = useCodeBlockContext()

	return (
		<div
			className={cn(
				"flex h-12 w-full items-center justify-between px-5",
				showHeader && "border-border border-b",
				!showHeader &&
					"top-0 rounded-lg absolute z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05),transparent_80%)] opacity-0 transition-opacity hover:opacity-100"
			)}
		>
			{children}
		</div>
	)
}

function CodeBlockHeaderItem({
	className,
	align,
	children
}: {
	className?: string
	align: "left" | "right"
	children: React.ReactNode
}) {
	return (
		<div
			data-align={align}
			className={cn(
				"flex items-center gap-3 flex-none",
				align === "left" ? "mr-auto" : "ml-auto",
				className
			)}
		>
			{children}
		</div>
	)
}

function CodeBlockExpandTrigger({ className }: { className?: string }) {
	const { isExpanded, toggleExpand } = useCodeBlockContext()

	return (
		<button
			className={cn(
				buttonVariants({ variant: "outline", size: "sm" }),
				"border-none px-2 text-sm",
				className
			)}
			onClick={toggleExpand}
			type="button"
		>
			{isExpanded ? "Collapse" : "Expand"}
		</button>
	)
}

function CodeBlockContentWithExpand({ children }: { children: React.ReactNode }) {
	const { isExpanded, toggleExpand } = useCodeBlockContext()

	return (
		<div data-id="code-block-content" className="relative">
			<div
				className={cn(
					" h-full w-full overflow-hidden",
					!isExpanded &&
						"max-h-96 [mask-image:linear-gradient(to_top,transparent,white_30%,white_100%,transparent)]"
				)}
			>
				{children}
			</div>

			<button
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"absolute right-1/2 bottom-4 translate-x-1/2 rounded-md border-none font-normal"
				)}
				type="button"
				onClick={toggleExpand}
			>
				{isExpanded ? "Collapse" : "Expand"}
			</button>
		</div>
	)
}

function CodeBlockTabs() {}

export {
	CodeBlockProvider as CodeBlock,
	CodeBlockHeader,
	CodeBlockHeaderItem,
	CodeBlockExpandTrigger,
	CodeBlockTabs,
	CodeBlockContentWithExpand,
	useCodeBlockContext
}
