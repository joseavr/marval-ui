"use client"

import { createContext, useContext, useState } from "react"

import { Button, type ButtonVariantProps } from "@/components/ui/button"
import { type PackageManager, usePackageManagerStore } from "@/lib/package-manager-store"
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

function CodeBlockRoot({
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
					"group/codeblock relative my-4 rounded-lg bg-secondary  font-geist-mono",
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
				"flex h-10 w-full items-center justify-between px-5 pr-2",
				showHeader && "",
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
				"flex items-center gap-2.5 flex-none",
				align === "left" ? "mr-auto" : "ml-auto",
				className
			)}
		>
			{children}
		</div>
	)
}

function CodeBlockExpandTrigger({
	position,
	className,
	variant,
	size
}: ButtonVariantProps & {
	position: "bottom-center" | "inline"
	className?: string
}) {
	const { isExpanded, toggleExpand } = useCodeBlockContext()

	return (
		<Button
			className={cn(
				position === "bottom-center" ? "absolute right-1/2 bottom-4 translate-x-1/2" : "",
				className
			)}
			type="button"
			variant={variant ?? "outline"}
			size={size ?? "sm"}
			onClick={toggleExpand}
		>
			{isExpanded ? "Collapse" : "Expand"}
		</Button>
	)
}

function CodeBlockContentWithExpand({ children }: { children: React.ReactNode }) {
	const { isExpanded } = useCodeBlockContext()

	return (
		<div data-id="code-block-content" className="relative">
			<div
				className={cn(
					" h-full w-full overflow-hidden",
					!isExpanded &&
						"max-h-96 [mask-image:linear-gradient(to_top,transparent,white_60%,white_100%,transparent)]"
				)}
			>
				{children}
			</div>

			<CodeBlockExpandTrigger position="bottom-center" />
		</div>
	)
}

function CodeBlockTabs({ children }: { children: React.ReactNode }) {
	return <div className="flex gap-1">{children}</div>
}

function CodeBlockTabsTrigger({ children }: { children: React.ReactNode }) {
	const packageManager = usePackageManagerStore(
		(state: { packageManager: PackageManager }) => state.packageManager
	)
	const setPackageManager = usePackageManagerStore(
		(state: { setPackageManager: (manager: PackageManager) => void }) =>
			state.setPackageManager
	)
	const value = children as PackageManager
	return (
		<Button
			size="sm"
			variant="outline"
			className={cn(
				"h-6 bg-accent px-2 border-transparent",
				packageManager === value ? "border-border" : "shadow-none"
			)}
			onClick={() => setPackageManager(value)}
		>
			{children}
		</Button>
	)
}

function CodeBlockTabsContent({ values }: { values: Record<PackageManager, string> }) {
	const packageManager = usePackageManagerStore((state) => state.packageManager)
	const value = values[packageManager]
	return <span data-line>{value}</span>
}

export {
	CodeBlockRoot as CodeBlock,
	CodeBlockHeader,
	CodeBlockHeaderItem,
	CodeBlockExpandTrigger,
	CodeBlockTabs,
	CodeBlockTabsTrigger,
	CodeBlockTabsContent,
	CodeBlockContentWithExpand,
	useCodeBlockContext
}
