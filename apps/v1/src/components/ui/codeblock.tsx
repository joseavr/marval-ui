"use client"

import { createContext, useState } from "react"

interface CodeBlockContextProps {
	isExpanded: boolean
	toggleExpand: () => void
}

const CodeBlockContext = createContext<CodeBlockContextProps | undefined>(undefined)

function CodeBlockProvider({ children }: { children: React.ReactNode }) {
	const [isExpanded, setIsExpanded] = useState(false)

	return (
		<CodeBlockContext
			value={{ isExpanded, toggleExpand: () => setIsExpanded((prev) => !prev) }}
		>
      {children}
    </CodeBlockContext>
	)
}

function CodeBlockHeader() {}

function CodeBlockContent() {}

function CodeBlockTabs() {}

export {
	CodeBlockProvider as CodeBlock,
	CodeBlockHeader,
	CodeBlockTabs,
	CodeBlockContent
}
